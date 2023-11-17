import { Schema, model, models } from "mongoose";

const EntitySchema = new Schema({
  entityCode: { type: Number, required: true },
  entityAbbrev: { type: String, required: true },
  entityName: { type: String, required: true },
  entityAddress: { type: Object, required: true },
  entityTRN: {type: Number, required: true},
});

export const Entity = models?.Entity || model("Entity", EntitySchema);
