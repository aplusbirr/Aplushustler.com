export default function AdPlaceholder({ label = "Advertisement" }: { label?: string }) {
  return (
    <div className="ad-placeholder my-6">
      <span>{label} — AdSense Ready</span>
    </div>
  );
}
