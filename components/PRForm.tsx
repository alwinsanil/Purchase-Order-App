import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import axios from "axios";
import { useRouter } from "next/navigation";
import Select from "react-select";
import { PRInterface, itemInterface } from "./Interfaces";
import { AiFillPlusSquare } from "react-icons/ai";
import { BiImport } from "react-icons/bi";
import { read, utils } from "xlsx";

const PRForm: React.FC<PRInterface> = ({
  _id,
  itemList: existingItemList,
  project: existingProject,
  purchaseReqCode: existingPrchaseReqCode,
}) => {
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
  const router = useRouter();
  const [itemList, setItemList] = useState<itemInterface[]>([]);
  const [purchaseReqCode, setPurchaseReqCode] = useState("");
  const [editMode, setEditMode] = useState(false);
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
  const [itemIndex, setItemIndex] = useState(0);
  const [fileContents, setFileContents] = useState<itemInterface[]>([]);
  const fileInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!!existingItemList) {
      setItemList(existingItemList);
      setProject(existingProject);
      setPurchaseReqCode(existingPrchaseReqCode);
      if (existingPrchaseReqCode !== "") {
        setEditMode(true);
      }
    }
  }, [existingItemList, existingProject, existingPrchaseReqCode]);
  useEffect(() => {
    axios
      .get("/api/projects")
      .then((response) => setAllProjects(response.data));
  }, []);
  useEffect(() => {
    for (const item of fileContents) {
      if (item.length && item.thickness && item.width && item.totalQty) {
        item.volume = item.length * item.thickness * item.width / Math.pow(1000, 3);
        item.weight = item.volume * 2710;
        item.totalKG = item.weight * item.totalQty;
        item.totalTons = item.totalKG / 1000;
        item.totalCost =  0;
        item.unitPrice = 0;
      }
       else {
        alert("he file has some missing data values. Kindly check if all mandatory data is entered.")
        break;
       }
    }
    setItemList(fileContents);
  }, [fileContents]);

  function handleFCodeAssemblyChange(index: number, newFCodeAssembly: string) {
    const newItem = [...itemList];
    newItem[index].fCodeAssembly = newFCodeAssembly;
    setItemList(newItem);
  }
  function handleTotalAssembledQty(
    index: number,
    newTotalAssembledQty: string
  ) {
    const newItem = [...itemList];
    newItem[index].totalAssembledQty = newTotalAssembledQty;
    setItemList(newItem);
  }
  function handleFCodeAssemblyPartChange(
    index: number,
    newFCodeAssemblyPart: string
  ) {
    const newItem = [...itemList];
    newItem[index].fCodeAssemblyPart = newFCodeAssemblyPart;
    setItemList(newItem);
  }
  function handleDescriptionChange(index: number, newDescription: string) {
    const newItem = [...itemList];
    newItem[index].description = newDescription;
    setItemList(newItem);
  }
  function handleMaterialChange(index: number, newMaterial: string) {
    const newItem = [...itemList];
    newItem[index].material = newMaterial;
    setItemList(newItem);
  }
  function handleFinishChange(index: number, newFinish: string) {
    const newItem = [...itemList];
    newItem[index].finish = newFinish;
    setItemList(newItem);
  }
  function handleAlloyChange(index: number, newAlloy: string) {
    const newItem = [...itemList];
    newItem[index].alloy = newAlloy;
    setItemList(newItem);
  }
  function handleRemarksChange(index: number, newRemarks: string) {
    const newItem = [...itemList];
    newItem[index].remarks = newRemarks;
    setItemList(newItem);
  }
  function handleTotalQtyChange(index: number, newTotalQty: number | null) {
    const newItem = [...itemList];
    newItem[index].totalQty = newTotalQty;
    setItemList(newItem);
  }
  function handleWidthChange(index: number, newWidth: number | null) {
    const newItem = [...itemList];
    newItem[index].width = newWidth;
    setItemList(newItem);
  }
  function handleThicknessChange(index: number, newThickness: number | null) {
    const newItem = [...itemList];
    newItem[index].thickness = newThickness;
    setItemList(newItem);
  }
  function handleLengthChange(index: number, newLength: number | null) {
    const newItem = [...itemList];
    newItem[index].length = newLength;
    setItemList(newItem);
  }
  function handleVolumeChange(index: number, newVolume: number | null) {
    const newItem = [...itemList];
    newItem[index].volume = newVolume;
    setItemList(newItem);
  }
  function handleWeightChange(index: number, newWeight: number | null) {
    const newItem = [...itemList];
    newItem[index].weight = newWeight;
    setItemList(newItem);
  }
  function handleTotalKGChange(index: number, newTotalKG: number | null) {
    const newItem = [...itemList];
    newItem[index].totalKG = newTotalKG;
    setItemList(newItem);
  }
  function handleTotalTonsChange(index: number, newTotalTons: number | null) {
    const newItem = [...itemList];
    newItem[index].totalTons = newTotalTons;
    setItemList(newItem);
  }
  function addItem() {
    setItemIndex((prevIndex) => prevIndex + 1);
    setItemList((prev) => [
      ...prev,
      {
        itemIndex: itemIndex,
        fCodeAssembly: "",
        totalAssembledQty: "",
        fCodeAssemblyPart: "",
        description: "",
        material: "",
        finish: "",
        remarks: "",
        alloy: "",
        totalQty: null,
        width: null,
        thickness: null,
        length: null,
        volume: null,
        weight: null,
        totalKG: null,
        totalTons: null,
        unitPrice: 0,
        totalCost: 0,
      },
    ]);
  }

  function removeItem(indexToRemove: number) {
    setItemList((prev) =>
      prev.filter((item) => item.itemIndex !== indexToRemove)
    );
  }
  function updatePR(value: string | undefined) {
    if (value !== "") {
      const propProject = allProjects.filter((en) => {
        return en._id === value;
      });
      setProject(propProject[0]);
      let tempCount = propProject[0]?.purchaseReqCount + 1;
      let tempCode = "T" + String(tempCount).padStart(3, "0");
      setPurchaseReqCode(tempCode);
    } else {
      setProject({ _id: "", projectName: "", purchaseReqCount: 0 });
      setPurchaseReqCode("");
    }
  }

  function handleImportClick() {
    if (fileInput.current) {
      fileInput.current.click();
    }
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files) {
      const file = event.target.files[0];
      importFile(file);
    }
  }
  async function importFile(file: File) {
    const arrayFile = await file.arrayBuffer();
    const parsedFile = read(arrayFile);
    const ws = parsedFile.Sheets[parsedFile.SheetNames[0]];
    const data: itemInterface[] = utils.sheet_to_json<itemInterface>(ws);
    setFileContents(data);
  }

  async function savePR(e: React.FormEvent) {
    e.preventDefault();
    if (project._id === "") {
      alert("Project Cannot be Empty");
      return;
    }
    const data = {
      itemList,
      project,
      purchaseReqCode,
    };
    let count = purchaseReqCode.slice(-3);
    const PRCount = Number(count);

    if (_id) {
      await axios.put("/api/pr", { ...data, _id });
    } else {
      await axios.post("/api/pr", data);
      await axios.put("/api/projects", {
        purchaseReqCount: PRCount,
        _id: project._id,
      });
    }
    setEditMode(false);
    router.push("/PurchaseReq");
  }
  return (
    <div>
      <form onSubmit={savePR} className="flex flex-col gap-3 mt-3">
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
            onChange={(selectedOption) => updatePR(selectedOption?._id)}
            options={allProjects}
            getOptionLabel={(option) => option.projectName}
            getOptionValue={(option) => option._id}
            styles={customStyles}
          />
        </div>
        <div className="projItems">
          <h2>{project ? `PR Code: ${purchaseReqCode}` : ""}</h2>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex gap-3">
            <button type="button" className="btn-1" onClick={() => addItem()}>
              <AiFillPlusSquare className="plusIcon" />
              Add New Item
            </button>
            <input
              type="file"
              style={{ display: "none" }}
              ref={fileInput}
              onChange={handleFileChange}
            />
            <button type="button" className="btn-1" onClick={handleImportClick}>
              <BiImport className="plusIcon" />
              Import from file
            </button>
          </div>
          {!!itemList?.length &&
            itemList.map((item, index) => (
              <div className="flex gap-3" key={index}>
                <div className="projItems min-w-max">
                  <label>Fabrication Code Assembly</label>
                  <input
                    className=""
                    type="text"
                    placeholder="Fabrication Code Assembly"
                    value={item.fCodeAssembly}
                    onChange={(e) =>
                      handleFCodeAssemblyChange(index, e.target.value)
                    }
                  />
                </div>
                <div className="projItems min-w-max">
                  <label>Total Assembly Quantity</label>
                  <input
                    className=""
                    type="text"
                    placeholder="Total Assembled Qty"
                    value={item.totalAssembledQty}
                    onChange={(e) =>
                      handleTotalAssembledQty(index, e.target.value)
                    }
                  />
                </div>
                <div className="projItems min-w-max">
                  <label>Fabrication Code Assembly Part</label>
                  <input
                    className=""
                    type="text"
                    placeholder="Fabrication Code Assembly Part"
                    value={item.fCodeAssemblyPart}
                    onChange={(e) =>
                      handleFCodeAssemblyPartChange(index, e.target.value)
                    }
                  />
                </div>
                <div className="projItems flex-none w-96">
                  <label>Descripton</label>
                  <input
                    className=""
                    type="text"
                    placeholder="Descripton"
                    value={item.description}
                    onChange={(e) =>
                      handleDescriptionChange(index, e.target.value)
                    }
                  />
                </div>
                <div className="projItems">
                  <label>Material</label>
                  <input
                    className=""
                    type="text"
                    placeholder="Material"
                    value={item.material}
                    onChange={(e) =>
                      handleMaterialChange(index, e.target.value)
                    }
                  />
                </div>
                <div className="projItems flex-none w-72">
                  <label>Finish</label>
                  <input
                    className=""
                    type="text"
                    placeholder="Finish"
                    value={item.finish}
                    onChange={(e) => handleFinishChange(index, e.target.value)}
                  />
                </div>
                <div className="projItems w-32">
                  <label>Alloy</label>
                  <input
                    className=""
                    type="text"
                    placeholder="Alloy"
                    value={item.alloy}
                    onChange={(e) => handleAlloyChange(index, e.target.value)}
                  />
                </div>
                <div className="projItems flex-none w-72">
                  <label>Remarks</label>
                  <input
                    className=""
                    type="text"
                    placeholder="Remarks"
                    value={item.remarks}
                    onChange={(e) => handleRemarksChange(index, e.target.value)}
                  />
                </div>
                <div className="projItems w-32">
                  <label>Total Quantity</label>
                  <input
                    className="number-input"
                    type="number"
                    placeholder="Total Quantity"
                    value={item.totalQty ?? ""}
                    onChange={(e) => {
                      const totalQty = e.target.value
                        ? Number(e.target.value)
                        : null;
                      handleTotalQtyChange(index, totalQty);
                      if (item.width && item.thickness && item.length) {
                        handleVolumeChange(
                          index,
                          (item.width * item.thickness * item.length) /
                            Math.pow(1000, 2)
                        );
                        if (item.volume) {
                          handleWeightChange(index, item.volume * 2710);
                        }
                        if (item.weight && totalQty) {
                          handleTotalKGChange(index, item.weight * totalQty);
                        } else {
                          handleTotalKGChange(index, null);
                        }
                        if (item.totalKG) {
                          handleTotalTonsChange(index, item.totalKG / 1000);
                        } else {
                          handleTotalTonsChange(index, null);
                        }
                      } else {
                        handleVolumeChange(index, null);
                        handleWeightChange(index, null);
                        handleTotalKGChange(index, null);
                        handleTotalTonsChange(index, null);
                      }
                    }}
                  />
                </div>
                <div className="projItems w-28">
                  <label>Width (mm)</label>
                  <input
                    className="number-input"
                    type="number"
                    placeholder="Width (mm)"
                    value={item.width ?? ""}
                    onChange={(e) => {
                      const width = e.target.value
                        ? Number(e.target.value)
                        : null;
                      handleWidthChange(index, width);
                      if (width && item.thickness && item.length) {
                        handleVolumeChange(
                          index,
                          (width * item.thickness * item.length) /
                            Math.pow(1000, 3)
                        );
                        if (item.volume) {
                          handleWeightChange(index, item.volume * 2710);
                        }
                        if (item.weight && item.totalQty) {
                          handleTotalKGChange(
                            index,
                            item.weight * item.totalQty
                          );
                        } else {
                          handleTotalKGChange(index, null);
                        }
                        if (item.totalKG) {
                          handleTotalTonsChange(index, item.totalKG / 1000);
                        } else {
                          handleTotalTonsChange(index, null);
                        }
                      } else {
                        handleVolumeChange(index, null);
                        handleWeightChange(index, null);
                        handleTotalKGChange(index, null);
                        handleTotalTonsChange(index, null);
                      }
                    }}
                  />
                </div>
                <div className="projItems w-36">
                  <label>Thickness (mm)</label>
                  <input
                    className="number-input"
                    type="number"
                    placeholder="Thickness (mm)"
                    value={item.thickness ?? ""}
                    onChange={(e) => {
                      const thickness = e.target.value
                        ? Number(e.target.value)
                        : null;
                      handleThicknessChange(index, thickness);
                      if (thickness && item.width && item.length) {
                        handleVolumeChange(
                          index,
                          (thickness * item.width * item.length) /
                            Math.pow(1000, 3)
                        );
                        if (item.volume) {
                          handleWeightChange(index, item.volume * 2710);
                        }
                        if (item.weight && item.totalQty) {
                          handleTotalKGChange(
                            index,
                            item.weight * item.totalQty
                          );
                        } else {
                          handleTotalKGChange(index, null);
                        }
                        if (item.totalKG) {
                          handleTotalTonsChange(index, item.totalKG / 1000);
                        } else {
                          handleTotalTonsChange(index, null);
                        }
                      } else {
                        handleVolumeChange(index, null);
                        handleWeightChange(index, null);
                        handleTotalKGChange(index, null);
                        handleTotalTonsChange(index, null);
                      }
                    }}
                  />
                </div>
                <div className="projItems w-28">
                  <label>Length (m)</label>
                  <input
                    className="number-input"
                    type="number"
                    placeholder="Length (m)"
                    value={item.length ?? ""}
                    onChange={(e) => {
                      const length = e.target.value
                        ? Number(e.target.value)
                        : null;
                      handleLengthChange(index, length);
                      if (length && item.thickness && item.width) {
                        handleVolumeChange(
                          index,
                          (length * item.thickness * item.width) /
                            Math.pow(1000, 3)
                        );
                        if (item.volume) {
                          handleWeightChange(index, item.volume * 2710);
                        }
                        if (item.weight && item.totalQty) {
                          handleTotalKGChange(
                            index,
                            item.weight * item.totalQty
                          );
                        } else {
                          handleTotalKGChange(index, null);
                        }
                        if (item.totalKG) {
                          handleTotalTonsChange(index, item.totalKG / 1000);
                        } else {
                          handleTotalTonsChange(index, null);
                        }
                      } else {
                        handleVolumeChange(index, null);
                        handleWeightChange(index, null);
                        handleTotalKGChange(index, null);
                        handleTotalTonsChange(index, null);
                      }
                    }}
                  />
                </div>
                <div className="projItems w-36">
                  <label>
                    Volume (mm<sup>3</sup>)
                  </label>
                  <input
                    className="number-input"
                    type="number"
                    readOnly
                    placeholder="Volume"
                    value={item.volume?.toFixed(2) ?? ""}
                  />
                </div>
                <div className="projItems w-28">
                  <label>Weight (Kg)</label>
                  <input
                    className="number-input"
                    type="number"
                    readOnly
                    placeholder="Weight (Kg)"
                    value={item.weight?.toFixed(2) ?? ""}
                  />
                </div>
                <div className="projItems w-40">
                  <label>Total Weight (Kg)</label>
                  <input
                    className="number-input"
                    type="number"
                    readOnly
                    placeholder="Total Weight (Kg)"
                    value={item.totalKG?.toFixed(2) ?? ""}
                  />
                </div>
                <div className="projItems w-44">
                  <label>Total Weight (Tons)</label>
                  <input
                    className="number-input"
                    type="number"
                    readOnly
                    placeholder="Total Weight (Tons)"
                    value={item.totalTons?.toFixed(2) ?? ""}
                  />
                </div>
                <div className="flex pr-2">
                  <button
                    type="button"
                    onClick={() => removeItem(index)}
                    className="btn-red-small h-8 self-end"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
        </div>
        <div className="mt-2 flex gap-3">
          <button type="submit" className="btn-green">
            <FaCheck />
            Save
          </button>
          <Link href="/PurchaseReq" type="button" className="btn-red">
            <MdCancel />
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
};

export default PRForm;
