export interface EntityInterface {
  _id: string;
  entityCode: number;
  entityAbbrev: string;
  entityName: string;
  entityTRN: number;
  entityAddress: {
    address: string;
    POBox: string;
    country: string;
  };
}

export interface EntityValidationInterface {
  entityCode: boolean;
  entityAbbrev: boolean;
  entityName: boolean;
  entityTRN: boolean;
  entityAddress: {
    address: boolean;
    POBox: boolean;
    country: boolean;
  };
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
  deliveryAddress: {
    address: string;
    POBox: string;
    country: string;
  }[];
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
  supplierAddress: {
    address: string;
    POBox: string;
    country: string;
  };
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
  supplierAddress: {
    address: boolean;
    POBox: boolean;
    country: boolean;
  };
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
  purchaseReq: PRInterface;
  deliveryAddress: { address: string; POBox: string; country: string };
  orderDate: Date;
  deliveryDate: Date | undefined;
  notes: string[],
  deliveryTerms: string[],
}