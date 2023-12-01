'use client'
import Link from "next/link";
import { AiFillPlusSquare } from "react-icons/ai";
import { useState, useEffect } from "react";
import axios from "axios";
import { IoIosWarning } from "react-icons/io";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import "reactjs-popup/dist/index.css";
import Popup from "reactjs-popup";


interface addrInterface {
  address: string;
  POBox: string;
  country: string;
}
interface projectInterface {
  _id: string;
  abbrev: string;
  projectName: string;
  contractNo: string;
  deliveryAddress: addrInterface[];
  contactPerson: string;
  entity: {entityName: string};
}

const Projects = () => {
  const [projects, setProjects] = useState<projectInterface[]>([]);
  const [deletedId, setDeletedId] = useState('')
  useEffect(() => {
    axios.get("/api/projects").then((response) => {
      setProjects(response.data);
    });
  }, [deletedId]);
  function deleteProject(_id: string) {
    axios.delete("/api/projects", { data: { _id: _id } }).then((response) => {
      setDeletedId(response.data);
    });
    return;
  }
  return (
    <div>
      <h1 className="mb-4">Projects</h1>
      <Link href="/Projects/New" className="btn-1">
        <AiFillPlusSquare className="plusIcon" />
        Add New Project
      </Link>
      <table className="primary mt-3">
        <thead>
          <tr>
            <th>Entity</th>
            <th>Project Abbrev</th>
            <th>Project Name</th>
            <th>Contact Person</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {!!projects.length &&
            projects.map((p: projectInterface) => (
              <tr className="odd:bg-white even:bg-gray-100" key={p._id}>
                <td>{p.entity.entityName}</td>
                <td>{p.abbrev}</td>
                <td>{p.projectName}</td>
                <td>{p.contactPerson}</td>
                <td className="flex gap-2 items-center justify-center text-right text-sm font-medium">
                  <Link
                    href={"Projects/Edit/" + p._id}
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
                            Are you sure you want to delete {p.projectName}?
                            <br /> This action cannot be undone.
                          </div>
                          <div className="mb-4 flex justify-center items-center gap-4">
                            <button
                              className="px-4 py-2 text-white bg-red-700 rounded"
                              onClick={() => {
                                deleteProject(p._id);
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

export default Projects;
