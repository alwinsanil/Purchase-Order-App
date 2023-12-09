"use client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AiFillPlusSquare } from "react-icons/ai";

const Orders = () => {
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

  function updateProject(value: string) {
    if (value !== "") {
      const propProject = allProjects.filter((en) => {
        return en._id === value;
      });
      setProject(propProject[0]);
    } else {
      setProject({ _id: "", projectName: "", purchaseReqCount: 0 });
    }
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
          onChange={(e) => updateProject(e.target.value)}
        >
          <option value="">Select Project</option>
          {!!allProjects?.length &&
            allProjects.map((project) => (
              <option key={project._id} value={project._id}>
                {project.projectName}
              </option>
            ))}
        </select>
      </div>
    </div>
  );
};

export default Orders;
