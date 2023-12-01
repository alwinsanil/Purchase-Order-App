"use client";
import PRForm from "@/components/PRForm";

const NewPurchaseReq = () => {
  return (
    <>
      <h2>New Purchase Request</h2>
      <PRForm _id={""} itemList={[]} project={{
              _id: "",
              projectName: "",
              purchaseReqCount: 0
          }} purchaseReqCode={""} />
    </>
  );
};

export default NewPurchaseReq;
