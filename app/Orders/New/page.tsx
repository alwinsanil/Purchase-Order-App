"use client";
import OrderForm from "@/components/OrderForm";

const NewOrder = () => {
  return (
    <div>
      <h2>New Purchase Order</h2>
      <OrderForm
        _id={""}
        purchaseOrderNo={""}
        entity={{
          _id: "",
          entityCode: 0,
          entityAbbrev: "",
          entityName: "",
          entityTRN: 0,
          entityAddress: {
            address: "",
            POBox: "",
            country: "",
          },
        }}
        project={{
          _id: "",
          entity: {
            _id: "",
            entityCode: 0,
            entityAbbrev: "",
            entityName: "",
          },
          abbrev: "",
          projectName: "",
          contractNo: "",
          deliveryAddress: [],
          contactPerson: "",
          orderCount: 0,
          purchaseReqCount: 0,
        }}
        supplier={{
          _id: "",
          supplierCode: "",
          supplierName: "",
          supplierTRN: 0,
          oxaion: 0,
          supplierAddress: {
            address: "",
            POBox: "",
            country: "",
          },
          contactName: "",
          contactNo: "",
          email: "",
          paymentTerm: "",
          bankDetails: {
            beneficiary: "",
            bank: "",
            swiftCode: "",
            accountNumber: "",
            iban: "",
          },
        }}
        purchaseReq={{
          _id: "",
          itemList: [],
          project: {
            _id: "",
            projectName: "",
            purchaseReqCount: 0,
          },
          purchaseReqCode: "",
        }}
        deliveryAddress={{
          address: "",
          POBox: "",
          country: "",
        }}
        orderDate={new Date()}
        deliveryDate={undefined}
        notes={[]}
        deliveryTerms={[]}
        selectedItems={[
          {
            itemIndex: 0,
            fCodeAssembly: "",
            totalAssembledQty: "",
            fCodeAssemblyPart: "",
            description: "",
            material: "",
            finish: "",
            remarks: "",
            alloy: "",
            totalQty: 0,
            width: 0,
            thickness: 0,
            length: 0,
            volume: 0,
            weight: 0,
            totalKG: 0,
            totalTons: 0,
            unitPrice: 0,
            totalCost: 0,
          },
        ]}
      />
    </div>
  );
};

export default NewOrder;
