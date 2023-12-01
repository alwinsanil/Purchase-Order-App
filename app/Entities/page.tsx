"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";
import { AiFillPlusSquare } from "react-icons/ai";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import "reactjs-popup/dist/index.css";
import Popup from "reactjs-popup";
import { IoIosWarning } from "react-icons/io";

interface entityInterface {
  _id: string;
  entityCode: number;
  entityAbbrev: string;
  entityName: string;
}
const Entities = () => {
  const [entities, setEntities] = useState([]);
  const [deletedId, setDeletedId] = useState('');
  useEffect(() => {
    axios.get("/api/entities").then((response) => {
      setEntities(response.data);
    });
  }, [deletedId]);
  function deleteEntity(_id: string) {
    axios.delete("/api/entities", { data: { _id: _id } }).then(response => {
      setDeletedId(response.data)
    });
    return;
  }
  return (
    <div>
      <h1 className="mb-4">Entities</h1>
      <Link href="/Entities/New" className="btn-1">
        <AiFillPlusSquare className="plusIcon" />
        Add New Entity
      </Link>
      <table className="mt-3 primary">
        <thead>
          <tr>
            <th>Entity Code</th>
            <th>Entity Abbrev</th>
            <th>Entity Name</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {entities &&
            entities.map((entity: entityInterface) => (
              <tr className="odd:bg-white even:bg-gray-100" key={entity._id}>
                <td>{entity.entityCode}</td>
                <td>{entity.entityAbbrev}</td>
                <td>{entity.entityName}</td>
                <td className="flex gap-2 items-center justify-center text-right text-sm font-medium">
                  <Link
                    href={"Entities/Edit/" + entity._id}
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
                            Are you sure you want to delete {entity.entityName}?
                            <br /> This action cannot be undone.
                          </div>
                          <div className="mb-4 flex justify-center items-center gap-4">
                            <button
                              className="px-4 py-2 text-white bg-red-700 rounded"
                              onClick={() => {
                                deleteEntity(entity._id);
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

export default Entities;
