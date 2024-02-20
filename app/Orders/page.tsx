"use client";
import { ExportData, OrderInterface } from "@/components/Interfaces";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AiFillPlusSquare } from "react-icons/ai";
import { BiExport } from "react-icons/bi";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { IoIosWarning, IoMdEye } from "react-icons/io";
import Select from "react-select";
import Popup from "reactjs-popup";
import { utils, writeFileXLSX } from "xlsx";

const Orders = () => {
  //styling for react-select
  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      fontSize: "1rem",
      backgroundColor: "white",
      borderColor: "#d1d5db",
      borderRadius: "0.5rem",
      boxShadow: "none",
      "&:hover": {
        borderColor: "#9ca3af",
      },
    }),
    option: (provided: any, state: { isSelected: any; isFocused: any }) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "#1C1917"
        : state.isFocused
        ? "#e5e7eb"
        : null,
      color: state.isSelected ? "#ffffff" : "#1f2937",
    }),
  };
  const router = useRouter();
  const [project, setProject] = useState({
    _id: "",
    projectName: "",
    purchaseReqCount: 0,
    orderCount: 0,
  });
  const [allProjects, setAllProjects] = useState([
    {
      _id: "",
      projectName: "",
      purchaseReqCount: 0,
      orderCount: 0,
    },
  ]);
  const [allOrders, setAllOrders] = useState<OrderInterface[]>([]);
  const [selectedOrders, setSelectedOrders] = useState<OrderInterface[]>([]);
  const [deletedId, setDeletedId] = useState("");

  useEffect(() => {
    axios.get("/api/projects").then((response) => {
      setAllProjects(response.data);
    });
  }, []);
  useEffect(() => {
    axios.get("/api/orders").then((response) => {
      setAllOrders(response.data);
    });
  }, [deletedId]);

  function updateOrders(value: string | undefined) {
    if (value !== "") {
      const propProject = allProjects.filter((en) => {
        return en._id === value;
      });
      setProject(propProject[0]);
      setSelectedOrders(
        allOrders.filter((e) => {
          return e.project._id === propProject[0]._id;
        })
      );
    } else {
      setProject({
        _id: "",
        projectName: "",
        purchaseReqCount: 0,
        orderCount: 0,
      });
    }
  }
  function exportReport() {
    if (selectedOrders) {
      const newExportData: ExportData[] = selectedOrders.map((order, index) => {
        return {
          SNo: index + 1,
          Date: order.orderDate,
          PO_Reference: order.purchaseOrderNo,
          Company: order.entity.entityCode,
          Oxaion_No: order.supplier.oxaion,
          BudgetPos: "",
          Supplier_Name: order.supplier.supplierName,
          Amount_AED_WO_VAT: order.totalPrice,
          Vat: 0.05 * order.totalPrice,
          OMR: null,
          SAR: null,
          EUR: null,
          GBP: null,
          USD: null,
          BHD: null,
          Total: order.totalPrice + 0.05 * order.totalPrice,
          Total_AED: order.totalPrice + 0.05 * order.totalPrice,
          Delivery_Status: "",
          Remarks: "",
        };
      });
      const date = new Date();
      const ws = utils.json_to_sheet(newExportData);
      const wb = utils.book_new();
      utils.book_append_sheet(wb, ws, "Data");
      writeFileXLSX(
        wb,
        "PO_Report_" +
          (date.getMonth() + 1).toString().padStart(2, "0") +
          date.getDate().toString().padStart(2, "0") +
          date.getFullYear() +
          ".xlsx"
      );
    }
  }
  function deletePR(_id: string) {
    axios.delete("/api/orders", { data: { _id: _id } }).then((response) => {
      setDeletedId(response.data);
      setSelectedOrders(selectedOrders.filter((pr) => pr._id !== _id));
    });
    return;
  }

  return (
    <div>
      <h1 className="mb-4">Purchase Order</h1>
      <Link href="/Orders/New" className="btn-1">
        <AiFillPlusSquare className="plusIcon" />
        Create New Purchase Order
      </Link>
      <div className="projItems mt-3">
        <label>Project Name</label>
        <Select
          isSearchable
          value={
            project && project._id
              ? allProjects.find((obj) => obj._id === project._id)
              : null
          }
          placeholder="Select Project"
          onChange={(selectedOption) =>
            updateOrders(selectedOption ? selectedOption._id : undefined)
          }
          options={allProjects}
          getOptionLabel={(option) => option.projectName}
          getOptionValue={(option) => option._id}
          styles={customStyles}
        />
        <table className="primary mt-3">
          <thead>
            <tr>
              <th>Order No.</th>
              <th>Supplier</th>
              <th>PR No.</th>
              <th>Delivery Date</th>
              <th>Price</th>
              <th className="flex justify-center items-center">
                <button type="button" className="btn-1" onClick={exportReport}>
                  <BiExport className="plusIcon" />
                  Generate Report
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {!!selectedOrders.length &&
              selectedOrders.map((o: OrderInterface) => (
                <tr className="odd:bg-white even:bg-gray-100" key={o._id}>
                  <td>{o.purchaseOrderNo}</td>
                  <td>{o.supplier.supplierName}</td>
                  <td>{o.purchaseReq.purchaseReqCode}</td>
                  <td>
                    {o.deliveryDate
                      ? new Date(o.deliveryDate).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })
                      : "TBD"}
                  </td>
                  <td className="max-w-fit text-sm">
                    {/* <Link
                      href={"Orders/"}
                      className="flex justify-center items-center gap-1 bg-gray-200 p-2 rounded-md w-24 hover:bg-gray-300"
                    >
                      <IoMdEye size="1.3em" />
                      View
                    </Link> */}
                    {o.totalPrice.toFixed(2) + " AED"}
                  </td>
                  <td className="flex gap-2 items-center justify-center text-right text-sm font-medium">
                    <Link
                      href={"Orders/Edit/" + o._id}
                      className="btn-blue-small"
                    >
                      <FaEdit />
                      Edit
                    </Link>
                    <Popup
                      className="my-popup"
                      trigger={
                        <button className="btn-red-small">
                          <FaTrashAlt />
                          Delete
                        </button>
                      }
                      modal
                      nested
                    >
                      {
                        // @ts-expect-error
                        (close: () => void) => (
                          <div className="px-4 py-1 max-h-full">
                            <button
                              className="mb-0 text-2xl text-left"
                              onClick={close}
                            >
                              &times;
                            </button>
                            <div className="flex flex-col gap-2 mb-6 text-xl font-bold items-center justify-center text-center">
                              <IoIosWarning size="5rem" color="#D2042D" />
                              Confirm Deletion
                            </div>
                            <div className="mb-4 flex items-center justify-center text-center">
                              Are you sure you want to delete{" "}
                              {o.purchaseOrderNo}?
                              <br /> This action cannot be undone.
                            </div>
                            <div className="mb-4 flex justify-center items-center gap-4">
                              <button
                                className="px-4 py-2 text-white bg-red-700 rounded"
                                onClick={() => {
                                  deletePR(o._id);
                                  router.push("/Orders");
                                  close();
                                }}
                              >
                                Delete
                              </button>
                              <button
                                className="px-4 py-2 text-white bg-gray-400 rounded"
                                onClick={() => {
                                  close();
                                }}
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        )
                      }
                    </Popup>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
