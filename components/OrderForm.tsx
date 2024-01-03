import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import Select from "react-select";

const OrderForm = () => {
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
    contractNo: 0,
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
      contractNo: 0,
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
    },
  ]);
  const [allPurchaseReqs, setAllPurchaseReqs] = useState([
    {
      _id: "",
      itemList: [
        {
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
  const [purchaseOrderNo, setPurchaseOrderNo] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState({
    address: "",
    POBox: "",
    country: "",
  });

  //useEffects
  useEffect(() => {
    axios.get("/api/entities").then((response) => {
      setAllEntities(response.data);
    });
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
  useEffect(() => {
    const searchProject = project.projectName;
    if (searchProject !== "") {
      axios.get("/api/pr?project=").then((response) => {
        setAllPurchaseReqs(response.data);
      });
    }
  }, [project]);

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
        contractNo: 0,
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
        supplierAddress: {
          address: "",
          POBox: "",
          country: "",
        },
        contactName: "",
        contactNo: "",
        email: "",
        paymentTerm: "",
      });
    }
  }
  function updateDeliveryAddress(projectId: string, value: string | undefined) {
    if (value === "Delivery location to be Declared") {
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
        {supplier._id && project._id && (
          <>
            <div className="mb-4 mt-4">
              <label>Entity Details</label>
              <div className="grid grid-cols-2 w-full">
                <div className="max-w-md flex gap-1">
                  <p className="pt-2">
                    <strong>From: </strong>
                  </p>
                  <div className="bg-white border-2 shadow-sm rounded-lg p-2 flex-grow">
                    <p>{entity.entityName}</p>
                    <p>{entity.entityAddress.address}</p>
                    <p>{entity.entityAddress.country}</p>
                    <p>P.O. Box: {entity.entityAddress.POBox}</p>
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
            {/* <div className="flex text-center items-center justify-center border-b-2 border-black my-4 max-w-md">
            </div> */}
            <div className="mb-4">
              <label>Supplier Details</label>
              <div className="grid grid-cols-3 w-full gap-4">
                <div className="max-w-md flex gap-1">
                  <p className="pt-2">
                    <strong>To: </strong>
                  </p>
                  <div className="bg-white border-2 shadow-sm rounded-lg p-2 flex-grow">
                    <p>{supplier.supplierName}</p>
                    <p>{supplier.supplierAddress.address}</p>
                    <p>{supplier.supplierAddress.country}</p>
                    <p>P.O. Box: {supplier.supplierAddress.POBox}</p>
                  </div>
                </div>
                <div className="flex flex-col items-start justify-center ml-10">
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
                  <div className="max-w-md flex gap-1">
                    <p className="">
                      <strong>Email: </strong>
                    </p>
                    <p>{supplier.email}</p>
                  </div>
                </div>
                <div className="flex flex-col items-start justify-center">
                  <div className="max-w-md flex gap-1">
                    <p className="">
                      <strong>TRN: </strong>
                    </p>
                    <p>{supplier.supplierTRN}</p>
                  </div>
                  <div className="max-w-md flex gap-1">
                    <p className="">
                      <strong>Payment Term: </strong>
                    </p>
                    <p>{supplier.paymentTerm}</p>
                  </div>
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
                <div className=" justify-center w-64">
                  <Select
                    isSearchable
                    value={
                      project && project._id
                        ? project.deliveryAddress.find(
                            (obj) => obj.address === project._id
                          )
                        : null
                    }
                    placeholder="Select Address"
                    onChange={(selectedOption) =>
                      updateDeliveryAddress(
                        project._id,
                        selectedOption?.address
                      )
                    }
                    options={[
                      ...project.deliveryAddress,
                      {
                        address: "Delivery location to be Declared",
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
                {deliveryAddress.address !== "" && (
                  <div>
                    <p className="mb-1">
                      <strong>Delivery Address: </strong>
                      {deliveryAddress.address}
                    </p>
                    <p className="mb-1">
                      <strong>Destination: </strong>
                      {deliveryAddress.country}
                    </p>
                    <p className="">
                      <strong>P.O. Box: </strong>
                      {deliveryAddress.POBox}
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div className="">
              <label>Dates</label>
              <div className="grid grid-cols-2">
                <div>
                  <h3 className=" font-normal">
                    <strong>Order Date: </strong>
                    {new Date().toLocaleDateString("en-GB", {
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
                options={allPurchaseReqs}
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
                        <td>{item.totalQty}</td>
                        <td>{item.description}</td>
                        <td>{item.material}</td>
                        <td>{item.finish}</td>
                        <td>
                          <input
                            type="Number"
                            className="number-input w-16"
                            value={item.unitPrice === 0 ? null : item.unitPrice}
                            onChange={(e) => {
                              const up = e.target.value
                                ? Number(e.target.value)
                                : null;
                              handleUnitPriceChange(index, up);
                            }}
                          />
                        </td>
                        <td>{item.totalCost === 0 ? null : item.totalCost}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </>
        )}
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
