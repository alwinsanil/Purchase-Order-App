'use client'
import Link from "next/link";
import { AiFillPlusSquare } from "react-icons/ai";
import { useState, useEffect } from "react";
import axios from "axios";

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
  useEffect(() => {
    axios.get("/api/projects").then((response) => {
      setProjects(response.data);
    });
  }, []);
  return (
    <div>
      <h1 className="mb-4">Projects</h1>
      <Link href="/Projects/New" className="btn-1">
        <AiFillPlusSquare className="plusIcon" />
        Add New Project
      </Link>
      <table className="basic mt-3">
        <thead>
          <tr>
            <th>Entity</th>
            <th>Project Abbrev</th>
            <th>Project Name</th>
            <th>Contact Person</th>
          </tr>
        </thead>
        <tbody>
          {!!projects.length && projects.map((p:projectInterface) => (
            <tr key={p._id}>
              <td>{p.entity.entityName}</td>
              <td>{p.abbrev}</td>
              <td>{p.projectName}</td>
              <td>{p.contactPerson}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Projects;
