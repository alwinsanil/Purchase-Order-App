"use client"
import ProjectForm from "@/components/ProjectForm";
import axios from "axios";
import React, { useEffect, useState } from "react";

const EditProject = ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const [projectInfo, setProjectInfo] = useState<any>(null);
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/api/projects?id=" + id).then((response) => {
      setProjectInfo(response.data);
    });
  }, [id]);
  return (
    <>
      <h2>Edit details of {projectInfo?.projectName}</h2>
      <ProjectForm {...projectInfo} />
    </>
  );
};

export default EditProject;
