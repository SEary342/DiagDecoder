import Papa from "papaparse";

export interface faultCode {
  id: number;
  spnName: string;
  implemented: boolean;
  faultCategory: string;
  spn: number;
  fmi: string;
  primaryText: string;
  monitorActive: string;
  loopFault: string;
  faultTime: string;
  primaryDmCond: string;
  primaryDegradedMode: string[];
  secondaryDmCond: string;
  secondaryDegradedMode: string[];
  amberWarning: string;
  redStop: string;
  dm1Broadcast: string;
  snapshotLogged: boolean;
  faultLatch: string;
  faultClear: string;
  milWhenFault: string;
  milMethodFault: string;
  milMethodPrimaryDM: string;
  milMethodSecondaryDM: string;
  hilWhenFault: string;
  hilMethodFault: string;
  methodDisableFault: string;
  faultCounterType: string;
  productType: string[];
  isHeading: boolean;
  parentBinding: number;
  module: number;
  artifactType: string;
}

export const dataMap: { [key: string]: { importText: string } } = {
  id: { importText: "id" },
  spnName: { importText: "SPN J1939 Name" },
  implemented: { importText: "Implemented" },
  faultCategory: { importText: "Fault Category (table)" },
  spn: { importText: "SPN" },
  fmi: { importText: "FMI" },
  primaryText: { importText: "Primary Text" },
  monitorActive: { importText: "When the monitor is active" },
  loopFault: { importText: "When a loop fault is set" },
  faultTime: { importText: "Fault Set Time/Percent" },
  primaryDmCond: { importText: "Primary DM Condition" },
  primaryDegradedMode: { importText: "Primary Degraded Mode" },
  secondaryDmCond: { importText: "Secondary DM Condition" },
  secondaryDegradedMode: { importText: "Secondary Degraded Mode" },
  amberWarning: { importText: "Amber Warning Lamp" },
  redStop: { importText: "Red Stop Lamp" },
  dm1Broadcast: { importText: "DM1 Broadcast" },
  snapshotLogged: { importText: "Snapshot Logged" },
  faultLatch: { importText: "Fault Latch Until" },
  faultClear: { importText: "Fault Clear Time/Percent" },
  milWhenFault: { importText: "MiL When to Inject Fault" },
  milMethodFault: { importText: "MiL Method to Inject Fault" },
  milMethodPrimaryDM: { importText: "MiL Method to Inject Primary DM" },
  milMethodSecondaryDM: { importText: "MiL Method to Inject Secondary DM" },
  hilWhenFault: { importText: "HiL When to Inject Fault" },
  hilMethodFault: { importText: "HiL Method to Inject Fault" },
  methodDisableFault: { importText: "Method to Disable Fault" },
  faultCounterType: { importText: "Fault Counter Type" },
  productType: { importText: "Product Type" },
  linkSatisfies: { importText: "Link:Satisfies" },
  isHeading: { importText: "isHeading" },
  parentBinding: { importText: "parentBinding" },
  module: { importText: "module" },
  artifactType: { importText: "Artifact Type" },
};

const parseValue = (key: keyof faultCode, value: string): any => {
  if (value === undefined || value === null || value.trim() === "") {
    if (Array.isArray(({} as faultCode)[key])) return [];
    if (typeof ({} as faultCode)[key] === "boolean") return false;
    if (typeof ({} as faultCode)[key] === "number") return 0;
    return "";
  }

  switch (key) {
    case "id":
    case "spn":
    case "parentBinding":
    case "module":
      return Number(value);
    case "implemented":
    case "snapshotLogged":
    case "isHeading":
      return value.toLowerCase() === "true";
    case "primaryDegradedMode":
    case "secondaryDegradedMode":
    case "productType":
      return value.split(",").map((s) => s.trim());
    default:
      return value;
  }
};

export const parseCsvToJson = (file: File): Promise<faultCode[]> => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const parsed: faultCode[] = results.data.map((row: any) => {
          const item: Partial<faultCode> = {};
          for (const key in dataMap) {
            const typedKey = key as keyof faultCode;
            const csvColumn = dataMap[typedKey].importText;
            const rawValue = row[csvColumn];
            item[typedKey] = parseValue(typedKey, rawValue);
          }
          return item as faultCode;
        });
        resolve(parsed);
      },
      error: (error) => {
        reject(error);
      },
    });
  });
};
