"use client";
import OrderForm from "@/components/OrderForm";
import axios from "axios";
import React, { useEffect, useState } from "react";

const EditOrder = ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const [orderInfo, setOrderInfo] = useState<any>(null);
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/api/orders?id=" + id).then((response) => {
      setOrderInfo(response.data);
    });
  }, [id]);
  return (
    <>
      <h2>Edit details of {orderInfo?.purchaseOrderNo}</h2>
      <OrderForm {...orderInfo} />
    </>
  );
};

export default EditOrder;
