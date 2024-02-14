import { Schema, model, models } from "mongoose";

const SupplierSchema = new Schema({
  supplierCode: { type: String, required: true },
  supplierName: { type: String, required: true },
  supplierAddress: { type: Object, required: true },
  supplierTRN: { type: Number, required: true },
  contactName: { type: String, required: true },
  contactNo: { type: String, required: true },
  email: { type: String, required: true },
  paymentTerm: { type: String, required: true },
  bankDetails: { type: Object, required: true },
});

export const Supplier = models?.Supplier || model("Supplier", SupplierSchema);
