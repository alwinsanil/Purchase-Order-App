"use client";
import PRForm from "@/components/PRForm";
import axios from "axios";
import React, { useEffect, useState } from "react";

const EditPR = ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const [purchaseReqInfo, setPurchaseReqInfo] = useState<any>(null);
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/api/pr?id=" + id).then((response) => {
      setPurchaseReqInfo(response.data);
    });
  }, [id]);
  console.log(purchaseReqInfo);
  return (
    <>
      <h2>Edit details of {purchaseReqInfo?.purchaseReqCode}</h2>
      <PRForm {...purchaseReqInfo} />
    </>
  );
};

export default EditPR;
