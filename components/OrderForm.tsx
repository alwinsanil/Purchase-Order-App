import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import Select from "react-select";

const OrderForm = () => {
  const router = useRouter();
  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      fontSize: "1rem",
      backgroundColor: "white",
      borderColor: "#d1d5db",
      borderRadius: "0.5rem",
      boxShadow: "none",
      "&:hover": {
        borderColor: "#9ca3af",
      },
    }),
    option: (provided: any, state: { isSelected: any; isFocused: any }) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "#1C1917"
        : state.isFocused
        ? "#e5e7eb"
        : null,
      color: state.isSelected ? "#ffffff" : "#1f2937",
    }),
  };
  const [entity, setEntity] = useState({
    _id: "",
    entityName: "",
    entityTRN: 0,
    entityAbbrev: "",
    entityAddress: {
      address: "",
      POBox: "",
      country: "",
    },
  });
  const [allEntities, setAllEntities] = useState([
    {
      _id: "",
      entityName: "",
      entityTRN: 0,
      entityAbbrev: "",
      entityAddress: {
        address: "",
        POBox: "",
        country: "",
      },
    },
  ]);
  const [project, setProject] = useState({
    _id: "",
    projectName: "",
    abbrev: "",
    contactPerson: "",
    deliveryAddress: [
      {
        address: "",
        POBox: "",
        country: "",
      },
    ],
    orderCount: 0,
    purchaseReqCount: 0,
  });
  const [allProjects, setAllProjects] = useState([
    {
      _id: "",
      projectName: "",
      abbrev: "",
      contactPerson: "",
      deliveryAddress: [
        {
          address: "",
          POBox: "",
          country: "",
        },
      ],
      orderCount: 0,
      purchaseReqCount: 0,
    },
  ]);
  const [supplier, setSupplier] = useState({
    _id: "",
    supplierName: "",
    supplierTRN: 0,
    supplierCode: "",
    contactName: "",
    contactNo: "",
    email: "",
    paymentTerm: "",
  })
  const [allSuppliers, setAllSuppliers] = useState([{
    _id: "",
    supplierName: "",
    supplierTRN: 0,
    supplierCode: "",
    contactName: "",
    contactNo: "",
    email: "",
    paymentTerm: "",
  }])
  const [purchaseOrderNo, setPurchaseOrderNo] = useState("");
  useEffect(() => {
    axios.get("/api/entities").then((response) => {
      setAllEntities(response.data);
    });
  }, []);
  useEffect(() => {
    axios.get("/api/suppliers").then((response) => {
      setAllSuppliers(response.data);
    });
  }, []);
  useEffect(() => {
    const searchEntity = entity.entityName;
    if (searchEntity !== "") {
      axios.get("/api/projects?entity=" + searchEntity).then((response) => {
        setAllProjects(response.data);
      });
    }
  }, [entity]);

  function updateEntity(value: string | undefined) {
    if (value !== undefined) {
      const propEntity = allEntities.filter((en) => {
        return en._id === value;
      });
      setEntity(propEntity[0]);
      updateProject(undefined);
    } else {
      setEntity({
        _id: "",
        entityName: "",
        entityTRN: 0,
        entityAbbrev: "",
        entityAddress: { address: "", POBox: "", country: "" },
      });
    }
  }
  function updateProject(value: string | undefined) {
    if (value !== undefined) {
      const propProject = allProjects.filter((en) => {
        return en._id === value;
      });
      setProject(propProject[0]);
      const tempOrderCount = String(project.orderCount + 1);
      const pOrderNo =
        entity.entityAbbrev +
        "/" +
        propProject[0].abbrev +
        tempOrderCount.padStart(3, "0") +
        "/" +
        new Date().getFullYear();
      setPurchaseOrderNo(pOrderNo);
    } else {
      setProject({
        _id: "",
        projectName: "",
        abbrev: "",
        contactPerson: "",
        deliveryAddress: [
          {
            address: "",
            POBox: "",
            country: "",
          },
        ],
        orderCount: 0,
        purchaseReqCount: 0,
      });
    }
  }
  function updateSupplier(value: string | undefined) {
    if (value !== undefined) {
      const propSupplier = allSuppliers.filter((en) => {
        return en._id === value;
      });
      setSupplier(propSupplier[0]);
    } else {
      setSupplier({
        _id: "",
        supplierName: "",
        supplierTRN: 0,
        supplierCode: "",
        contactName: "",
        contactNo: "",
        email: "",
        paymentTerm: "",
      });
    }
  }
  async function saveOrder(e: React.FormEvent) {
    e.preventDefault();
    if (project._id === "") {
      alert("Project Cannot be Empty");
      return;
    }
    const data = {
      //   itemList,
      //   project,
      //   purchaseReqCode,
    };

    // if (_id) {
    //   await axios.put("/api/pr", { ...data, _id });
    // } else {
    //   await axios.post("/api/pr", data);
    //   await axios.put("/api/projects", {
    //     purchaseReqCount: PRCount,
    //     _id: project._id,
    //   });
    // }
    router.push("/PurchaseReq");
  }

  return (
    <div>
      <form onSubmit={saveOrder} className="flex flex-col gap-3 mt-3">
        <div className="projItems">
          <label>Entity Name</label>
          <Select
            isSearchable
            value={
              entity && entity._id
                ? allEntities.find((obj) => obj._id === entity._id)
                : null
            }
            placeholder="Select Entity"
            onChange={(selectedOption) => updateEntity(selectedOption?._id)}
            options={allEntities}
            getOptionLabel={(option) => option.entityName}
            getOptionValue={(option) => option._id}
            styles={customStyles}
          />
        </div>
        <div className="projItems">
          <label>Project Name</label>
          <Select
            isSearchable
            value={
              project && project._id
                ? allProjects.find((obj) => obj._id === project._id)
                : null
            }
            placeholder="Select Project"
            onChange={(selectedOption) =>
              updateProject(selectedOption ? selectedOption._id : undefined)
            }
            options={allProjects}
            getOptionLabel={(option) => option.projectName}
            getOptionValue={(option) => option._id}
            styles={customStyles}
          />
        </div>
        {project._id && (
          <div className="projItems">
            <h2>Purchase Order: {purchaseOrderNo}</h2>
          </div>
        )}
        <div className="projItems">
          <label>Supplier Name</label>
          <Select
            isSearchable
            value={
              supplier && supplier._id
                ? allSuppliers.find((obj) => obj._id === supplier._id)
                : null
            }
            placeholder="Select Supplier"
            onChange={(selectedOption) => updateSupplier(selectedOption?._id)}
            options={allSuppliers}
            getOptionLabel={(option) => option.supplierName}
            getOptionValue={(option) => option._id}
            styles={customStyles}
          />
        </div>
        <div className="flex gap-2"></div>
        <div className="mt-2 flex gap-3">
          <button type="submit" className="btn-green">
            <FaCheck />
            Save
          </button>
          <Link href="/Orders" type="button" className="btn-red">
            <MdCancel />
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
};

export default OrderForm;
