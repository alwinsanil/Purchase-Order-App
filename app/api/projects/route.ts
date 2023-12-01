import mongooseConnect from "@/lib/mongoose";
import { Project } from "@/models/Project";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function POST(req: NextApiRequest) {
  await mongooseConnect();
  const {
    abbrev,
    projectName,
    contractNo,
    deliveryAddress,
    contactPerson,
    entity,
    purchaseReqCount,
  } = await (req as any).json();
  const ProjectDoc = await Project.create({
    abbrev,
    projectName,
    contractNo,
    deliveryAddress,
    contactPerson,
    entity,
    purchaseReqCount
  });
  return NextResponse.json(ProjectDoc);
}

export async function PUT(req: NextApiRequest) {
  await mongooseConnect();
  const {
    _id,
    abbrev,
    projectName,
    contractNo,
    deliveryAddress,
    contactPerson,
    entity,
    purchaseReqCount,
  } = await (req as any).json();
  const ProjectDoc = await Project.updateOne(
    { _id },
    { abbrev, projectName, contractNo, deliveryAddress, contactPerson, entity, purchaseReqCount }
  );
  return NextResponse.json(ProjectDoc);
}

export async function GET(req: NextApiRequest) {
  await mongooseConnect();
  let id = null;
  if (req.url?.includes("=")) {
    id = req.url?.split("=").pop();
  }
  if (id) {
    return NextResponse.json(await Project.findById(id));
  }
  return NextResponse.json(await Project.find());
}

export async function DELETE(req: NextApiRequest) {
  await mongooseConnect();
  const { _id } = await (req as any).json();
  await Project.deleteOne({ _id: _id });
  return NextResponse.json(_id);
}
