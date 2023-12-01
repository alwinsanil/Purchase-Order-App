import mongooseConnect from "@/lib/mongoose";
import { Supplier } from "@/models/Supplier";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export async function POST(req: NextApiRequest) {
  await mongooseConnect();
  const {
    supplierCode,
    supplierName,
    supplierAddress,
    supplierTRN,
    contactName,
    contactNo,
    email,
    paymentTerm,
  } = await (req as any).json();
  const SupplierDoc = await Supplier.create({
    supplierCode,
    supplierName,
    supplierAddress,
    supplierTRN,
    contactName,
    contactNo,
    email,
    paymentTerm,
  });
  return NextResponse.json(SupplierDoc);
}

export async function PUT(req: NextApiRequest) {
  await mongooseConnect();
  const {
    _id,
    supplierCode,
    supplierName,
    supplierAddress,
    supplierTRN,
    contactName,
    contactNo,
    email,
    paymentTerm,
  } = await(req as any).json();
  const SupplierDoc = await Supplier.updateOne(
    { _id },
    {
      supplierCode,
      supplierName,
      supplierAddress,
      supplierTRN,
      contactName,
      contactNo,
      email,
      paymentTerm,
    }
  );
  return NextResponse.json(SupplierDoc);
}

export async function GET(req: NextApiRequest) {
  await mongooseConnect();
  let id = null;
  if (req.url?.includes("=")) {
    id = req.url?.split("=").pop();
  }
  if (id) {
    return NextResponse.json(await Supplier.findById(id));
  }
  return NextResponse.json(await Supplier.find());
}

export async function DELETE(req: NextApiRequest) {
  await mongooseConnect();
  const { _id } = await (req as any).json();
  await Supplier.deleteOne({ _id: _id });
  return NextResponse.json(_id);
}
