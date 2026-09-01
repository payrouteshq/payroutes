import { type ComponentProps, type ReactNode, useCallback, useEffect, useState } from "react";

import { type DropzoneOptions, type FileRejection, useDropzone } from "react-dropzone";

import { cn } from "../../cn";
import { ArrowUp, CloseX, Image, TriangleAlert } from "../../icons";
import { ImageTransformer, type MimeType, type TransformOptions } from "../../integrations/image-transformer";
import { type MixinProps, splitProps } from "../../lib/mixin";
import { Spinner } from "../spinner";

export interface FileWithPreview extends File {
  preview?: string;
  width?: number;
  height?: number;
}

type FileUploadState = "hover" | "drag";

export interface FileUploadProps
  extends
    MixinProps<"dropzone", Omit<DropzoneOptions, "onDrop" | "disabled"> & { className?: string }>,
    MixinProps<"label", Omit<ComponentProps<"p">, "children">>,
    MixinProps<"error", Omit<ComponentProps<"p">, "children">> {
  id?: string;
  value?: FileWithPreview | null;
  onFileChange?: (file: FileWithPreview | null) => void;
  onFileRejected?: (rejections: FileRejection[]) => void;
  onCancel?: () => void;
  onRemove?: () => void;
  progress?: number;
  status?: "idle" | "uploading" | "success";
  hint?: string;
  error?: ReactNode;
  label?: ReactNode;
  disabled?: boolean;
  className?: string;
  enableTransformation?: boolean;
  targetFormat?: MimeType;
  maxDimension?: number;
  "data-state"?: FileUploadState;
}

function formatBytes(bytes: number) {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))}KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
}

async function toFileWithPreview(file: File): Promise<FileWithPreview> {
  const preview = URL.createObjectURL(file);
  const next = Object.assign(file, { preview }) as FileWithPreview;

  await new Promise<void>((resolve) => {
    const image = new window.Image();
    image.onload = () => {
      next.width = image.naturalWidth;
      next.height = image.naturalHeight;
      resolve();
    };
    image.onerror = () => resolve();
    image.src = preview;
  });

  return next;
}

function BrowseLabel({ className }: { className?: string }) {
  return <span className={cn("underline underline-offset-2", className)}>browse</span>;
}

function DropHint({
  title,
  hint,
  icon,
  titleClassName,
  hintClassName,
}: {
  title: ReactNode;
  hint?: ReactNode;
  icon: ReactNode;
  titleClassName?: string;
  hintClassName?: string;
}) {
  return (
    <div className="flex flex-col items-center gap-2 px-6 py-8 text-center">
      {icon}
      <p className={cn("text-primary text-sm font-medium", titleClassName)}>{title}</p>
      {hint ? <p className={cn("text-muted-foreground text-xs", hintClassName)}>{hint}</p> : null}
    </div>
  );
}

function FileUpload({
  id,
  value,
  onFileChange,
  onFileRejected,
  onCancel,
  onRemove,
  progress = 0,
  status,
  hint = "PNG or JPG, up to 2MB",
  error,
  label,
  disabled = false,
  className,
  enableTransformation = false,
  targetFormat = "image/png",
  maxDimension,
  "data-state": dataState,
  ...mixProps
}: FileUploadProps) {
  const { dropzone, label: labelProps, error: errorProps } = splitProps(mixProps, "dropzone", "label", "error");
  const isControlled = value !== undefined;
  const [internalFile, setInternalFile] = useState<FileWithPreview | null>(null);
  const [rejectionError, setRejectionError] = useState<ReactNode>(null);
  const [isTransforming, setIsTransforming] = useState(false);

  const file = isControlled ? value : internalFile;
  const displayError = error ?? rejectionError;
  const resolvedStatus = status ?? (file ? "success" : "idle");

  const commitFile = useCallback(
    (next: FileWithPreview | null) => {
      if (!isControlled) setInternalFile(next);
      onFileChange?.(next);
    },
    [isControlled, onFileChange]
  );

  const onDrop = useCallback(
    async (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      if (fileRejections.length > 0) {
        const tooLarge = fileRejections.some((rejection) =>
          rejection.errors.some((item) => item.code === "file-too-large")
        );
        setRejectionError(
          tooLarge ? "That file is over 2MB. Try a smaller one." : "That file isn’t supported. Try a PNG or JPG."
        );
        onFileRejected?.(fileRejections);
        if (acceptedFiles.length === 0) return;
      } else {
        setRejectionError(null);
      }

      const source = acceptedFiles[0];
      if (!source) return;

      setIsTransforming(true);
      try {
        let nextFile = source;
        if (enableTransformation) {
          try {
            nextFile = await new ImageTransformer().transform(source, {
              to: targetFormat,
              maxDimension,
            });
          } catch (err) {
            console.error("Transformation failed, falling back to original:", err);
          }
        }

        commitFile(await toFileWithPreview(nextFile));
      } finally {
        setIsTransforming(false);
      }
    },
    [commitFile, enableTransformation, maxDimension, onFileRejected, targetFormat]
  );

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    multiple: false,
    accept: enableTransformation
      ? {
          "image/png": [".png"],
          "image/jpeg": [".jpg", ".jpeg"],
          "image/webp": [".webp"],
          "image/heic": [".heic"],
          "image/heif": [".heif"],
          "image/svg+xml": [".svg"],
        }
      : {
          "image/png": [".png"],
          "image/jpeg": [".jpg", ".jpeg"],
        },
    maxSize: 2 * 1024 * 1024,
    ...dropzone,
    onDrop,
    disabled: disabled || isTransforming,
    noClick: resolvedStatus === "uploading" || resolvedStatus === "success",
  });

  useEffect(() => {
    return () => {
      if (file?.preview) URL.revokeObjectURL(file.preview);
    };
  }, [file?.preview]);

  const isHover = dataState === "hover";
  const isDrag = isDragActive || dataState === "drag";
  const isUploading = resolvedStatus === "uploading";
  const isSuccess = resolvedStatus === "success" && !!file;

  return (
    <div className={cn("w-full", className)}>
      {label ? (
        <p {...labelProps} className={cn("mb-1.5 text-sm font-medium", labelProps.className)}>
          {label}
        </p>
      ) : null}

      <div
        {...getRootProps()}
        data-slot="file-upload"
        data-state={isDrag ? "drag" : dataState}
        aria-disabled={disabled || isTransforming}
        aria-invalid={Boolean(displayError) || undefined}
        className={cn(
          "relative rounded-lg border border-dashed transition-colors",
          !displayError && !disabled && !isUploading && !isSuccess && "border-border bg-accent/40 text-primary",
          (isHover || isDrag) && !displayError && !disabled && "border-primary bg-accent",
          isDrag && !displayError && !disabled && "bg-accent",
          displayError && "border-error bg-error/10",
          disabled && "bg-disabled text-disabled-foreground cursor-not-allowed border-transparent",
          !disabled && !isUploading && !isSuccess && "cursor-pointer",
          (isUploading || isSuccess) && "border-border bg-card",
          dropzone.className
        )}
      >
        <input
          {...getInputProps({ id })}
          aria-label={typeof label === "string" ? label : "Upload file"}
          disabled={disabled || isTransforming}
        />

        {isTransforming ? (
          <div className="flex flex-col items-center justify-center gap-2 px-6 py-8">
            <Spinner size={28} />
          </div>
        ) : isUploading && file ? (
          <div className="flex flex-col gap-2 px-4 py-3">
            <div className="flex items-center justify-between gap-3">
              <p className="text-foreground truncate text-sm font-medium">{file.name}</p>
              <div className="flex shrink-0 items-center gap-2">
                <span className="text-primary text-sm font-medium">{Math.round(progress)}%</span>
                <button
                  type="button"
                  aria-label="Cancel upload"
                  className="text-muted-foreground outline-none"
                  onClick={(event) => {
                    event.stopPropagation();
                    onCancel?.();
                  }}
                >
                  <CloseX className="size-4" />
                </button>
              </div>
            </div>
            <div className="bg-muted h-1.5 w-full overflow-hidden rounded-full">
              <div
                className="bg-primary h-full rounded-full transition-[width]"
                style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
              />
            </div>
          </div>
        ) : isSuccess && file ? (
          <div className="flex items-center gap-3 px-4 py-3">
            {file.preview ? (
              <img src={file.preview} alt="" className="size-10 shrink-0 rounded-md object-cover" />
            ) : (
              <span className="bg-muted size-10 shrink-0 rounded-md" />
            )}
            <div className="min-w-0 flex-1">
              <p className="text-foreground truncate text-sm font-semibold">{file.name}</p>
              <p className="text-muted-foreground text-xs">
                {formatBytes(file.size)}
                {file.width && file.height ? ` - ${file.width}x${file.height}` : ""}
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-3 text-sm font-medium">
              <button
                type="button"
                className="text-primary outline-none"
                onClick={(event) => {
                  event.stopPropagation();
                  open();
                }}
              >
                Replace
              </button>
              <button
                type="button"
                className="text-error outline-none"
                onClick={(event) => {
                  event.stopPropagation();
                  onRemove?.();
                  commitFile(null);
                }}
              >
                Remove
              </button>
            </div>
          </div>
        ) : displayError ? (
          <DropHint
            icon={<TriangleAlert className="text-error size-5" />}
            title={displayError}
            titleClassName="text-error"
            hint={
              <>
                Drag an image here or <BrowseLabel className="text-error" />
              </>
            }
          />
        ) : (
          <DropHint
            icon={
              isHover || isDrag ? (
                <ArrowUp className={cn("size-5", disabled ? "text-disabled-foreground" : "text-primary")} />
              ) : (
                <Image className={cn("size-5", disabled ? "text-disabled-foreground" : "text-primary")} />
              )
            }
            title={
              isDrag ? (
                "Drop to upload"
              ) : (
                <>
                  Drag an image here or <BrowseLabel />
                </>
              )
            }
            hint={hint}
            titleClassName={disabled ? "text-disabled-foreground" : undefined}
            hintClassName={disabled ? "text-disabled-foreground" : undefined}
          />
        )}
      </div>

      {displayError && !isUploading && !isSuccess ? (
        <p className="sr-only" role="alert" {...errorProps}>
          {displayError}
        </p>
      ) : null}
    </div>
  );
}

export { FileUpload, ImageTransformer };
export type { FileRejection, FileUploadState, MimeType, TransformOptions };
