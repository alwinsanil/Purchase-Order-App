import Link from "next/link";
import { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import axios from "axios";
import { useRouter } from "next/navigation";
import { EntityInterface, EntityValidationInterface } from "./Interfaces";

const EntityForm: React.FC<EntityInterface> = ({
  _id,
  entityCode: existingEntityCode,
  entityAbbrev: existingEntityAbbrev,
  entityName: existingEntityName,
  entityTRN: existingEntityTRN,
  entityAddress: existingEntityAddress,
}) => {
  const router = useRouter();
  const [entityCode, setEntityCode] = useState<number | null>(
    existingEntityCode || null
  );
  const [entityAbbrev, setEntityAbbrev] = useState(existingEntityAbbrev || "");
  const [entityName, setEntityName] = useState(existingEntityName || "");
  const [entityTRN, setEntityTRN] = useState<number | null>(
    existingEntityTRN || null
  );
  const [entityAddress, setEntityAddress] = useState(
    existingEntityAddress || {
      address: "",
      POBox: "",
      country: "",
    }
  );
  const [validation, setValidation] = useState<EntityValidationInterface>({
    entityCode: false,
    entityAbbrev: false,
    entityName: false,
    entityAddress: { address: false, POBox: false, country: false },
    entityTRN: false,
  });

  async function saveEntity(e: React.FormEvent) {
    e.preventDefault();

    const newValidation = { ...validation };
    if (!entityCode) newValidation.entityCode = true;
    else newValidation.entityCode = false;
    if (!entityAbbrev) newValidation.entityAbbrev = true;
    else newValidation.entityAbbrev = false;
    if (!entityName) newValidation.entityName = true;
    else newValidation.entityName = false;
    if (!entityTRN) newValidation.entityTRN = true;
    else newValidation.entityTRN = false;
    if (!entityAddress.address) newValidation.entityAddress.address = true;
    else newValidation.entityAddress.address = false;
    if (!entityAddress.POBox) newValidation.entityAddress.POBox = true;
    else newValidation.entityAddress.POBox = false;
    if (!entityAddress.country) newValidation.entityAddress.country = true;
    else newValidation.entityAddress.country = false;

    setValidation(newValidation);

    if (
      Object.keys(newValidation).every((key) => {
        if (
          typeof newValidation[key as keyof EntityValidationInterface] ===
          "object"
        ) {
          return Object.values(
            newValidation[key as keyof EntityValidationInterface]
          ).every((val) => !val);
        } else {
          return !newValidation[key as keyof EntityValidationInterface];
        }
      })
    ) {
    const data = {
      entityCode,
      entityAbbrev,
      entityName,
      entityAddress,
      entityTRN,
    };
    if (_id) {
      await axios.put("/api/entities", { ...data, _id });
    } else {
      await axios.post("/api/entities", data);
    }
    router.push("/Entities");
  } else {
    alert("Enter missing details!");
  }
  }
  return (
    <div>
      <form onSubmit={saveEntity} className="flex flex-col gap-3 mt-3">
        <div className="flex gap-2">
          <div className="projItems">
            <label>Entity Code</label>
            <input
              type="Number"
              className={`number-input ${validation.entityCode ? "error" : ""}`}
              placeholder="Entity Code"
              value={entityCode ?? ""}
              onChange={(e) => setEntityCode(Number(e.target.value))}
            />
          </div>
          <div className="projItems">
            <label>Entity Abbrevation</label>
            <input
              type="text"
              placeholder="Abbrevation"
              value={entityAbbrev}
              onChange={(e) => setEntityAbbrev(e.target.value)}
              className={validation.entityAbbrev ? "error" : ""}
            />
          </div>
          <div className="projItems flex-grow">
            <label>Entity Name</label>
            <input
              type="text"
              placeholder="Entity Name"
              value={entityName}
              onChange={(e) => setEntityName(e.target.value)}
              className={validation.entityName ? "error" : ""}
            />
          </div>
        </div>
        <div className="flex flex-col">
          <label>Entity TRN No.</label>
          <input
            type="Number"
            className={`number-input ${validation.entityTRN ? "error" : ""}`}
            placeholder="Entity TRN Number"
            value={entityTRN ?? ""}
            onChange={(e) => setEntityTRN(Number(e.target.value))}
          />
        </div>
        <div>
          <label>Entity Address</label>
          <div className="flex flex-col gap-2">
            <input
              className={`flex flex-grow ${
                validation.entityAddress.address ? "error" : ""
              }`}
              type="text"
              placeholder="Address"
              value={entityAddress.address}
              onChange={(e) =>
                setEntityAddress({ ...entityAddress, address: e.target.value })
              }
            />
            <div className="flex gap-2">
              <input
                className={`max-w-max ${validation.entityAddress.POBox ? "error" : ""}`}
                type="text"
                placeholder="PO Box"
                value={entityAddress.POBox}
                onChange={(e) =>
                  setEntityAddress({ ...entityAddress, POBox: e.target.value })
                }
              />
              <input
                className={`w-72 ${
                  validation.entityAddress.country ? "error" : ""
                }`}
                type="text"
                placeholder="Emirate/Country"
                value={entityAddress.country}
                onChange={(e) =>
                  setEntityAddress({
                    ...entityAddress,
                    country: e.target.value,
                  })
                }
              />
            </div>
          </div>
        </div>
        <div className="mt-2 flex gap-3">
          <button type="submit" className="btn-green">
            <FaCheck />
            Save
          </button>
          <Link href="/Entities" type="button" className="btn-red">
            <MdCancel />
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
};

export default EntityForm;
