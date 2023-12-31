import { Schema, model, models } from "mongoose";

const OrderSchema = new Schema({
  purchaseOrderNo: { type: String, required: true },
  entity: { type: Object, required: true },
  project: { type: Object, required: true },
  supplier: { type: Object, required: true },
  purchaseReq: { type: Object, required: true },
  deliveryAddress: { type: Object, required: true },
  orderDate: { type: Date, required: true },
  deliveryDate: { type: Date, required: true },
});

export const Order = models?.Order || model("Order", OrderSchema);
