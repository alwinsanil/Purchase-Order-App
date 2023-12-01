import { Schema, model, models } from "mongoose";

const PurchaseReqSchema = new Schema({
  itemList: [{ type: Object, required: true }],
  purchaseReqCode: { type: String, required: true },
  project: { type: Object, required: true },
});

export const PurchaseReq =
  models?.PurchaseReq || model("PurchaseReq", PurchaseReqSchema);
