import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { FaCheck } from "react-icons/fa6";
import { MdCancel } from "react-icons/md";

interface ProjectInterface {
  _id: string;
  entity: {
    _id: string;
    entityCode: number;
    entityAbbrev: string;
    entityName: string;
  };
  abbrev: string;
  projectName: string;
  contractNo: string;
  deliveryAddress: {
    address: string;
    POBox: string;
    country: string;
  }[];
  contactPerson: string;
}

const ProjectForm: React.FC<ProjectInterface> = ({
  _id,
  entity: existingEntity,
  abbrev: existingAbbrev,
  projectName: existingProjectName,
  contractNo: existingContractNo,
  deliveryAddress: existingDeliveryAddresses,
  contactPerson: existingContactPerson,
}) => {
  const router = useRouter();
  const [abbrev, setAbbrev] = useState("");
  const [projectName, setProjectName] = useState("");
  const [contractNo, setContractNo] = useState("");
  const [purchaseReqCount, setPurchaseReqCount] = useState(0);
  const [deliveryAddress, setDeliveryAddress] = useState([
    { address: "", POBox: "", country: "" },
  ]);
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
  function entityUpdate(value: string) {
    if (value !== "") {
      const propEntity = allEntities.filter((en) => {
        return en._id === value;
      });
      setEntity(propEntity[0]);
    }
  }
  async function saveEntity(e: React.FormEvent) {
    e.preventDefault();
    if (entity._id === "") {
      alert("Entity Cannot be Empty");
      return;
    }
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
      await axios.post("/api/projects", { ...data, purchaseReqCount });
    }
    router.push("/Projects");
  }

  return (
    <div>
      <form onSubmit={saveEntity} className="flex flex-col gap-3 mt-3">
        <div className="projItems">
          <label>Entity Name</label>
          <select
            value={entity?._id}
            onChange={(e) => entityUpdate(e.target.value)}
          >
            <option value="">Select Entity</option>
            {!!allEntities?.length &&
              allEntities.map((entity) => (
                <option key={entity._id} value={entity._id}>
                  {entity.entityName}
                </option>
              ))}
          </select>
        </div>
        <div className="flex gap-4">
          <div className="projItems">
            <label>Project Abbrevation</label>
            <input
              type="text"
              placeholder="Abbrevation"
              value={abbrev}
              onChange={(e) => setAbbrev(e.target.value)}
            />
          </div>
          <div className="projItems flex-grow">
            <label>Project Name</label>
            <input
              type="text"
              placeholder="Project Name"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
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
          />
        </div>
        <div className="projItems gap-2">
          <label>Delivery Address</label>
          <button type="button" className="btn-1" onClick={() => addAddress()}>
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
