"use client";
import EntityForm from "@/components/EntityForm";
import axios from "axios";
import { useEffect, useState } from "react";

const EditEntityPage = ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const [entityInfo, setEntityInfo] = useState<any>(null);
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/api/entities?id=" + id).then((response) => {
      setEntityInfo(response.data);
    });
  }, [id]);
  return (
    <>
      <h2>Edit details of {entityInfo?.entityName}</h2>
      {entityInfo && (
        <EntityForm {...entityInfo} />
      )}
    </>
  );
};

export default EditEntityPage;
