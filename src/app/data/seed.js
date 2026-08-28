// data/seed.js
export const purchaseOrders = [
  { id: "PO-3001", supplier: "Vantage Steel Co.", material: "Steel rod 12mm", orderedQty: 500, unitPrice: 420 },
  { id: "PO-3002", supplier: "Coastal Packaging", material: "Corrugated box L", orderedQty: 2000, unitPrice: 18 },
  { id: "PO-3003", supplier: "Vantage Steel Co.", material: "Steel rod 12mm", orderedQty: 300, unitPrice: 420 },
  { id: "PO-3004", supplier: "Nova Electronics", material: "PCB unit A2", orderedQty: 150, unitPrice: 640 },
];

export const goodsReceipts = [
  { id: "GR-9001", poId: "PO-3001", receivedQty: 510, date: "2026-08-20" }, // +2% over — should auto-pass
  { id: "GR-9002", poId: "PO-3002", receivedQty: 1400, date: "2026-08-21" }, // -30% under — real exception
  { id: "GR-9003", poId: "PO-3003", receivedQty: 300, date: "2026-08-22" }, // exact match — auto-pass
  { id: "GR-9004", poId: "PO-3004", receivedQty: 172, date: "2026-08-23" }, // +14.7% over — real exception
];

export const tolerances = {
  default: 0.05, // 5% allowed variance unless overridden
};