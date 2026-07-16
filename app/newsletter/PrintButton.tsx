"use client";

type PrintButtonProps = {
  className?: string;
};

export default function PrintButton({ className }: PrintButtonProps) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => window.print()}
    >
      Download / Print PDF
    </button>
  );
}
