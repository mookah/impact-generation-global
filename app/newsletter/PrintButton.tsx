"use client";

type PrintButtonProps = {
  className?: string;
};

export default function PrintButton({
  className,
}: PrintButtonProps) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <button
      type="button"
      className={className}
      onClick={handlePrint}
      aria-label="Print newsletter or save as PDF"
      title="Print newsletter or save as PDF"
    >
      Print Newsletter
    </button>
  );
}