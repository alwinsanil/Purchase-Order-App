"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AiFillPlusSquare } from "react-icons/ai";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { IoIosWarning, IoMdEye } from "react-icons/io";
import Popup from "reactjs-popup";

interface itemInterface {
  fCodeAssembly: string;
  totalAssembledQty: string;
  fCodeAssemblyPart: string;
  description: string;
  material: string;
  finish: string;
  remarks: string;
  alloy: string;
  totalQty: number;
  width: number;
  thickness: number;
  length: number;
  volume: number;
  weight: number;
  totalKG: number;
  totalTons: number;
  unitPrice: number;
  totalCost: number;
}

interface OrderInterface {
  _id: string;
  purchaseOrderNo: string;
  entity: {
    _id: string;
    entityCode: number;
    entityAbbrev: string;
    entityName: string;
    entityTRN: number;
    entityAddress: {
      address: string;
      POBox: string;
      country: string;
    };
  };
  project: {
    _id: string;
    entity: {
      _id: string;
      entityCode: number;
      entityAbbrev: string;
      entityName: string;
    };
    abbrev: string;
    projectName: string;
    contractNo: string;
    deliveryAddress: {
      address: string;
      POBox: string;
      country: string;
    }[];
    contactPerson: string;
    orderCount: number;
    purchaseReqCount: number;
  };
  supplier: {
    _id: string;
    supplierCode: string;
    supplierName: string;
    supplierTRN: number;
    supplierAddress: {
      address: string;
      POBox: string;
      country: string;
    };
    contactName: string;
    contactNo: string;
    email: string;
    paymentTerm: string;
  };
  purchaseReq: {
    _id: string;
    itemList: itemInterface[];
    project: { _id: string; projectName: string; purchaseReqCount: number };
    purchaseReqCode: string;
  };
  deliveryAddress: { address: string; POBox: string; country: string };
  orderDate: Date;
  deliveryDate: Date | undefined;
}

const Orders = () => {
  const router = useRouter();
  const [project, setProject] = useState({
    _id: "",
    projectName: "",
    purchaseReqCount: 0,
    orderCount:  0,
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

  function updateOrders(value: string) {
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
      setProject({ _id: "", projectName: "", purchaseReqCount: 0, orderCount: 0 });
    }
  }
  function deletePR(_id: string, projectid: string) {
    const count = project.orderCount - 1;
    axios.put("/api/projects", { orderCount: count, _id: projectid });
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
        <select
          value={project?._id}
          onChange={(e) => updateOrders(e.target.value)}
        >
          <option value="">Select Project</option>
          {!!allProjects?.length &&
            allProjects.map((project) => (
              <option key={project._id} value={project._id}>
                {project.projectName}
              </option>
            ))}
        </select>
        <table className="primary mt-3">
          <thead>
            <tr>
              <th>PR Code</th>
              <th>Project</th>
              <th>Supplier</th>
              <th>PR No.</th>
              <th>Delivery Date</th>
              <th>View</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {!!selectedOrders.length &&
              selectedOrders.map((o: OrderInterface) => (
                <tr className="odd:bg-white even:bg-gray-100" key={o._id}>
                  <td>{o.purchaseOrderNo}</td>
                  <td>{o.project.projectName}</td>
                  <td>{o.supplier.supplierName}</td>
                  <td>{o.purchaseReq.purchaseReqCode}</td>
                  <td>
                    {o.deliveryDate &&
                      new Date(o.deliveryDate).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                  </td>
                  <td className="max-w-fit text-sm">
                    <Link
                      href={"Orders/"}
                      className="flex justify-center items-center gap-1 bg-gray-200 p-2 rounded-md w-24 hover:bg-gray-300"
                    >
                      <IoMdEye size="1.3em" />
                      View
                    </Link>
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
                                  deletePR(
                                    o._id,
                                    o.project._id
                                  );
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
