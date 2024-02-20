import mongooseConnect from "@/lib/mongoose";
import { Order } from "@/models/Order";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export async function POST(req: NextApiRequest) {
  await mongooseConnect();
  const {
    purchaseOrderNo,
    entity,
    project,
    supplier,
    selectedItems,
    purchaseReq,
    deliveryAddress,
    orderDate,
    deliveryDate,
    notes,
    deliveryTerms,
    totalPrice,
  } = await(req as any).json();
  const OrderDoc = await Order.create({
    purchaseOrderNo,
    entity,
    project,
    supplier,
    selectedItems,
    purchaseReq,
    deliveryAddress,
    orderDate,
    deliveryDate,
    notes,
    deliveryTerms,
    totalPrice,
  });
  return NextResponse.json(OrderDoc);
}

export async function PUT(req: NextApiRequest) {
  await mongooseConnect();
  const {
    _id,
    purchaseOrderNo,
    entity,
    project,
    supplier,
    selectedItems,
    purchaseReq,
    deliveryAddress,
    orderDate,
    deliveryDate,
    notes,
    deliveryTerms,
    totalPrice,
  } = await(req as any).json();
  const OrderDoc = await Order.updateOne(
    { _id },
    {
      purchaseOrderNo,
      entity,
      project,
      supplier,
      selectedItems,
      purchaseReq,
      deliveryAddress,
      orderDate,
      deliveryDate,
      notes,
      deliveryTerms,
      totalPrice,
    }
  );
  return NextResponse.json(OrderDoc);
}

export async function GET(req: NextApiRequest) {
  await mongooseConnect();
  // @ts-ignore
  const id = req.nextUrl.searchParams.get("id") as string;
  if (id) {
    return NextResponse.json(await Order.findById(id));
  }
  return NextResponse.json(await Order.find());
}

export async function DELETE(req: NextApiRequest) {
  await mongooseConnect();
  const { _id } = await (req as any).json();
  await Order.deleteOne({ _id: _id });
  return NextResponse.json(_id);
}
