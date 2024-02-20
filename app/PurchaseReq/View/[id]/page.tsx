"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

const ViewPR = ({ params }: { params: { id: string } }) => {
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
  return (
    <div>
      <h2>Details of {purchaseReqInfo?.purchaseReqCode}</h2>
      <table className="secondary mt-3">
        <thead>
          <tr>
            <th>Fabrication Code Assembly</th>
            <th>Total Assembled Qty</th>
            <th>Fabrication Code Assembly Part</th>
            <th>Description</th>
            <th>Material</th>
            <th>Finish</th>
            <th>Remarks</th>
            <th>Alloy</th>
            <th>Total Qty</th>
            <th>Width (mm)</th>
            <th>Thickness (mm)</th>
            <th>Length (m)</th>
            <th>
              Volume (mm<sup>3</sup>)
            </th>
            <th>Weight (kg)</th>
            <th>Total Weight (kg)</th>
            <th>Total Weight (Tons)</th>
          </tr>
        </thead>
        <tbody>
          {purchaseReqInfo &&
            purchaseReqInfo.itemList.map((item: any, index: number) => (
              <tr key={index}>
                <td>{item.fCodeAssembly}</td>
                <td>{item.totalAssembledQty}</td>
                <td>{item.fCodeAssemblyPart}</td>
                <td>{item.description}</td>
                <td>{item.material}</td>
                <td>{item.finish}</td>
                <td>{item.remarks}</td>
                <td>{item.alloy}</td>
                <td>{item.totalQty}</td>
                <td>{item.width}</td>
                <td>{item.thickness}</td>
                <td>{item.length}</td>
                <td>{item.volume.toFixed(2)}</td>
                <td>{item.weight.toFixed(2)}</td>
                <td>{item.totalKG.toFixed(2)}</td>
                <td>{item.totalTons.toFixed(2)}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewPR;
