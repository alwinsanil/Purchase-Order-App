export interface AddressInterface {
  address: string;
    POBox: string;
    country: string;
}

export interface AddressValidationInterface {
  address: boolean;
    POBox: boolean;
    country: boolean;
}

export interface EntityInterface {
  _id: string;
  entityCode: number;
  entityAbbrev: string;
  entityName: string;
  entityTRN: number;
  entityAddress: AddressInterface
}

export interface EntityValidationInterface {
  entityCode: boolean;
  entityAbbrev: boolean;
  entityName: boolean;
  entityTRN: boolean;
  entityAddress: AddressValidationInterface;
}

export interface ProjectInterface {
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
  deliveryAddress: AddressInterface[];
  contactPerson: string;
  orderCount: number;
  purchaseReqCount: number;
}

export interface ProjectValidationInterface {
  entity: {
    _id: boolean;
  };
  abbrev: boolean;
  projectName: boolean;
  contractNo: boolean;
  contactPerson: boolean;
}

export interface SupplierInterface {
  _id: string;
  supplierCode: string;
  supplierName: string;
  supplierTRN: number;
  oxaion: number;
  supplierAddress: AddressInterface;
  contactName: string;
  contactNo: string;
  email: string;
  paymentTerm: string;
  bankDetails: {
    beneficiary: string;
    bank: string;
    swiftCode: string;
    accountNumber: string;
    iban: string;
  };
}

export interface SupplierValidationInterface {
  supplierCode: boolean;
  supplierName: boolean;
  supplierTRN: boolean;
  oxaion: boolean;
  supplierAddress: AddressValidationInterface;
  contactName: boolean;
  contactNo: boolean;
  email: boolean;
  paymentTerm: boolean;
  bankDetails: {
    beneficiary: boolean;
    bank: boolean;
    swiftCode: boolean;
    accountNumber: boolean;
    iban: boolean;
  };
}

export interface itemInterface {
  itemIndex: number;
  fCodeAssembly: string;
  totalAssembledQty: string;
  fCodeAssemblyPart: string;
  description: string;
  material: string;
  finish: string;
  remarks: string;
  alloy: string;
  totalQty: number | null;
  width: number | null;
  thickness: number | null;
  length: number | null;
  volume: number | null;
  weight: number | null;
  totalKG: number | null;
  totalTons: number | null;
  unitPrice: number;
  totalCost: number;
}

export interface PRInterface {
  _id: string;
  itemList: itemInterface[];
  project: { _id: string; projectName: string; purchaseReqCount: number };
  purchaseReqCode: string;
}

export interface OrderInterface {
  _id: string;
  purchaseOrderNo: string;
  entity: EntityInterface;
  project: ProjectInterface;
  supplier: SupplierInterface;
  selectedItems: itemInterface[];
  purchaseReq: PRInterface;
  deliveryAddress: { address: string; POBox: string; country: string };
  orderDate: Date;
  deliveryDate: Date | undefined;
  notes: string[];
  deliveryTerms: string[];
  totalPrice: number;
  currency: string;
}

export interface ExportData {
  SNo: number;
  Date: Date;
  PO_Reference: string;
  Company: number;
  Oxaion_No: number;
  BudgetPos: string;
  Supplier_Name: string;
  Amount_AED_WO_VAT: number | null;
  Vat: number | null;
  OMR: number | null;
  SAR: number | null;
  EUR: number | null;
  GBP: number | null;
  USD: number | null;
  BHD: number | null;
  Total: number;
  Total_AED: number;
  Delivery_Status: string;
  Remarks: string;
}

export interface ColourOption {
  readonly value: string;
  readonly label: string;
  readonly color: string;
  readonly isFixed?: boolean;
  readonly isDisabled?: boolean;
}

export const colourOptions: readonly ColourOption[] = [
  { value: "ocean", label: "Ocean", color: "#00B8D9", isFixed: true },
  { value: "blue", label: "Blue", color: "#0052CC", isFixed: true },
  { value: "purple", label: "Purple", color: "#5243AA" },
  { value: "red", label: "Red", color: "#FF5630", isFixed: true },
  { value: "orange", label: "Orange", color: "#FF8B00" },
  { value: "yellow", label: "Yellow", color: "#FFC400" },
  { value: "green", label: "Green", color: "#36B37E" },
  { value: "forest", label: "Forest", color: "#00875A" },
  { value: "slate", label: "Slate", color: "#253858" },
  { value: "silver", label: "Silver", color: "#666666" },
];
