export type Record = {
  date: string;
  price: string;
  description: string;
  paymentMethod: string;
  tag: string;
  installment: string;
  installmentDetails: InstallmentDetails;
  _id?: string;
};

export type InstallmentDetails = {
  isInstallment: boolean;
  installmentString: string;
  installmentPeriod?: number;
  installmentAmount?: number;
  firstPaymentDate?: string;
};

export type GroupedRecords = {
  [key: string]: Record[];
};

export type RecordActionType = "delete" | "update" | "add";
