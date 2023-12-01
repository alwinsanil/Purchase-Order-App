import mongooseConnect from "@/lib/mongoose";
import { Entity } from "@/models/Entity";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export async function POST(req: NextApiRequest) {
  await mongooseConnect();
  const { entityCode, entityAbbrev, entityName, entityAddress, entityTRN } =
    await (req as any).json();
  const EntityDoc = await Entity.create({
    entityCode,
    entityAbbrev,
    entityName,
    entityAddress,
    entityTRN,
  });
  return NextResponse.json(EntityDoc);
}

export async function PUT(req: NextApiRequest) {
  await mongooseConnect();
  const {
    _id,
    entityCode,
    entityAbbrev,
    entityName,
    entityAddress,
    entityTRN,
  } = await (req as any).json();
  const EntityDoc = await Entity.updateOne(
    { _id },
    { entityCode, entityAbbrev, entityName, entityAddress, entityTRN }
  );
  return NextResponse.json(EntityDoc);
}

export async function GET(req: NextApiRequest) {
  await mongooseConnect();
  let id = null;
  if (req.url?.includes("=")) {
    id = req.url?.split("=").pop();
  }
  if (id) {
    return NextResponse.json(await Entity.findById(id));
  }
  return NextResponse.json(await Entity.find());
}

export async function DELETE(req: NextApiRequest) {
  await mongooseConnect();
  const { _id } = await (req as any).json();
  await Entity.deleteOne({ _id: _id })
  return NextResponse.json(_id);
}
