import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { EntityInterface } from "./EntityForm";
import { ProjectInterface } from "./ProjectForm";
import { SupplierInterface } from "./SupplierForm";
import { itemInterface } from "./OrderForm";
import "../lib/ARIAL-normal";
import "../lib/ARIAL-bold";
import "../lib/ARIAL-italic";
import "../lib/ARIAL-bolditalic";

interface PRInterface {
  _id: string;
  itemList: itemInterface[];
  project: { _id: string; projectName: string; purchaseReqCount: number };
  purchaseReqCode: string;
}

export default function GeneratePDF(
  fileName: string,
  entity: EntityInterface,
  project: ProjectInterface,
  supplier: SupplierInterface,
  purchasereq: PRInterface,
  deliveryAddress: {
    address: string;
    POBox: string;
    country: string;
  },
  orderDate: Date | undefined,
  deliveryDate: Date | undefined
) {
  const imgData = new Image();
  imgData.src = "/images/lindner_logo.png";
  const doc = new jsPDF();
  //consts
  const pgwidth = doc.internal.pageSize.getWidth();
  const mid = pgwidth / 2;
  const netAmount = purchasereq.itemList.reduce(
    (sum, item) => sum + item.totalCost,
    0
  );
  if (purchasereq.itemList.length > 15) {
    const subtotal_1 = purchasereq.itemList
      .slice(0, 15)
      .reduce((sum, item) => sum + item.totalCost, 0);
  }
  const vat = (5 / 100) * netAmount;
  const totalAmount = netAmount + vat;

  //Logo
  doc.addImage(imgData, "PNG", 16.5, 5.5, 53, 12);
  doc.setFontSize(7);
  doc.setFont("ARIAL", "normal");
  //Entity Name
  var text = entity.entityName;
  var x =
    pgwidth -
    (doc.getStringUnitWidth(text) * 7) / doc.internal.scaleFactor -
    25;
  doc.text(text, x, 10);
  //Entity Address
  text = entity.entityAddress.address;
  x =
    pgwidth -
    (doc.getStringUnitWidth(text) * 7) / doc.internal.scaleFactor -
    25;
  doc.text(text, x, 13.5);
  //Entity Country
  text = entity.entityAddress.country;
  x =
    pgwidth -
    (doc.getStringUnitWidth(text) * 7) / doc.internal.scaleFactor -
    25;
  doc.text(text, x, 17);
  //Entity PO Box
  text = "P.O. Box: " + entity.entityAddress.POBox;
  x =
    pgwidth -
    (doc.getStringUnitWidth(text) * 7) / doc.internal.scaleFactor -
    25;
  doc.text(text, x, 20.5);
  //Purchase Order
  doc.setFontSize(12);
  var header = "PURCHASE ORDER";
  doc.setFont("ARIAL", "bold");
  var textWidth =
    (doc.getStringUnitWidth(header) * 12) / doc.internal.scaleFactor;
  x = (pgwidth - textWidth) / 2;
  doc.text(header, x, 31);
  //Column 1
  //To:
  doc.setFontSize(7);
  doc.setFont("ARIAL", "bold");
  doc.text("To:", 22, 37);
  doc.setFont("ARIAL", "normal");
  doc.text(supplier.supplierName, 44, 37);
  doc.text(supplier.supplierAddress.address, 44, 40.5);
  doc.text("P.O. Box: " + supplier.supplierAddress.POBox, 44, 44);
  //TRN:
  doc.setFont("ARIAL", "bold");
  doc.text("TRN:", 22, 48);
  doc.setFont("ARIAL", "normal");
  doc.text(String(supplier.supplierTRN), 44, 48);
  //Contact Person:
  doc.setFont("ARIAL", "bold");
  doc.text("Contact Person:", 22, 52);
  doc.setFont("ARIAL", "normal");
  doc.text(supplier.contactName, 44, 52);
  //Contact No
  doc.setFont("ARIAL", "bold");
  doc.text("Phone:", 22, 56);
  doc.setFont("ARIAL", "normal");
  doc.text(supplier.contactNo, 44, 56);
  //Email ID
  doc.setFont("ARIAL", "bold");
  doc.text("Email ID:", 22, 60);
  doc.setFont("ARIAL", "normal");
  doc.text(supplier.email, 44, 60);
  //Order No.
  doc.setFont("ARIAL", "bold");
  doc.text("Order No.:", 22, 64);
  doc.setFont("ARIAL", "normal");
  doc.text(fileName, 44, 64);
  //Contract No
  doc.setFont("ARIAL", "bold");
  doc.text("Contract No.:", 22, 68);
  doc.setFont("ARIAL", "normal");
  doc.text(project.contractNo, 44, 68);
  //Entity TRN
  doc.setFont("ARIAL", "bold");
  doc.text("TRN:", 22, 72);
  doc.setFont("ARIAL", "normal");
  doc.text(String(entity.entityTRN), 44, 72);

  //Column 2
  //Project Name
  doc.setFont("ARIAL", "bold");
  doc.text("Project Name:", mid, 37);
  doc.setFont("ARIAL", "normal");
  doc.text(project.projectName, mid + 24, 37);
  //Delivery Address
  doc.setFont("ARIAL", "bold");
  doc.text("Delivery Address:", mid, 41);
  doc.setFont("ARIAL", "normal");
  doc.text(deliveryAddress.address, mid + 24, 41);
  doc.text(deliveryAddress.country, mid + 24, 44.5);
  if (deliveryAddress.address === "Delivery location to be declared")
    doc.text(deliveryAddress.POBox, mid + 24, 48);
  else doc.text("P.O. Box: " + deliveryAddress.POBox, mid + 24, 48);
  //Contact Person
  doc.setFont("ARIAL", "bold");
  doc.text("Contact Person:", mid, 52);
  doc.setFont("ARIAL", "normal");
  doc.text(project.contactPerson, mid + 24, 52);
  //Payment Term
  doc.setFont("ARIAL", "bold");
  doc.text("Payment Term", mid, 56);
  doc.setFont("ARIAL", "normal");
  doc.text(supplier.paymentTerm, mid + 24, 56);
  //Budget Code
  doc.setFont("ARIAL", "bold");
  doc.text("Budget Code:", mid, 60);
  doc.setFont("ARIAL", "normal");
  doc.text("", mid + 24, 60);
  //Order Date
  doc.setFont("ARIAL", "bold");
  doc.text("Order Date:", mid, 64);
  doc.setFont("ARIAL", "normal");
  doc.text(
    "" +
      orderDate?.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
    mid + 24,
    64
  );
  //Delivery Date
  doc.setFont("ARIAL", "bold");
  doc.text("Delivery Date:", mid, 68);
  doc.setFont("ARIAL", "normal");
  doc.text(
    "" +
      deliveryDate?.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
    mid + 24,
    68
  );

  //Instructions
  doc.setFont("ARIAL", "italic");
  text = "Please*Fabricate*, *Supply* &*Deliver* the Services  described below";
  textWidth = (doc.getStringUnitWidth(text) * 7) / doc.internal.scaleFactor;
  x = (pgwidth - textWidth) / 2;
  doc.text(text, x, 76);
  text = "in accordance with the terms and conditions included with this Order";
  textWidth = (doc.getStringUnitWidth(text) * 7) / doc.internal.scaleFactor;
  x = (pgwidth - textWidth) / 2;
  doc.text(text, x, 79);

  autoTable(doc, {
    startY: 85,
    theme: "plain",
    headStyles: {
      font: "ARIAL",
      fontStyle: "bold",
      fontSize: 7,
      lineWidth: 0.2,
      lineColor: "#000",
      halign: "center",
      cellPadding: 1,
    },
    bodyStyles: {
      font: "ARIAL",
      fontStyle: "normal",
      fontSize: 7,
      lineWidth: 0.2,
      lineColor: "#000",
      cellPadding: 0.5,
    },
    columns: [
      { header: "QUANTITY", dataKey: "qty" },
      { header: "DESCRIPTION", dataKey: "desc" },
      { header: "Unit Price", dataKey: "up" },
      { header: "Total", dataKey: "total" },
    ],
    columnStyles: { desc: { minCellWidth: 80 }, total: { halign: "right" } },
    head: [["QUANTITY", "DESCRIPTION", "Unit Price", "TOTAL"]],
    body: purchasereq.itemList.map((item) => [
      String(item.totalQty),
      item.description,
      String(item.unitPrice),
      "AED " + String(item.totalCost.toFixed(2)),
    ]),
    margin: { left: 22, right: 24 },
  });
  // @ts-expect-error
  let finalY = doc.lastAutoTable.finalY;
  doc.setFont("ARIAL", "bolditalic");
  text = "Net Amount: ";
  x =
    pgwidth -
    (doc.getStringUnitWidth(text) * 7) / doc.internal.scaleFactor -
    47;
  doc.text(text, x, finalY + 4);
  text = "VAT (5%): ";
  x =
    pgwidth -
    (doc.getStringUnitWidth(text) * 7) / doc.internal.scaleFactor -
    47;
  doc.text(text, x, finalY + 8.5);
  text = "Gross Amount: ";
  x =
    pgwidth -
    (doc.getStringUnitWidth(text) * 7) / doc.internal.scaleFactor -
    47;
  doc.text(text, x, finalY + 13);
  autoTable(doc, {
    theme: "plain",
    startY: finalY,
    bodyStyles: {
      font: "ARIAL",
      fontStyle: "bold",
      fontSize: 7,
      lineWidth: 0.2,
      lineColor: "#000",
      cellPadding: 1,
      halign: "right",
    },
    body: [[netAmount], [vat], [totalAmount]],
    margin: { left: 165.3, right: 24 },
  });
  doc.save(fileName + ".pdf");
}
