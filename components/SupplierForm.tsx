import Link from "next/link";
import { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import axios from "axios";
import { useRouter } from "next/navigation";
import { SupplierInterface, SupplierValidationInterface } from "./Interfaces";

const SupplierForm: React.FC<SupplierInterface> = ({
  _id,
  supplierCode: existingSupplierCode,
  supplierName: existingSupplierName,
  supplierTRN: existingSupplierTRN,
  oxaion: existingOxaion,
  supplierAddress: existingSupplierAddress,
  contactName: existingContactName,
  contactNo: existingContactNo,
  email: existingEmail,
  paymentTerm: existingPaymentTerm,
  bankDetails: existingBankDetails,
}) => {
  const router = useRouter();
  const [supplierCode, setSupplierCode] = useState(existingSupplierCode || "");
  const [supplierName, setSupplierName] = useState(existingSupplierName || "");
  const [supplierTRN, setSupplierTRN] = useState<number | null>(
    existingSupplierTRN || null
  );
  const [oxaion, setOxaion] = useState<number | null>(
    existingOxaion || null
  );
  const [supplierAddress, setSupplierAddress] = useState(
    existingSupplierAddress || {
      address: "",
      POBox: "",
      country: "",
    }
  );
  const [contactName, setContactName] = useState(existingContactName || "");
  const [contactNo, setContactNo] = useState(existingContactNo || "");
  const [email, setEmail] = useState(existingEmail || "");
  const [paymentTerm, setPaymentTerm] = useState(existingPaymentTerm || "");
  const [bankDetails, setBankDetails] = useState(
    existingBankDetails || {
      beneficiary: "",
      bank: "",
      swiftCode: "",
      accountNumber: "",
      iban: "",
    }
  );
  const [validation, setValidation] = useState<SupplierValidationInterface>({
    supplierCode: false,
    supplierName: false,
    supplierTRN: false,
    oxaion: false,
    supplierAddress: {
      address: false,
      POBox: false,
      country: false,
    },
    contactName: false,
    contactNo: false,
    email: false,
    paymentTerm: false,
    bankDetails: {
      beneficiary: false,
      bank: false,
      swiftCode: false,
      accountNumber: false,
      iban: false,
    },
  });

  async function saveSupplier(e: React.FormEvent) {
    e.preventDefault();
    const newValidation = { ...validation };
    if (!supplierCode) newValidation.supplierCode = true;
    else newValidation.supplierCode = false;
    if (!supplierName) newValidation.supplierName = true;
    else newValidation.supplierName = false;
    if (!supplierTRN) newValidation.supplierTRN = true;
    else newValidation.supplierTRN = false;
    if (!oxaion) newValidation.oxaion = true;
    else newValidation.oxaion = false;
    if (!supplierAddress.address) newValidation.supplierAddress.address = true;
    else newValidation.supplierAddress.address = false;
    if (!supplierAddress.POBox) newValidation.supplierAddress.POBox = true;
    else newValidation.supplierAddress.POBox = false;
    if (!supplierAddress.country) newValidation.supplierAddress.country = true;
    else newValidation.supplierAddress.country = false;
    if (!contactName) newValidation.contactName = true;
    else newValidation.contactName = false;
    if (!contactNo) newValidation.contactNo = true;
    else newValidation.contactNo = false;
    if (!email) newValidation.email = true;
    else newValidation.email = false;
    if (!paymentTerm) newValidation.paymentTerm = true;
    else newValidation.paymentTerm = false;
    if (!bankDetails.beneficiary) newValidation.bankDetails.beneficiary = true;
    else newValidation.bankDetails.beneficiary = false;
    if (!bankDetails.bank) newValidation.bankDetails.bank = true;
    else newValidation.bankDetails.bank = false;
    if (!bankDetails.swiftCode) newValidation.bankDetails.swiftCode = true;
    else newValidation.bankDetails.swiftCode = false;
    if (!bankDetails.accountNumber)
      newValidation.bankDetails.accountNumber = true;
    else newValidation.bankDetails.accountNumber = false;
    if (!bankDetails.iban) newValidation.bankDetails.iban = true;
    else validation.bankDetails.iban = false;

    setValidation(newValidation);

    if (
      Object.keys(newValidation).every(
        (key) => !newValidation[key as keyof SupplierValidationInterface]
      )
    ) {
      const data = {
        supplierCode,
        supplierName,
        supplierAddress,
        supplierTRN,
        oxaion,
        contactName,
        contactNo,
        email,
        paymentTerm,
        bankDetails,
      };
      if (_id) {
        await axios.put("/api/suppliers", { ...data, _id });
      } else {
        await axios.post("/api/suppliers", data);
      }
      router.push("/Suppliers");
    } else {
      alert("Enter missing details!");
    }
  }
  return (
    <div>
      <form onSubmit={saveSupplier} className="flex flex-col gap-3 mt-3">
        <div className="flex gap-2">
          <div className="projItems">
            <label>Supplier Code</label>
            <input
              type="text"
              placeholder="Supplier Code"
              value={supplierCode}
              onChange={(e) => setSupplierCode(e.target.value)}
              className={validation.supplierCode ? "error" : ""}
            />
          </div>
          <div className="projItems flex-grow">
            <label>Supplier Name</label>
            <input
              type="text"
              placeholder="Supplier Name"
              value={supplierName}
              onChange={(e) => setSupplierName(e.target.value)}
              className={validation.supplierName ? "error" : ""}
            />
          </div>
        </div>
        <div className="flex gap-2">
          <div className="flex flex-col">
            <label>Supplier TRN No.</label>
            <input
              type="Number"
              className={`number-input ${
                validation.supplierTRN ? "error" : ""
              }`}
              placeholder="Supplier TRN Number"
              value={supplierTRN ?? ""}
              onChange={(e) => setSupplierTRN(Number(e.target.value))}
            />
          </div>
          <div className="flex flex-col">
            <label>Oxaion No.</label>
            <input
              type="Number"
              className={`number-input ${
                validation.supplierTRN ? "error" : ""
              }`}
              placeholder="Oxaion Number"
              value={supplierTRN ?? ""}
              onChange={(e) => setSupplierTRN(Number(e.target.value))}
            />
          </div>
        </div>
        <div>
          <label>Supplier Address</label>
          <div className="flex flex-col gap-2">
            <input
              className={`flex flex-grow ${
                validation.supplierAddress.address ? "error" : ""
              }`}
              type="text"
              placeholder="Address"
              value={supplierAddress.address}
              onChange={(e) =>
                setSupplierAddress({
                  ...supplierAddress,
                  address: e.target.value,
                })
              }
            />
            <div className="flex gap-2">
              <input
                className={`max-w-min ${
                  validation.supplierAddress.POBox ? "error" : ""
                }`}
                type="text"
                placeholder="PO Box"
                value={supplierAddress.POBox}
                onChange={(e) =>
                  setSupplierAddress({
                    ...supplierAddress,
                    POBox: e.target.value,
                  })
                }
              />
              <input
                className={`w-72 ${
                  validation.supplierAddress.country ? "error" : ""
                }`}
                type="text"
                placeholder="Emirate/Country"
                value={supplierAddress.country}
                onChange={(e) =>
                  setSupplierAddress({
                    ...supplierAddress,
                    country: e.target.value,
                  })
                }
              />
            </div>
          </div>
        </div>
        <div className="flex gap-2 w-full">
          <div className="projItems flex-grow">
            <label>Supplier Contact Name</label>
            <input
              type="text"
              placeholder="Supplier Contact Name"
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
              className={validation.contactName ? "error" : ""}
            />
          </div>
          <div className="projItems">
            <label>Contact Number</label>
            <input
              type="text"
              placeholder="Contact No"
              value={contactNo}
              onChange={(e) => setContactNo(e.target.value)}
              className={validation.contactNo ? "error" : ""}
            />
          </div>
          <div className="projItems w-80">
            <label>Contact Email</label>
            <input
              type="text"
              placeholder="Contact Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={validation.email ? "error" : ""}
            />
          </div>
        </div>
        <div className="projItems">
          <label>Payment Term</label>
          <input
            type="text"
            placeholder="Payment Term"
            value={paymentTerm}
            onChange={(e) => setPaymentTerm(e.target.value)}
            className={validation.paymentTerm ? "error" : ""}
          />
        </div>
        <div className="projItems gap-3">
          <label>
            <strong>Bank Account Details</strong>
          </label>
          <div className="projItems w-full">
            <label>Bank Beneficiary Name</label>
            <input
              type="text"
              placeholder="Beneficiary Name"
              value={bankDetails.beneficiary}
              onChange={(e) =>
                setBankDetails({
                  ...bankDetails,
                  beneficiary: e.target.value,
                })
              }
              className={validation.bankDetails.beneficiary ? "error" : ""}
            />
          </div>
          <div className="flex gap-2">
            <div className="projItems w-full">
              <label>Bank Name/Branch</label>
              <input
                type="text"
                placeholder="Bank Name"
                value={bankDetails.bank}
                onChange={(e) =>
                  setBankDetails({
                    ...bankDetails,
                    bank: e.target.value,
                  })
                }
                className={validation.bankDetails.bank ? "error" : ""}
              />
            </div>
            <div className="projItems w-full">
              <label>Bank Swift code</label>
              <input
                type="text"
                placeholder="Bank Swift Code"
                value={bankDetails.swiftCode}
                onChange={(e) =>
                  setBankDetails({
                    ...bankDetails,
                    swiftCode: e.target.value,
                  })
                }
                className={validation.bankDetails.swiftCode ? "error" : ""}
              />
            </div>
          </div>
          <div className="projItems max-w-3xl">
            <label>Account Number</label>
            <input
              type="Number"
              className={`number-iput ${
                validation.bankDetails.accountNumber ? "error" : ""
              }`}
              placeholder="Account No."
              value={bankDetails.accountNumber}
              onChange={(e) =>
                setBankDetails({
                  ...bankDetails,
                  accountNumber: e.target.value,
                })
              }
            />
          </div>
          <div className="projItems max-w-3xl">
            <label>IBAN Number</label>
            <input
              type="text"
              placeholder="IBAN No."
              value={bankDetails.iban}
              onChange={(e) =>
                setBankDetails({
                  ...bankDetails,
                  iban: e.target.value,
                })
              }
              className={validation.bankDetails.iban ? "error" : ""}
            />
          </div>
        </div>
        <div className="mt-2 flex gap-3">
          <button type="submit" className="btn-green">
            <FaCheck />
            Save
          </button>
          <Link href="/Suppliers" type="button" className="btn-red">
            <MdCancel />
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SupplierForm;
