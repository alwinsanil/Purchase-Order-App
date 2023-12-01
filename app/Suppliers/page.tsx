"use client";
import Link from "next/link";
import { AiFillPlusSquare } from "react-icons/ai";
import { IoIosWarning } from "react-icons/io";
import "reactjs-popup/dist/index.css";
import Popup from "reactjs-popup";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";

interface supplierInterface {
  _id: string;
  supplierCode: string;
  supplierName: string;
  contactName: string;
  contactNo: string;
}

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [deletedId, setDeletedId] = useState("");
  useEffect(() => {
    axios.get("/api/suppliers").then((response) => {
      setSuppliers(response.data);
    });
  }, [deletedId]);
  function deleteSupplier(_id: string) {
    axios.delete("/api/suppliers", { data: { _id: _id } }).then((response) => {
      setDeletedId(response.data);
    });
    return;
  }
  return (
    <div>
      <h1 className="mb-4">Suppliers</h1>
      <Link href="/Suppliers/New" className="btn-1">
        <AiFillPlusSquare className="plusIcon" />
        Add New Supplier
      </Link>
      <table className="mt-3 primary">
        <thead>
          <tr>
            <th>Supplier Code</th>
            <th>Supplier Name</th>
            <th>Contact Name</th>
            <th>Contact No.</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {suppliers &&
            suppliers.map((supplier: supplierInterface) => (
              <tr className="odd:bg-white even:bg-gray-100" key={supplier._id}>
                <td>{supplier.supplierCode}</td>
                <td>{supplier.supplierName}</td>
                <td>{supplier.contactName}</td>
                <td>{supplier.contactNo}</td>
                <td className="flex gap-2 items-center justify-center text-right text-sm font-medium">
                  <Link
                    href={"Suppliers/Edit/" + supplier._id}
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
                            {supplier.supplierName}?
                            <br /> This action cannot be undone.
                          </div>
                          <div className="mb-4 flex justify-center items-center gap-4">
                            <button
                              className="px-4 py-2 text-white bg-red-700 rounded"
                              onClick={() => {
                                deleteSupplier(supplier._id);
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
  );
};

export default Suppliers;
