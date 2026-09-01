import { type ComponentProps, useRef, useState } from "react";

import type { Meta, StoryObj } from "@storybook/react";

import { FileUpload, type FileWithPreview } from "./index";

const sampleFile = {
  name: "pro-plan-hero.png",
  size: 1.2 * 1024 * 1024,
  type: "image/png",
  width: 1600,
  height: 900,
} as FileWithPreview;

const meta: Meta<typeof FileUpload> = {
  title: "Components/FileUpload",
  component: FileUpload,
  args: {
    className: "w-80",
  },
};

export default meta;

type Story = StoryObj<typeof FileUpload>;

function SimulateUpload(args: ComponentProps<typeof FileUpload>) {
  const [file, setFile] = useState<FileWithPreview | null>(null);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<"idle" | "uploading" | "success">("idle");
  const tick = useRef(0);

  function stop() {
    window.clearInterval(tick.current);
  }

  function reset() {
    stop();
    setFile(null);
    setProgress(0);
    setStatus("idle");
  }

  function start(next: FileWithPreview) {
    stop();
    setFile(next);
    setStatus("uploading");
    setProgress(1);
    let current = 1;
    tick.current = window.setInterval(() => {
      current += 1;
      setProgress(current);
      if (current >= 100) {
        stop();
        setStatus("success");
      }
    }, 30);
  }

  return (
    <FileUpload
      {...args}
      value={file}
      status={file ? status : "idle"}
      progress={progress}
      onFileChange={(next) => (next ? start(next) : reset())}
      onCancel={reset}
      onRemove={reset}
    />
  );
}

export const Default: Story = {
  render: SimulateUpload,
};

export const Hover: Story = {
  args: { "data-state": "hover" },
};

export const Drag: Story = {
  args: { "data-state": "drag" },
};

export const Error: Story = {
  args: { error: "That file is over 2MB. Try a smaller one." },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const Uploading: Story = {
  parameters: { chromatic: { disableSnapshot: true } },
  render: SimulateUpload,
};

export const Success: Story = {
  args: {
    status: "success",
    value: sampleFile,
  },
};

export const States: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-4">
      <FileUpload />
      <FileUpload data-state="hover" />
      <FileUpload data-state="drag" />
      <FileUpload error="That file is over 2MB. Try a smaller one." />
      <FileUpload disabled />
      <FileUpload status="uploading" progress={44} value={sampleFile} />
      <FileUpload status="success" value={sampleFile} />
    </div>
  ),
};
