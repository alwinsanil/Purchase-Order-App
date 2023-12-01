import { Schema, model, models } from "mongoose";

const ProjectSchema = new Schema(
  {
    abbrev: { type: String, required: true },
    projectName: { type: String, required: true },
    contractNo: { type: String, required: true },
    deliveryAddress: [{ type: Object, required: true }],
    contactPerson: { type: String, required: true },
    entity: { type: Object, required: true },
    purchaseReqCount: { type: Number },
  },
  {
    timestamps: true,
  }
);

export const Project = models?.Project || model("Project", ProjectSchema);
