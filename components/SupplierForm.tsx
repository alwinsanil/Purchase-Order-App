import Link from "next/link";
import { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import axios from "axios";
import { useRouter } from "next/navigation";
import { SupplierInterface } from "./Interfaces";

const SupplierForm: React.FC<SupplierInterface> = ({
  _id,
  supplierCode: existingSupplierCode,
  supplierName: existingSupplierName,
  supplierTRN: existingSupplierTRN,
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

  async function saveSupplier(e: React.FormEvent) {
    e.preventDefault();
    const data = {
      supplierCode,
      supplierName,
      supplierAddress,
      supplierTRN,
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
            />
          </div>
          <div className="projItems flex-grow">
            <label>Supplier Name</label>
            <input
              type="text"
              placeholder="Supplier Name"
              value={supplierName}
              onChange={(e) => setSupplierName(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-col">
          <label>Supplier TRN No.</label>
          <input
            type="Number"
            className="number-input"
            placeholder="Supplier TRN Number"
            value={supplierTRN ?? ""}
            onChange={(e) => setSupplierTRN(Number(e.target.value))}
          />
        </div>
        <div>
          <label>Supplier Address</label>
          <div className="flex flex-col gap-2">
            <input
              className="flex flex-grow"
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
                className="max-w-min"
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
                className="w-72"
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
            />
          </div>
          <div className="projItems">
            <label>Contact Number</label>
            <input
              type="text"
              placeholder="Contact No"
              value={contactNo}
              onChange={(e) => setContactNo(e.target.value)}
            />
          </div>
          <div className="projItems w-80">
            <label>Contact Email</label>
            <input
              type="text"
              placeholder="Contact Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              />
            </div>
          </div>
          <div className="projItems max-w-3xl">
            <label>Account Number</label>
            <input
              type="Number"
              className="number-input"
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
