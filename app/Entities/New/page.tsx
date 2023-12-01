"use client";
import EntityForm from "@/components/EntityForm";

const NewEntity = () => {
  return (
    <div>
      <h2>Add New Entity</h2>
      <EntityForm _id={""} entityCode={0} entityAbbrev={""} entityName={""} entityTRN={0} entityAddress={{
        address: "",
        POBox: "",
        country: ""
      }} />
    </div>
  );
};

export default NewEntity;
