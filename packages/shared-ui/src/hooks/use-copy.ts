import { useState } from "react"

export function useCopy(resetDelay = 2000) {
  const [copied, setCopied] = useState(false)

  const copy = async (text: string) => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    window.setTimeout(() => setCopied(false), resetDelay)
  }

  return { copied, copy }
}
