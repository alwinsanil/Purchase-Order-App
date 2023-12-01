"use client";
import SupplierForm from "@/components/SupplierForm";
import React from "react";

const NewSupplier = () => {
  return (
    <div>
      <h2>Add New Supplier</h2>
      <SupplierForm
        _id={""}
        supplierCode={""}
        supplierName={""}
        supplierTRN={0}
        supplierAddress={{
          address: "",
          POBox: "",
          country: "",
        }}
        contactName={""}
        contactNo={""}
        email={""}
        paymentTerm={""}
      />
    </div>
  );
};

export default NewSupplier;
