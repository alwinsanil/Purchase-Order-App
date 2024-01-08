import Link from "next/link";
import { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import axios from "axios";
import { useRouter } from "next/navigation";

export interface SupplierInterface {
  _id: string;
  supplierCode: string;
  supplierName: string;
  supplierTRN: number;
  supplierAddress: {
    address: string;
    POBox: string;
    country: string;
  };
  contactName: string;
  contactNo: string;
  email: string;
  paymentTerm: string;
}

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
      paymentTerm
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
