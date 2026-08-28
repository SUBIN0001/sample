import { purchaseOrders } from '@/data/seed';

// This function runs on the server whenever the browser calls GET /api/orders
export async function GET() {
  const enriched = purchaseOrders.map((order) => ({
    ...order,
    totalValue: order.orderedQty * order.unitPrice,
  }));

  return Response.json(enriched);
}