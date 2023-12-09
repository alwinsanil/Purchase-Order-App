import mongooseConnect from "@/lib/mongoose";
import { PurchaseReq } from "@/models/PurchaseReq";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export async function POST(req: NextApiRequest) {
  await mongooseConnect();
  const { itemList, project, purchaseReqCode } = await (req as any).json();
  const PurchaseReqDoc = await PurchaseReq.create({
    itemList,
    project,
    purchaseReqCode,
  });
  return NextResponse.json(PurchaseReqDoc);
}

export async function PUT(req: NextApiRequest) {
  await mongooseConnect();
  const { _id, itemList, project, purchaseReqCode } = await (req as any).json();
  const PurchaseReqDoc = await PurchaseReq.updateOne(
    { _id },
    { itemList, project, purchaseReqCode }
  );
  return NextResponse.json(PurchaseReqDoc);
}

export async function GET(req: NextApiRequest) {
  await mongooseConnect();
  // @ts-ignore
  const id = req.nextUrl.searchParams.get("id") as string;
  if (id) {
    return NextResponse.json(await PurchaseReq.findById(id));
  }
  return NextResponse.json(await PurchaseReq.find());
}

export async function DELETE(req: NextApiRequest) {
  await mongooseConnect();
  const { _id } = await (req as any).json();
  await PurchaseReq.deleteOne({ _id: _id });
  return NextResponse.json(_id);
}
