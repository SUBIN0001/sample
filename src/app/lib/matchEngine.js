// lib/matchEngine.js
export function evaluateReceipt(po, gr, tolerancePct = 0.05) {
  const variance = (gr.receivedQty - po.orderedQty) / po.orderedQty;
  const withinTolerance = Math.abs(variance) <= tolerancePct;
  return {
    ...gr,
    poDetails: po,
    variancePct: Math.round(variance * 1000) / 10, // one decimal, e.g. 14.7
    status: withinTolerance ? "auto-matched" : "exception",
    invoiceBlocked: !withinTolerance,
  };
}