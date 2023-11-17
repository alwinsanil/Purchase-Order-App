import mongooseConnect from "@/lib/mongoose";
import { Entity } from "@/models/Entity";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export async function POST(req: NextApiRequest) {
      console.log("hello");
  await mongooseConnect();
  const { entityCode, entityAbbrev, entityName, entityAddress, entityTRN } = await (
    req as any
  ).json();
  const EntityDoc = await Entity.create({
    entityCode,
    entityAbbrev,
    entityName,
    entityAddress,
    entityTRN,
  });
  return NextResponse.json(EntityDoc);
}

export async function GET(req: NextApiRequest) {
  await mongooseConnect();
  return NextResponse.json(await Entity.find());
}
