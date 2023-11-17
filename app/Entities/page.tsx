"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";
import { AiFillPlusSquare } from "react-icons/ai";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

interface entityInterface {
    _id: string;
    entityCode: number;
    entityAbbrev: string;
    entityName: string;
}
const Entities = () => {
  const [entities, setEntities] = useState([]);
  useEffect(() => {
    axios.get("/api/entities").then((response) => {
      setEntities(response.data);
    });
  }, []);
  return (
    <div>
      <h1 className="mb-4">Entities</h1>
      <Link href="/Entities/New" className="btn-1">
        <AiFillPlusSquare className="plusIcon" />
        Add New Entity
      </Link>
      <table className="basic mt-3">
        <thead>
          <tr>
            <th>Entity Code</th>
            <th>Entity Abbrev</th>
            <th>Entity Name</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
            {entities && entities.map((entity: entityInterface) => (
                <tr key={entity._id}>
                    <td>{entity.entityCode}</td>
                    <td>{entity.entityAbbrev}</td>
                    <td>{entity.entityName}</td>
                    <td className="flex gap-2">
                        <button className="btn-blue-small">
                            <FaEdit />
                            Edit
                        </button>
                        <button className="btn-red-small">
                            <FaTrashAlt />
                            Delete
                        </button>
                    </td>
                </tr>
                ))}
        </tbody>
      </table>
    </div>
  );
};

export default Entities;
