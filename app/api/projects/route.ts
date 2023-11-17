import mongooseConnect from "@/lib/mongoose";
import { Project } from "@/models/Project";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function POST(req: NextApiRequest) {
  await mongooseConnect();
  const { abbrev, projectName, contractNo, deliveryAddress, contactPerson, entity } =
    await (req as any).json();
    console.log({entity});
  const ProjectDoc = await Project.create({
    abbrev,
    projectName,
    contractNo,
    deliveryAddress,
    contactPerson,
    entity
  });
  return NextResponse.json(ProjectDoc);
}

export async function GET(req: NextApiRequest) {
  await mongooseConnect();
  return NextResponse.json(await Project.find());
}
