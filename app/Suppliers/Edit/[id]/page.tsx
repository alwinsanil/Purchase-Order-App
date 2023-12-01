"use client";
import SupplierForm from "@/components/SupplierForm";
import axios from "axios";
import { useEffect, useState } from "react";

const EditSupplierPage = ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const [supplierInfo, setSupplierInfo] = useState<any>(null);
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/api/suppliers?id=" + id).then((response) => {
      setSupplierInfo(response.data);
    });
  }, [id]);
  return (
    <>
      <h2>Edit details of {supplierInfo?.supplierName}</h2>
      {supplierInfo && <SupplierForm {...supplierInfo} />}
    </>
  );
};

export default EditSupplierPage;
