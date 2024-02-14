'use client'
import ProjectForm from "@/components/ProjectForm"


const NewProduct = () => {
  return (
    <div>
        <h2>Add New Project</h2>
        <ProjectForm _id={""} entity={{
        _id: "",
        entityCode: 0,
        entityAbbrev: "",
        entityName: ""
      }} abbrev={""} projectName={""} contractNo={""} deliveryAddress={[]} contactPerson={""} orderCount={0} purchaseReqCount={0} />
    </div>
  )
}

export default NewProduct