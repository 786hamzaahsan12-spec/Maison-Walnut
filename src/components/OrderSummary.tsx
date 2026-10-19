import { siteConfig } from "@/lib/config";
import { computeTotals, formatPKR } from "@/lib/utils";

interface Props {
  items: { unitPrice: number; qty: number }[];
  coupon: string | null;
}

export default function OrderSummary({ items, coupon }: Props) {
  const t = computeTotals(items, coupon);
  const remaining = siteConfig.delivery.freeThreshold - (t.subtotal - t.discount);

  return (
    <div className="space-y-3 text-sm">
      <Row label="Subtotal" value={formatPKR(t.subtotal)} />
      {t.discount > 0 && <Row label={`Coupon (${coupon})`} value={`− ${formatPKR(t.discount)}`} />}
      <Row label="Delivery" value={t.delivery === 0 ? "Free" : formatPKR(t.delivery)} />
      <div className="flex items-center justify-between border-t border-[#d9ccb4] pt-4 text-base font-semibold">
        <span>Total</span>
        <span className="text-[#5a3d2b]">{formatPKR(t.total)}</span>
      </div>
      {t.subtotal > 0 && remaining > 0 && (
        <p className="text-xs text-[#2a2623]/60">Add {formatPKR(remaining)} more for free delivery.</p>
      )}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-[#2a2623]/70">{label}</span>
      <span>{value}</span>
    </div>
  );
}