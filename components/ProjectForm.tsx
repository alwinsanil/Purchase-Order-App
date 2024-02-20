import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { AiFillPlusSquare } from "react-icons/ai";
import { FaCheck } from "react-icons/fa6";
import { MdCancel } from "react-icons/md";
import Select from "react-select";
import { AddressInterface, ProjectInterface, ProjectValidationInterface } from "./Interfaces";

const ProjectForm: React.FC<ProjectInterface> = ({
  _id,
  entity: existingEntity,
  abbrev: existingAbbrev,
  projectName: existingProjectName,
  contractNo: existingContractNo,
  deliveryAddress: existingDeliveryAddresses,
  contactPerson: existingContactPerson,
}) => {
  //styling for react-select
  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      fontSize: "1rem",
      backgroundColor: "white",
      border: validation.entity._id ? "2px solid #e53e3e" : "1px solid #d1d5db",
      borderRadius: "0.5rem",
      boxShadow: "none",
      "&:hover": {
        borderColor: validation.entity._id ? "#e53e3e" : "#9ca3af",
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
  const router = useRouter();
  const [abbrev, setAbbrev] = useState("");
  const [projectName, setProjectName] = useState("");
  const [contractNo, setContractNo] = useState("");
  const purchaseReqCount = 0;
  const orderCount = 0;
  const [deliveryAddress, setDeliveryAddress] = useState<AddressInterface[]>([]);
  const [contactPerson, setContactPerson] = useState("");
  const [entity, setEntity] = useState({
    _id: "",
    entityCode: 0,
    entityAbbrev: "",
    entityName: "",
  });
  const [allEntities, setAllEntities] = useState([
    {
      _id: "",
      entityCode: 0,
      entityAbbrev: "",
      entityName: "",
    },
  ]);
  const [validation, setValidation] = useState<ProjectValidationInterface>({
    entity: {
      _id: false,
    },
    abbrev: false,
    projectName: false,
    contractNo: false,
    contactPerson: false,
  });
  useEffect(() => {
    setAbbrev(existingAbbrev);
    setEntity(existingEntity);
    setProjectName(existingProjectName);
    setContractNo(existingContractNo);
    setDeliveryAddress(existingDeliveryAddresses);
    setContactPerson(existingContactPerson);
  }, [
    existingAbbrev,
    existingContactPerson,
    existingContractNo,
    existingDeliveryAddresses,
    existingEntity,
    existingProjectName,
  ]);
  useEffect(() => {
    axios
      .get("/api/entities")
      .then((response) => setAllEntities(response.data));
  }, []);

  function handleAddressChange(index: number, newAddress: string) {
    const newDeliveryAddress = [...deliveryAddress];
    newDeliveryAddress[index].address = newAddress;
    setDeliveryAddress(newDeliveryAddress);
  }
  function handlePOBoxChange(index: number, newPOBox: string) {
    const newDeliveryAddress = [...deliveryAddress];
    newDeliveryAddress[index].POBox = newPOBox;
    setDeliveryAddress(newDeliveryAddress);
  }
  function handleCountryChange(index: number, newCountry: string) {
    const newDeliveryAddress = [...deliveryAddress];
    newDeliveryAddress[index].country = newCountry;
    setDeliveryAddress(newDeliveryAddress);
  }
  function addAddress() {
    setDeliveryAddress((prev) => {
      return [...prev, { address: "", POBox: "", country: "" }];
    });
  }
  function removeAddress(indexToRemove: number) {
    setDeliveryAddress((prev) => {
      return [...prev].filter((_, index) => {
        return index !== indexToRemove;
      });
    });
  }
  function updateEntity(value: string | undefined) {
    if (value !== "") {
      const propEntity = allEntities.filter((en) => {
        return en._id === value;
      });
      setEntity(propEntity[0]);
    }
  }
  async function saveProject(e: React.FormEvent) {
    e.preventDefault();

    const newValidation = { ...validation };
    if (!entity._id) newValidation.entity._id = true;
    else newValidation.entity._id = false;
    if (!abbrev) newValidation.abbrev = true;
    else newValidation.abbrev = false;
    if (!projectName) newValidation.projectName = true;
    else newValidation.projectName = false;
    if (!contractNo) newValidation.contractNo = true;
    else newValidation.contractNo = false;
    if (!contactPerson) newValidation.contactPerson = true;
    else newValidation.contactPerson = false;

    setValidation(newValidation);
    if (
      Object.keys(newValidation).every((key) => {
        if (
          typeof newValidation[key as keyof ProjectValidationInterface] ===
          "object"
        ) {
          return Object.values(
            newValidation[key as keyof ProjectValidationInterface]
          ).every((val) => !val);
        } else {
          return !newValidation[key as keyof ProjectValidationInterface];
        }
      })
    ) {
      const data = {
        abbrev,
        projectName,
        contractNo,
        contactPerson,
        deliveryAddress: deliveryAddress.map((addr) => ({
          address: addr.address,
          POBox: addr.POBox,
          country: addr.country,
        })),
        entity,
      };
      if (_id) {
        await axios.put("/api/projects", { ...data, _id });
      } else {
        await axios.post("/api/projects", {
          ...data,
          purchaseReqCount,
          orderCount,
        });
      }
      router.push("/Projects");
    } else {
      alert("Enter missing details!");
    }
  }

  return (
    <div>
      <form onSubmit={saveProject} className="flex flex-col gap-3 mt-3">
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
        <div className="flex gap-4">
          <div className="projItems">
            <label>Project Abbrevation</label>
            <input
              type="text"
              placeholder="Abbrevation"
              value={abbrev}
              onChange={(e) => setAbbrev(e.target.value)}
              className={validation.abbrev ? "error" : ""}
            />
          </div>
          <div className="projItems flex-grow">
            <label>Project Name</label>
            <input
              type="text"
              placeholder="Project Name"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className={validation.projectName ? "error" : ""}
            />
          </div>
        </div>
        <div className="projItems">
          <label>Contract No.</label>
          <input
            type="text"
            placeholder="Contract No."
            value={contractNo}
            onChange={(e) => setContractNo(e.target.value)}
            className={validation.contractNo ? "error" : ""}
          />
        </div>
        <div className="projItems gap-2">
          <label>Delivery Address</label>
          <button type="button" className="btn-1" onClick={() => addAddress()}>
            <AiFillPlusSquare className="plusIcon" />
            Add New Address
          </button>
          {!!deliveryAddress?.length &&
            deliveryAddress.map((addr, index) => (
              <div className="flex gap-2" key={index}>
                <input
                  className="flex-grow"
                  type="text"
                  placeholder="Address"
                  value={addr.address}
                  onChange={(e) => handleAddressChange(index, e.target.value)}
                />
                <input
                  className=""
                  type="text"
                  placeholder="PO Box No."
                  value={addr.POBox}
                  onChange={(e) => handlePOBoxChange(index, e.target.value)}
                />
                <input
                  className=""
                  type="text"
                  placeholder="Emirate/country"
                  value={addr.country}
                  onChange={(e) => handleCountryChange(index, e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => removeAddress(index)}
                  className="bg-red-800 py-1 px-2 rounded-lg"
                >
                  Delete
                </button>
              </div>
            ))}
        </div>
        <div className="projItems">
          <label>Contact Person</label>
          <input
            type="text"
            placeholder="Contact Person"
            value={contactPerson}
            onChange={(e) => setContactPerson(e.target.value)}
            className={validation.contactPerson ? "error" : ""}
          />
        </div>
        <div className="mt-2 flex gap-3">
          <button type="submit" className="btn-green">
            <FaCheck />
            Save
          </button>
          <Link href="/Projects" type="button" className="btn-red">
            <MdCancel />
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
};

export default ProjectForm;
