"use client";
import Link from "next/link";
import { AiFillPlusSquare } from "react-icons/ai";
import { useState, useEffect } from "react";
import axios from "axios";
import { IoIosWarning, IoMdEye } from "react-icons/io";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import "reactjs-popup/dist/index.css";
import Popup from "reactjs-popup";
import { MdViewCompact } from "react-icons/md";
import { useRouter } from "next/navigation";

interface itemInterface {
  fCodeAssembly: string;
  totalAssembledQty: string;
  fCodeAssemblyPart: string;
  description: string;
  material: string;
  finish: string;
  remarks: string;
  alloy: string;
  totalQty: number | null;
  width: number | null;
  thickness: number | null;
  length: number | null;
  volume: number | null;
  weight: number | null;
  totalKG: number | null;
  totalTons: number | null;
}

interface PRInterface {
  _id: string;
  itemList: itemInterface[];
  project: { _id: string; projectName: string; purchaseReqCount: number };
  purchaseReqCode: string;
}

const PurchaseReq = () => {
  const router = useRouter();
  const [purchaseReqs, setPurchaseReqs] = useState<PRInterface[]>([]);
  const [selectedPRs, setSelectedPRs] = useState<PRInterface[]>([]);
  const [deletedId, setDeletedId] = useState("");
  const [project, setProject] = useState({
    _id: "",
    projectName: "",
    purchaseReqCount: 0,
  });
  const [allProjects, setAllProjects] = useState([
    {
      _id: "",
      projectName: "",
      purchaseReqCount: 0,
    },
  ]);
  useEffect(() => {
    axios.get("/api/projects").then((response) => {
      setAllProjects(response.data);
    });
  }, []);
  useEffect(() => {
    axios.get("/api/pr").then((response) => {
      setPurchaseReqs(response.data);
    });
  }, [deletedId]);
  function deletePR(_id: string, purchaseReqCode: string, projectid: string) {
    const count = Number(purchaseReqCode.slice(-3)) - 1;
    axios.put("/api/projects", { purchaseReqCount: count, _id: projectid });
    axios.delete("/api/pr", { data: { _id: _id } }).then((response) => {
      setDeletedId(response.data);
      setSelectedPRs(selectedPRs.filter((pr) => pr._id !== _id));
    });
    return;
  }
  function updatePR(value: string) {
    if (value !== "") {
      const propProject = allProjects.filter((en) => {
        return en._id === value;
      });
      setProject(propProject[0]);
      setSelectedPRs(
        purchaseReqs.filter((e) => {
          return e.project._id === propProject[0]._id;
        })
      );
    } else {
      setProject({ _id: "", projectName: "", purchaseReqCount: 0 });
    }
  }

  return (
    <div>
      <h1 className="mb-4">Purchase Requests</h1>
      <Link href="/PurchaseReq/New" className="btn-1">
        <AiFillPlusSquare className="plusIcon" />
        Add New Purchase Request
      </Link>
      <div className="projItems mt-3">
        <label>Project Name</label>
        <select value={project?._id} onChange={(e) => updatePR(e.target.value)}>
          <option value="">Select Project</option>
          {!!allProjects?.length &&
            allProjects.map((project) => (
              <option key={project._id} value={project._id}>
                {project.projectName}
              </option>
            ))}
        </select>
      </div>
      <table className="primary mt-3">
        <thead>
          <tr>
            <th>PR Code</th>
            <th>Project</th>
            <th>Item Count</th>
            <th>View</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {!!selectedPRs.length &&
            selectedPRs.map((p: PRInterface) => (
              <tr className="odd:bg-white even:bg-gray-100" key={p._id}>
                <td>{p.purchaseReqCode}</td>
                <td>{p.project.projectName}</td>
                <td>{p.itemList.length}</td>
                <td className="max-w-fit text-sm">
                  <Link
                    href={"PurchaseReq/View/" + p._id}
                    className="flex justify-center items-center gap-1 bg-gray-200 p-2 rounded-md w-24 hover:bg-gray-300"
                  >
                    <IoMdEye size="1.3em" />
                    View
                  </Link>
                </td>
                <td className="flex gap-2 items-center justify-center text-right text-sm font-medium">
                  <Link
                    href={"PurchaseReq/Edit/" + p._id}
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
                            Are you sure you want to delete {p.purchaseReqCode}?
                            <br /> This action cannot be undone.
                          </div>
                          <div className="mb-4 flex justify-center items-center gap-4">
                            <button
                              className="px-4 py-2 text-white bg-red-700 rounded"
                              onClick={() => {
                                deletePR(
                                  p._id,
                                  p.purchaseReqCode,
                                  p.project._id
                                );
                                router.push("/PurchaseReq");
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

export default PurchaseReq;
