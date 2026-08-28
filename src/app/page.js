import { goodsReceipts, purchaseOrders, tolerances } from "./data/seed";
import { evaluateReceipt } from "./lib/matchEngine";

const currency = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

export default function Home() {
  const receipts = goodsReceipts.map((receipt) => {
    const purchaseOrder = purchaseOrders.find((po) => po.id === receipt.poId);
    return evaluateReceipt(purchaseOrder, receipt, tolerances.default);
  });
  const exceptions = receipts.filter((receipt) => receipt.status === "exception");
  const matched = receipts.length - exceptions.length;
  const totalValue = purchaseOrders.reduce(
    (total, purchaseOrder) => total + purchaseOrder.orderedQty * purchaseOrder.unitPrice,
    0,
  );

  return (
    <div className="min-h-full bg-[#f4f1eb] text-[#17211b]">
      <main className="mx-auto w-full max-w-6xl px-5 py-8 sm:px-8 lg:py-12">
        <header className="flex flex-col gap-5 border-b border-[#c8c9bd] pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#687568]">Operations / Receiving</p>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Match control</h1>
            <p className="mt-3 max-w-xl text-[#5f6b61]">Purchase order receipts evaluated against a {tolerances.default * 100}% quantity tolerance.</p>
          </div>
          <div className="border-l-2 border-[#e07852] pl-4 text-sm text-[#5f6b61]">
            <p className="font-semibold text-[#17211b]">Today&apos;s queue</p>
            <p>{exceptions.length} invoices need review</p>
          </div>
        </header>

        <section className="grid gap-4 py-8 sm:grid-cols-3" aria-label="Receiving summary">
          <div className="border border-[#d5d3c9] bg-[#fbfaf6] p-5"><p className="text-sm text-[#687568]">Receipts checked</p><p className="mt-2 text-3xl font-semibold">{receipts.length}</p></div>
          <div className="border border-[#d5d3c9] bg-[#fbfaf6] p-5"><p className="text-sm text-[#687568]">Auto-matched</p><p className="mt-2 text-3xl font-semibold text-[#3d7657]">{matched}</p></div>
          <div className="border border-[#d5d3c9] bg-[#fbfaf6] p-5"><p className="text-sm text-[#687568]">PO value</p><p className="mt-2 text-3xl font-semibold">{currency.format(totalValue)}</p></div>
        </section>

        <section className="overflow-hidden border border-[#d5d3c9] bg-[#fbfaf6]">
          <div className="flex items-center justify-between border-b border-[#d5d3c9] px-5 py-4">
            <h2 className="font-semibold">Receipt ledger</h2>
            <span className="text-sm text-[#687568]">{receipts.length} records</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] text-left text-sm">
              <thead className="bg-[#e9e8de] text-xs uppercase tracking-wider text-[#687568]"><tr><th className="px-5 py-3 font-semibold">Receipt</th><th className="px-5 py-3 font-semibold">Supplier / material</th><th className="px-5 py-3 font-semibold">Ordered</th><th className="px-5 py-3 font-semibold">Received</th><th className="px-5 py-3 font-semibold">Variance</th><th className="px-5 py-3 font-semibold">Status</th></tr></thead>
              <tbody className="divide-y divide-[#e1dfd5]">{receipts.map((receipt) => <tr key={receipt.id} className="hover:bg-[#f3f1e9]"><td className="px-5 py-4 font-semibold">{receipt.id}<span className="mt-1 block text-xs font-normal text-[#687568]">{receipt.date}</span></td><td className="px-5 py-4">{receipt.poDetails.supplier}<span className="mt-1 block text-xs text-[#687568]">{receipt.poDetails.material}</span></td><td className="px-5 py-4">{receipt.poDetails.orderedQty.toLocaleString()}</td><td className="px-5 py-4">{receipt.receivedQty.toLocaleString()}</td><td className={`px-5 py-4 font-semibold ${receipt.variancePct === 0 ? "text-[#3d7657]" : receipt.status === "exception" ? "text-[#c95535]" : "text-[#3d7657]"}`}>{receipt.variancePct > 0 ? "+" : ""}{receipt.variancePct}%</td><td className="px-5 py-4"><span className={`inline-flex px-2.5 py-1 text-xs font-bold uppercase tracking-wide ${receipt.status === "exception" ? "bg-[#f8ddd2] text-[#a63f28]" : "bg-[#dcebdc] text-[#326347]"}`}>{receipt.status}</span></td></tr>)}</tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}
