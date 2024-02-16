import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import Select from "react-select";
import GeneratePDF from "./GeneratePDF";
import { FaFilePdf } from "react-icons/fa6";
import {
  EntityInterface,
  ProjectInterface,
  SupplierInterface,
} from "./Interfaces";
import { AiFillPlusSquare } from "react-icons/ai";

interface itemInterface {
  itemIndex: number;
  fCodeAssembly: string;
  totalAssembledQty: string;
  fCodeAssemblyPart: string;
  description: string;
  material: string;
  finish: string;
  remarks: string;
  alloy: string;
  totalQty: number;
  width: number;
  thickness: number;
  length: number;
  volume: number;
  weight: number;
  totalKG: number;
  totalTons: number;
  unitPrice: number;
  totalCost: number;
}

interface OrderInterface {
  _id: string;
  purchaseOrderNo: string;
  entity: EntityInterface;
  project: ProjectInterface;
  supplier: SupplierInterface;
  selectedItems: itemInterface[];
  purchaseReq: {
    _id: string;
    itemList: itemInterface[];
    project: { _id: string; projectName: string; purchaseReqCount: number };
    purchaseReqCode: string;
  };
  deliveryAddress: { address: string; POBox: string; country: string };
  orderDate: Date;
  deliveryDate: Date | undefined;
  notes: string[];
  deliveryTerms: string[];
}

const OrderForm: React.FC<OrderInterface> = ({
  _id,
  purchaseOrderNo: existingPurchaseOrderNo,
  entity: existingEntity,
  project: existingProject,
  supplier: existingSupplier,
  selectedItems: existingSelectedItems,
  purchaseReq: existingPurchaseReq,
  deliveryAddress: existingDeliveryAddress,
  orderDate: existingOrderDate,
  deliveryDate: existingDeliveryDate,
  notes: existingNotes,
  deliveryTerms: existingDeliveryTerms,
}) => {
  const router = useRouter();

  //styling for react-select
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

  //use states
  const [entity, setEntity] = useState({
    _id: "",
    entityCode: 0,
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
      entityCode: 0,
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
    entity: {
      _id: "",
      entityName: "",
      entityCode: 0,
      entityAbbrev: "",
    },
    abbrev: "",
    contactPerson: "",
    contractNo: "",
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
      entity: {
        _id: "",
        entityName: "",
        entityCode: 0,
        entityAbbrev: "",
      },
      abbrev: "",
      contactPerson: "",
      contractNo: "",
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
    supplierAddress: {
      address: "",
      POBox: "",
      country: "",
    },
    contactName: "",
    contactNo: "",
    email: "",
    paymentTerm: "",
    bankDetails: {
      beneficiary: "",
      bank: "",
      swiftCode: "",
      accountNumber: "",
      iban: "",
    },
  });
  const [allSuppliers, setAllSuppliers] = useState([
    {
      _id: "",
      supplierName: "",
      supplierTRN: 0,
      supplierCode: "",
      supplierAddress: {
        address: "",
        POBox: "",
        country: "",
      },
      contactName: "",
      contactNo: "",
      email: "",
      paymentTerm: "",
      bankDetails: {
        beneficiary: "",
        bank: "",
        swiftCode: "",
        accountNumber: "",
        iban: "",
      },
    },
  ]);
  const [allPurchaseReqs, setAllPurchaseReqs] = useState([
    {
      _id: "",
      itemList: [
        {
          itemIndex: 0,
          fCodeAssembly: "",
          totalAssembledQty: "",
          fCodeAssemblyPart: "",
          description: "",
          material: "",
          finish: "",
          remarks: "",
          alloy: "",
          totalQty: 0,
          width: 0,
          thickness: 0,
          length: 0,
          volume: 0,
          weight: 0,
          totalKG: 0,
          totalTons: 0,
          unitPrice: 0,
          totalCost: 0,
        },
      ],
      purchaseReqCode: "",
      project: {
        _id: "",
        projectName: "",
        purchaseReqCount: 0,
      },
    },
  ]);
  const [purchaseReq, setPurchaseReq] = useState({
    _id: "",
    itemList: [
      {
        itemIndex: 0,
        fCodeAssembly: "",
        totalAssembledQty: "",
        fCodeAssemblyPart: "",
        description: "",
        material: "",
        finish: "",
        remarks: "",
        alloy: "",
        totalQty: 0,
        width: 0,
        thickness: 0,
        length: 0,
        volume: 0,
        weight: 0,
        totalKG: 0,
        totalTons: 0,
        unitPrice: 0,
        totalCost: 0,
      },
    ],
    purchaseReqCode: "",
    project: {
      _id: "",
      projectName: "",
      purchaseReqCount: 0,
    },
  });
  const [selectedItems, setSelectedItems] = useState<itemInterface[]>([]);
  const [notes, setNotes] = useState<string[]>([]);
  const [deliveryTerms, setDeliveryTerms] = useState<string[]>([]);
  const [purchaseOrderNo, setPurchaseOrderNo] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState({
    address: "",
    POBox: "",
    country: "",
  });
  const [orderDate, setorderDate] = useState<Date | undefined>(new Date());
  const [deliveryDate, setDeliveryDate] = useState<Date | undefined>(
    new Date()
  );
  //checkboxes
  const [selectAll, setSelectAll] = useState(false);
  const [checkboxes, setCheckboxes] = useState([false, false, false]);

  //useEffects
  useEffect(() => {
    setPurchaseOrderNo(existingPurchaseOrderNo);
    setEntity(existingEntity);
    setProject(existingProject);
    setSupplier(existingSupplier);
    setSelectedItems(existingSelectedItems);
    setPurchaseReq(existingPurchaseReq);
    setDeliveryAddress(existingDeliveryAddress);
    setDeliveryDate(existingDeliveryDate);
    setorderDate(existingOrderDate);
    setNotes(existingNotes);
    setDeliveryTerms(existingDeliveryTerms);
  }, [
    existingDeliveryAddress,
    existingDeliveryDate,
    existingDeliveryTerms,
    existingEntity,
    existingNotes,
    existingOrderDate,
    existingProject,
    existingPurchaseOrderNo,
    existingPurchaseReq,
    existingSelectedItems,
    existingSupplier,
  ]);
  useEffect(() => {
    axios.get("/api/entities").then((response) => {
      setAllEntities(response.data);
    });
    axios.get("/api/suppliers").then((response) => {
      setAllSuppliers(response.data);
    });
  }, []);
  useEffect(() => {
    const searchEntity = entity?.entityName;
    if (searchEntity !== "") {
      axios.get("/api/projects?entity=" + searchEntity).then((response) => {
        setAllProjects(response.data);
      });
    }
  }, [entity]);
  useEffect(() => {
    const searchProject = project?.projectName;
    if (searchProject !== "") {
      axios.get("/api/pr?project=" + searchProject).then((response) => {
        setAllPurchaseReqs(response.data);
      });
    }
  }, [project]);

  //Functions
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
        entityCode: 0,
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
      const tempOrderCount = String(propProject[0].orderCount + 1);
      const pOrderNo =
        entity.entityAbbrev +
        "/" +
        propProject[0].abbrev +
        tempOrderCount.padStart(3, "0") +
        "/" +
        new Date().getFullYear();
      setPurchaseOrderNo(pOrderNo);
      updateDeliveryAddress(undefined, undefined);
    } else {
      setProject({
        _id: "",
        projectName: "",
        entity: {
          _id: "",
          entityName: "",
          entityCode: 0,
          entityAbbrev: "",
        },
        abbrev: "",
        contactPerson: "",
        contractNo: "",
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
    updateDeliveryAddress(undefined, undefined);
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
        supplierAddress: {
          address: "",
          POBox: "",
          country: "",
        },
        contactName: "",
        contactNo: "",
        email: "",
        paymentTerm: "",
        bankDetails: {
          beneficiary: "",
          bank: "",
          swiftCode: "",
          accountNumber: "",
          iban: "",
        },
      });
    }
  }
  function updateDeliveryAddress(
    projectId: string | undefined,
    value: string | undefined
  ) {
    if (value === "Delivery location to be declared") {
      setDeliveryAddress({ address: value, POBox: "", country: "" });
    } else if (value !== undefined) {
      const selProject = allProjects.find((e) => e._id === projectId);
      const propAddress = selProject?.deliveryAddress.find(
        (en) => en.address === value
      );
      if (propAddress) setDeliveryAddress(propAddress);
    } else {
      setDeliveryAddress({
        address: "",
        POBox: "",
        country: "",
      });
    }
  }
  function updatePurchaseReq(value: string | undefined) {
    if (value !== undefined) {
      const propPR = allPurchaseReqs.find((en) => en._id === value);
      if (propPR) setPurchaseReq(propPR);
    } else {
      setPurchaseReq({
        _id: "",
        itemList: [
          {
            itemIndex: 0,
            fCodeAssembly: "",
            totalAssembledQty: "",
            fCodeAssemblyPart: "",
            description: "",
            material: "",
            finish: "",
            remarks: "",
            alloy: "",
            totalQty: 0,
            width: 0,
            thickness: 0,
            length: 0,
            volume: 0,
            weight: 0,
            totalKG: 0,
            totalTons: 0,
            unitPrice: 0,
            totalCost: 0,
          },
        ],
        purchaseReqCode: "",
        project: {
          _id: "",
          projectName: "",
          purchaseReqCount: 0,
        },
      });
    }
  }
  function handleUnitPriceChange(index: number, up: number | null) {
    const updatedPurchaseReq = { ...purchaseReq };
    if (up !== null) {
      updatedPurchaseReq.itemList[index].unitPrice = up;
      updatedPurchaseReq.itemList[index].totalCost =
        up * updatedPurchaseReq.itemList[index].totalQty;
    } else {
      updatedPurchaseReq.itemList[index].unitPrice = 0;
      updatedPurchaseReq.itemList[index].totalCost = 0;
    }
    setPurchaseReq(updatedPurchaseReq);
  }
  function handleSelectAll() {
    setSelectAll(!selectAll);
    setCheckboxes(checkboxes.map(() => !selectAll));
    if (!selectAll) {
      setSelectedItems([...purchaseReq.itemList]);
    } else {
      setSelectedItems([]);
    }
  }
  function handleSingleCheck(index: number) {
    const item = purchaseReq.itemList[index];
    const isSelected = selectedItems.some(
      (selectedItem) => selectedItem.itemIndex === item.itemIndex
    );

    if (!isSelected) {
      setSelectedItems([...selectedItems, item]);
    } else {
      setSelectedItems(
        selectedItems.filter(
          (selectedItem) => selectedItem.itemIndex !== item.itemIndex
        )
      );
    }
  }
  function addNotes() {
    setNotes((prev) => {
      return [...prev, ""];
    });
  }
  function removeNotes(indexToRemove: number) {
    setNotes((prev) => {
      return [...prev].filter((_, index) => {
        return index !== indexToRemove;
      });
    });
  }
  function handleNotesChange(index: number, newNote: string) {
    const newNotes = [...notes];
    newNotes[index] = newNote;
    setNotes(newNotes);
  }
  function addDeliveryTerms() {
    setDeliveryTerms((prev) => {
      return [...prev, ""];
    });
  }
  function removeDeliveryTerms(indexToRemove: number) {
    setDeliveryTerms((prev) => {
      return [...prev].filter((_, index) => {
        return index !== indexToRemove;
      });
    });
  }
  function handleDeliveryTermsChange(index: number, newDeliveryTerm: string) {
    const newDeliveryTerms = [...deliveryTerms];
    newDeliveryTerms[index] = newDeliveryTerm;
    setDeliveryTerms(newDeliveryTerms);
  }

  async function saveOrder(e: React.FormEvent) {
    e.preventDefault();
    if (project._id === "") {
      alert("Project Cannot be Empty");
      return;
    }
    const data = {
      purchaseOrderNo,
      entity,
      project,
      supplier,
      selectedItems,
      purchaseReq,
      deliveryAddress,
      orderDate,
      deliveryDate,
      notes,
      deliveryTerms,
    };

    const count = Number(project.orderCount) + 1;

    if (_id) {
      await axios.put("/api/orders", { ...data, _id });
    } else {
      await axios.post("/api/orders", data);
      await axios.put("/api/projects", {
        orderCount: count,
        _id: project._id,
      });
    }
    router.push("/Orders");
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
        {project?._id && (
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
        <div className="projItems">
          <label>Delivery Address</label>
          <Select
            key={project?._id}
            isSearchable
            value={
              deliveryAddress?.address !== ""
                ? deliveryAddress
                : project && project._id
                ? project.deliveryAddress.find(
                    (obj) => obj.address === project._id
                  )
                : null
            }
            placeholder="Select Address"
            onChange={(selectedOption) =>
              updateDeliveryAddress(project._id, selectedOption?.address)
            }
            options={[
              ...(Array.isArray(project?.deliveryAddress)
                ? project.deliveryAddress
                : []),
              {
                address: "Delivery location to be declared",
                POBox: "",
                country: "",
              },
            ]}
            getOptionLabel={(option) => option.address}
            getOptionValue={(option) => option.address}
            styles={customStyles}
            required
          />
        </div>
        {supplier?._id && project._id && (
          <>
            <div className="mb-4 mt-4">
              <label>Entity Details</label>
              <div className="flex flex-col w-full">
                <div className="max-w-md flex gap-1">
                  <p className="pt-2">
                    <strong>From: </strong>
                  </p>
                  <div className="p-2">
                    <p>
                      {entity.entityName}, {entity.entityAddress.address},{" "}
                      {entity.entityAddress.country}, P.O. Box:{" "}
                      {entity.entityAddress.POBox}
                    </p>
                  </div>
                </div>
                <div className="max-w-md flex gap-1">
                  <p className="py-2">
                    <strong>Entity TRN: </strong>
                  </p>
                  <div className="py-2">
                    <p>{entity.entityTRN}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-4">
              <label>Supplier Details</label>
              <div className="flex flex-col w-full">
                <div className="max-w-md flex gap-1">
                  <p className="pt-2">
                    <strong>To: </strong>
                  </p>
                  <div className="p-2">
                    <p>
                      {supplier.supplierName},{" "}
                      {supplier.supplierAddress.address},{" "}
                      {supplier.supplierAddress.country}, P.O. Box:{" "}
                      {supplier.supplierAddress.POBox}
                    </p>
                  </div>
                </div>

                <div className="max-w-md flex gap-1 mb-1">
                  <p className="">
                    <strong>Contact: </strong>
                  </p>
                  <p>{supplier.contactName}</p>
                </div>
                <div className="max-w-md flex gap-1 mb-1">
                  <p className="">
                    <strong>Number: </strong>
                  </p>
                  <p>{supplier.contactNo}</p>
                </div>
                <div className="max-w-md flex gap-1 mb-1">
                  <p className="">
                    <strong>Email: </strong>
                  </p>
                  <p>{supplier.email}</p>
                </div>
                <div className="max-w-md flex gap-1 mb-1">
                  <p className="">
                    <strong>TRN: </strong>
                  </p>
                  <p>{supplier.supplierTRN}</p>
                </div>
                <div className="max-w-md flex gap-1 mb-1">
                  <p className="">
                    <strong>Payment Term: </strong>
                  </p>
                  <p>{supplier.paymentTerm}</p>
                </div>
              </div>
            </div>
            <div className="mb-4">
              <label>Project Details</label>
              <div className="flex gap-10">
                <div className="mt-2">
                  <p className="mb-1">
                    <strong>Project Name: </strong>
                    {project.projectName}
                  </p>
                  <p className="mb-1">
                    <strong>Contract No.: </strong>
                    {project.contractNo}
                  </p>
                  <p>
                    <strong>Contact Person: </strong>
                    {project.contactPerson}
                  </p>
                </div>
                {deliveryAddress.address !== "" && (
                  <div className="mt-2">
                    <p className="mb-1">
                      <strong>Delivery Address: </strong>
                      {deliveryAddress.address}
                    </p>
                    {deliveryAddress.address !==
                      "Delivery location to be declared" && (
                      <>
                        <p className="mb-1">
                          <strong>Destination: </strong>
                          {deliveryAddress.country}
                        </p>
                        <p className="">
                          <strong>P.O. Box: </strong>
                          {deliveryAddress.POBox}
                        </p>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
            <div>
              <label>Dates</label>
              <div className="grid grid-cols-2">
                <div>
                  <h3 className=" font-normal">
                    <strong>Order Date: </strong>
                    {orderDate &&
                      new Date(orderDate).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                  </h3>
                </div>
                <div>
                  <h3 className="font-normal">
                    <strong>Delivery Date: </strong>
                    <input
                      type="date"
                      min={new Date().toISOString().split("T")[0]}
                      className=""
                      value={
                        deliveryDate
                          ? new Date(deliveryDate).toISOString().split("T")[0]
                          : undefined
                      }
                      onChange={(e) =>
                        setDeliveryDate(new Date(e.target.value))
                      }
                      required
                    />
                  </h3>
                </div>
              </div>
            </div>
            <div>
              <label>Purchase Request</label>
              <Select
                isSearchable
                menuPlacement="top"
                value={
                  purchaseReq && purchaseReq._id
                    ? allPurchaseReqs.find((obj) => obj._id === purchaseReq._id)
                    : null
                }
                placeholder="Select Purchase Request"
                onChange={(selectedOption) =>
                  updatePurchaseReq(selectedOption?._id)
                }
                options={allPurchaseReqs.filter((en) => {
                  return en.project._id === project._id;
                })}
                getOptionLabel={(option) => option.purchaseReqCode}
                getOptionValue={(option) => option._id}
                styles={customStyles}
                required
              />
            </div>
            <div>
              <table className="primary mt-3">
                <thead>
                  <tr>
                    <th>
                      <input
                        type="checkbox"
                        checked={selectAll}
                        onChange={handleSelectAll}
                      />
                    </th>
                    <th>Quantity</th>
                    <th>Description</th>
                    <th>Material</th>
                    <th>Finish</th>
                    <th>Unit Price</th>
                    <th>Total Cost</th>
                  </tr>
                </thead>
                <tbody>
                  {purchaseReq._id != "" &&
                    purchaseReq.itemList.map((item: any, index: number) => (
                      <tr key={index}>
                        <td>
                          <input
                            type="checkbox"
                            checked={selectedItems.some(
                              (item) =>
                                item.itemIndex ===
                                purchaseReq.itemList[index].itemIndex
                            )}
                            onChange={() => handleSingleCheck(index)}
                          />
                        </td>
                        <td>{item.totalQty}</td>
                        <td>{item.description}</td>
                        <td>{item.material}</td>
                        <td>{item.finish}</td>
                        <td>
                          <input
                            type="Number"
                            className="number-input w-16 border-2"
                            value={item.unitPrice === 0 ? null : item.unitPrice}
                            onChange={(e) => {
                              const up = e.target.value
                                ? Number(e.target.value)
                                : null;
                              handleUnitPriceChange(index, up);
                            }}
                          />
                        </td>
                        <td>
                          {item.totalCost
                            ? item.totalCost === 0
                              ? null
                              : item.totalCost?.toFixed(2) + " AED"
                            : null}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <div className="flex flex-col gap-1 mt-2">
              <div className="flex gap-2 mb-2">
                <label>Notes</label>
                <button
                  type="button"
                  className="btn-sm"
                  onClick={() => addNotes()}
                >
                  <AiFillPlusSquare className="plusIcon-sm" />
                  Add New Note
                </button>
              </div>
              {!!notes?.length &&
                notes.map((note, index) => (
                  <div className="flex gap-2" key={index}>
                    <input
                      className="flex-grow"
                      type="text"
                      placeholder="Note"
                      value={note}
                      onChange={(e) => handleNotesChange(index, e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => removeNotes(index)}
                      className="bg-red-800 py-1 px-2 rounded-lg"
                    >
                      Delete
                    </button>
                  </div>
                ))}
            </div>
            <div className="flex flex-col gap-1 mt-2">
              <div className="flex gap-2 mb-2">
                <label>Delivery Terms</label>
                <button
                  type="button"
                  className="btn-sm"
                  onClick={() => addDeliveryTerms()}
                >
                  <AiFillPlusSquare className="plusIcon-sm" />
                  Add New Delivery Term
                </button>
              </div>
              {!!deliveryTerms?.length &&
                deliveryTerms.map((dt, index) => (
                  <div className="flex gap-2" key={index}>
                    <input
                      className="flex-grow"
                      type="text"
                      placeholder="Delivery Term"
                      value={dt}
                      onChange={(e) =>
                        handleDeliveryTermsChange(index, e.target.value)
                      }
                    />
                    <button
                      type="button"
                      onClick={() => removeDeliveryTerms(index)}
                      className="bg-red-800 py-1 px-2 rounded-lg"
                    >
                      Delete
                    </button>
                  </div>
                ))}
            </div>
          </>
        )}
        <div className="flex gap-2"></div>
        <div className="mt-2 flex gap-3">
          <button type="submit" className="btn-green">
            <FaCheck />
            Save
          </button>
          <button
            type="button"
            onClick={() => {
              console.log(supplier.bankDetails);
              GeneratePDF(
                purchaseOrderNo,
                entity,
                project,
                supplier,
                selectedItems,
                deliveryAddress,
                orderDate,
                deliveryDate,
                notes,
                deliveryTerms
              );
            }}
            className="btn-yellow"
          >
            <FaFilePdf />
            Save & Generate PDF
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
