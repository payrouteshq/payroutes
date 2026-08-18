import { Combobox } from "@base-ui/react/combobox"
import {
  memo,
  useCallback,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type ComponentProps,
} from "react"
import { getCountryData, type TCountryCode } from "countries-list"
import { countries } from "country-flag-icons"
import * as CountryFlags from "country-flag-icons/react/3x2"
import {
  AsYouType,
  parsePhoneNumberWithError,
  type CountryCode,
} from "libphonenumber-js"

import { Check, ChevronDown, Search } from "../../icons"
import { type MixinProps, splitProps } from "../../lib/mixin"
import { cn } from "../../cn"
import { InputGroup, InputGroupInput } from "../../ui/input-group"
import { Label } from "../../ui/label"

export type PhoneNumber = {
  number: string
  countryCode: string
}

const DEFAULT_COUNTRY_CODE = "US"

export const phoneNumberToString = (phoneNumber: PhoneNumber): string => {
  try {
    const parsed = parsePhoneNumberWithError(
      phoneNumber.number,
      phoneNumber.countryCode as CountryCode
    )
    if (parsed?.isValid()) return parsed.formatInternational()
  } catch {}
  const { phone } = getCountryData(phoneNumber.countryCode as TCountryCode)
  const prefix = phone?.[0] ? `+${phone[0]}` : "+1"
  const digits = phoneNumber.number.replace(/[^\d]/g, "")
  return `${prefix} ${digits}`
}

export const phoneNumberFromString = (raw: string): PhoneNumber => {
  if (!raw?.trim()) return { number: "", countryCode: DEFAULT_COUNTRY_CODE }

  try {
    const parsed = parsePhoneNumberWithError(raw)
    if (parsed?.country) {
      return { number: parsed.formatNational(), countryCode: parsed.country }
    }
  } catch {}

  const countryCodeMatch = raw.match(/^(\+\d{1,4})/)
  if (!countryCodeMatch) {
    return {
      number: raw.replace(/[^\d]/g, ""),
      countryCode: DEFAULT_COUNTRY_CODE,
    }
  }

  const prefix = countryCodeMatch[1]
  const number = raw.slice(prefix.length).replace(/[^\d]/g, "")

  if (prefix === "+1") return { number, countryCode: DEFAULT_COUNTRY_CODE }

  const countryCode = countries.find((iso) => {
    const { phone } = getCountryData(iso as TCountryCode)
    return phone && phone.length > 0 && `+${phone[0]}` === prefix
  })

  return { number, countryCode: countryCode ?? DEFAULT_COUNTRY_CODE }
}

type CountryOption = {
  name: string
  prefix: string
  countryCode: string
  searchKey: string
}

const COUNTRIES_DATA: CountryOption[] = countries.flatMap((countryCode) => {
  const { name, phone } = getCountryData(countryCode as TCountryCode)
  if (!name || !phone.length) return []

  return phone.map((prefix) => ({
    name,
    prefix: `+${prefix}`,
    countryCode,
    searchKey: `${name} ${countryCode} +${prefix}`.toLowerCase(),
  }))
})

type LabelProps = ComponentProps<typeof Label>
type ErrorProps = ComponentProps<"p">
type FlagProps = ComponentProps<(typeof CountryFlags)["US"]>

export interface PhoneNumberFieldProps
  extends MixinProps<"flag", Omit<FlagProps, "children">>,
    MixinProps<"label", Omit<LabelProps, "children">>,
    MixinProps<
      "input",
      Omit<ComponentProps<typeof InputGroupInput>, "onChange" | "value">
    >,
    MixinProps<"error", Omit<ErrorProps, "children">>,
    MixinProps<"group", Omit<ComponentProps<typeof InputGroup>, "children">> {
  id?: string
  value: PhoneNumber
  onChange: (value: PhoneNumber) => void
  disabled?: boolean
  label?: LabelProps["children"] | null
  error?: ErrorProps["children"] | null
  defaultOpen?: boolean
  className?: string
  "data-state"?: "focus"
}

const flagClassName =
  "inline-flex h-3.5 w-[21px] shrink-0 overflow-hidden rounded-[2px] ring-1 ring-border [&_svg]:block [&_svg]:size-full"

const CountryFlag = memo(function CountryFlag({
  countryCode,
  className,
  ...props
}: { countryCode: string } & FlagProps) {
  const FlagComponent =
    CountryFlags[countryCode as TCountryCode] ?? CountryFlags.US

  return (
    <span className={cn(flagClassName, className)}>
      <FlagComponent {...props} />
    </span>
  )
})

const formatAsYouType = (raw: string, countryCode: string): string => {
  const formatted = new AsYouType(countryCode as CountryCode).input(raw)
  const digits = raw.replace(/\D/g, "")

  if (formatted === digits && digits.length >= 6) {
    if (digits.length <= 6) return `${digits.slice(0, 3)} ${digits.slice(3)}`
    if (digits.length <= 9)
      return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`
    return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6, 10)}`
  }

  return formatted
}

function PhoneNumberField({
  id: idProp,
  value,
  onChange,
  disabled,
  label,
  error,
  defaultOpen,
  className,
  "data-state": dataState,
  ...mixProps
}: PhoneNumberFieldProps) {
  const generatedId = useId()
  const id = idProp ?? generatedId
  const labelId = useId()
  const [groupEl, setGroupEl] = useState<HTMLDivElement | null>(null)
  const [countryOpen, setCountryOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const invalid = Boolean(error)

  useLayoutEffect(() => {
    if (!defaultOpen) return
    const frame = requestAnimationFrame(() => setCountryOpen(true))
    return () => cancelAnimationFrame(frame)
  }, [defaultOpen])

  const {
    group,
    label: labelProps,
    flag,
    input,
    error: errorProps,
  } = splitProps(mixProps, "label", "flag", "input", "error", "group")

  const selectedCountry = useMemo(
    () =>
      COUNTRIES_DATA.find((country) => country.countryCode === value.countryCode) ??
      COUNTRIES_DATA.find((country) => country.countryCode === DEFAULT_COUNTRY_CODE),
    [value.countryCode]
  )

  const displayNumber = useMemo(
    () => (value.number ? formatAsYouType(value.number, value.countryCode) : ""),
    [value.number, value.countryCode]
  )

  const handleCountrySelect = useCallback(
    (country: CountryOption | null) => {
      if (!country) return
      const digits = value.number.replace(/\D/g, "")
      const number = digits ? formatAsYouType(digits, country.countryCode) : ""
      onChange({ countryCode: country.countryCode, number })
      requestAnimationFrame(() => inputRef.current?.focus())
    },
    [onChange, value.number]
  )

  const handleNumberChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const raw = event.target.value
      const newDigits = raw.replace(/\D/g, "")
      const prevDigits = displayNumber.replace(/\D/g, "")
      const digits =
        newDigits.length === prevDigits.length && raw.length < displayNumber.length
          ? newDigits.slice(0, -1)
          : newDigits

      onChange({
        ...value,
        number: digits ? formatAsYouType(digits, value.countryCode) : "",
      })
    },
    [onChange, value, displayNumber]
  )

  return (
    <div className={cn("flex w-full flex-col gap-1.5", className)}>
      {label ? (
        <Label
          {...labelProps}
          id={labelId}
          htmlFor={id}
          className={cn(labelProps.className)}
        >
          {label}
        </Label>
      ) : null}
      <Combobox.Root
        items={COUNTRIES_DATA}
        open={countryOpen}
        onOpenChange={setCountryOpen}
        disabled={disabled}
        value={selectedCountry}
        onValueChange={handleCountrySelect}
        itemToStringLabel={(item) => item.searchKey}
        isItemEqualToValue={(a, b) =>
          a.countryCode === b.countryCode && a.prefix === b.prefix
        }
      >
        <InputGroup
          {...group}
          ref={setGroupEl}
          data-disabled={disabled || undefined}
          data-state={dataState}
          aria-labelledby={label ? labelId : undefined}
          className={cn(group.className)}
        >
          <Combobox.Trigger
            type="button"
            tabIndex={disabled ? -1 : 0}
            disabled={disabled}
            aria-label="Country code"
            className={cn(
              "relative flex h-full shrink-0 items-center gap-1.5 self-stretch bg-transparent px-2.5 text-sm text-foreground outline-none select-none",
              "border-r border-input",
              "group-has-[:focus-visible]/input-group:border-ring group-data-[state=focus]/input-group:border-ring",
              "group-has-[[aria-invalid=true]]/input-group:border-error",
              "group-data-disabled/input-group:border-transparent",
              "disabled:cursor-not-allowed disabled:text-disabled-foreground"
            )}
          >
            <CountryFlag
              {...flag}
              countryCode={value.countryCode || DEFAULT_COUNTRY_CODE}
              className={cn(
                "group-data-disabled/input-group:opacity-40 group-data-disabled/input-group:grayscale",
                flag.className
              )}
            />
            <span className="tabular-nums">
              {selectedCountry?.prefix || "+1"}
            </span>
            <ChevronDown
              aria-hidden
              className="size-4 shrink-0 text-muted-foreground transition-transform group-data-disabled/input-group:text-disabled-foreground in-data-open:rotate-180"
            />
          </Combobox.Trigger>
          <InputGroupInput
            {...input}
            id={id}
            ref={inputRef}
            type="tel"
            inputMode="tel"
            autoComplete="tel-national"
            placeholder={input.placeholder ?? "Phone number"}
            disabled={disabled}
            aria-invalid={invalid || undefined}
            value={displayNumber}
            onChange={handleNumberChange}
            className={cn(input.className)}
          />
        </InputGroup>
        <Combobox.Portal>
          <Combobox.Positioner
            anchor={groupEl ?? undefined}
            side="bottom"
            align="start"
            sideOffset={4}
            className="isolate z-50"
          >
            <Combobox.Popup
              className={cn(
                "flex w-(--anchor-width) min-w-72 origin-(--transform-origin) flex-col overflow-hidden rounded-lg border border-ring bg-popover text-popover-foreground shadow-md duration-100",
                "data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95"
              )}
            >
              <div className="flex items-center gap-2 border-b border-border px-2.5 py-2">
                <Search className="size-4 shrink-0 text-muted-foreground" />
                <Combobox.Input
                  placeholder="Search country code"
                  className="h-6 w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
                />
              </div>
              <Combobox.Empty className="px-2.5 py-2 text-sm text-muted-foreground">
                No countries found
              </Combobox.Empty>
              <Combobox.List className="flex max-h-60 flex-col gap-0.5 overflow-y-auto p-1">
                {(item: CountryOption) => (
                  <Combobox.Item
                    key={`${item.countryCode}-${item.prefix}`}
                    value={item}
                    className={cn(
                      "relative flex w-full cursor-default items-center gap-2 rounded-md py-1.5 pr-8 pl-2.5 text-sm text-foreground outline-hidden select-none",
                      "data-highlighted:bg-accent data-highlighted:text-accent-foreground",
                      "data-selected:bg-accent data-selected:text-accent-foreground"
                    )}
                  >
                    <CountryFlag countryCode={item.countryCode} {...flag} />
                    <span className="tabular-nums">{item.prefix}</span>
                    <span className="flex-1 truncate">{item.name}</span>
                    <Combobox.ItemIndicator className="pointer-events-none absolute right-2 flex size-4 items-center justify-center text-primary">
                      <Check className="size-4" />
                    </Combobox.ItemIndicator>
                  </Combobox.Item>
                )}
              </Combobox.List>
            </Combobox.Popup>
          </Combobox.Positioner>
        </Combobox.Portal>
      </Combobox.Root>
      {error ? (
        <p
          {...errorProps}
          role="alert"
          className={cn("text-error text-xs", errorProps.className)}
        >
          {error}
        </p>
      ) : null}
    </div>
  )
}

export { PhoneNumberField, COUNTRIES_DATA }
export type { CountryOption }
