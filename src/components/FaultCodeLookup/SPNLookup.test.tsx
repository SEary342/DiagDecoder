import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { SPNLookup } from "./SPNLookup";
import { faultCode } from "../../types/faultCodes";

// Updated mock data for fault codes with all fields filled
const mockFaultCodes: faultCode[] = [
  {
    id: 1,
    spnName: "Engine Speed",
    implemented: true,
    faultCategory: "Category1",
    spn: 100,
    fmi: '"FMI=1 - Low Signal"',
    primaryText: "",
    monitorActive: "",
    loopFault: "",
    faultTime: "",
    primaryDmCond: "",
    primaryDegradedMode: [],
    secondaryDmCond: "",
    secondaryDegradedMode: [],
    amberWarning: "",
    redStop: "",
    dm1Broadcast: "",
    snapshotLogged: false,
    faultLatch: "",
    faultClear: "",
    milWhenFault: "",
    milMethodFault: "",
    milMethodPrimaryDM: "",
    milMethodSecondaryDM: "",
    hilWhenFault: "",
    hilMethodFault: "",
    methodDisableFault: "",
    faultCounterType: "",
    productType: [],
    isHeading: false,
    parentBinding: 0,
    module: 0,
    artifactType: "",
  },
  {
    id: 2,
    spnName: "Coolant Temp",
    implemented: true,
    faultCategory: "Category2",
    spn: 200,
    fmi: "FMI=2 - High Signal",
    primaryText: "",
    monitorActive: "",
    loopFault: "",
    faultTime: "",
    primaryDmCond: "",
    primaryDegradedMode: [],
    secondaryDmCond: "",
    secondaryDegradedMode: [],
    amberWarning: "",
    redStop: "",
    dm1Broadcast: "",
    snapshotLogged: false,
    faultLatch: "",
    faultClear: "",
    milWhenFault: "",
    milMethodFault: "",
    milMethodPrimaryDM: "",
    milMethodSecondaryDM: "",
    hilWhenFault: "",
    hilMethodFault: "",
    methodDisableFault: "",
    faultCounterType: "",
    productType: [],
    isHeading: false,
    parentBinding: 0,
    module: 0,
    artifactType: "",
  },
];

describe("SPNLookup Component", () => {
  it("renders without crashing", () => {
    render(
      <SPNLookup
        value={100}
        faultCodeData={mockFaultCodes}
        onChange={() => {}}
      />
    );
    // Use getByLabelText to ensure the correct element is targeted
    const inputElement = screen.getByLabelText("SPN/Component");
    expect(inputElement).toBeInTheDocument();
  });

  it("displays the correct value when the value is set", () => {
    render(
      <SPNLookup
        value={100}
        faultCodeData={mockFaultCodes}
        onChange={() => {}}
      />
    );
    // Ensure the value is correctly displayed in the input field
    const inputElement = screen.getByLabelText("SPN/Component");
    expect(inputElement).toHaveValue("100: Engine Speed");
  });

  it("calls onChange with correct value when a new option is selected", async () => {
    const mockOnChange = vi.fn();

    render(
      <SPNLookup
        value={100}
        faultCodeData={mockFaultCodes}
        onChange={mockOnChange}
      />
    );

    // Get the Autocomplete input and simulate selecting an option
    const inputElement = screen.getByLabelText("SPN/Component");

    // Open the dropdown
    fireEvent.mouseDown(inputElement);

    // Wait for the options to appear, and select the "Coolant Temp" option
    const option = await screen.findByText("200: Coolant Temp");
    fireEvent.click(option);

    // Wait for the onChange callback to be triggered
    await waitFor(() => expect(mockOnChange).toHaveBeenCalledWith(200));
  });

  it("filters out empty or invalid SPN options", () => {
    // All fields are filled to adhere to the `faultCode` type
    const faultyData: faultCode[] = [
      {
        id: 1,
        spnName: "Engine",
        implemented: true,
        faultCategory: "Category1",
        spn: 123,
        fmi: '"FMI=1 - Low Signal"',
        primaryText: "",
        monitorActive: "",
        loopFault: "",
        faultTime: "",
        primaryDmCond: "",
        primaryDegradedMode: [],
        secondaryDmCond: "",
        secondaryDegradedMode: [],
        amberWarning: "",
        redStop: "",
        dm1Broadcast: "",
        snapshotLogged: false,
        faultLatch: "",
        faultClear: "",
        milWhenFault: "",
        milMethodFault: "",
        milMethodPrimaryDM: "",
        milMethodSecondaryDM: "",
        hilWhenFault: "",
        hilMethodFault: "",
        methodDisableFault: "",
        faultCounterType: "",
        productType: [],
        isHeading: false,
        parentBinding: 0,
        module: 0,
        artifactType: "",
      },
      {
        id: 2,
        spnName: "",
        implemented: true,
        faultCategory: "Category2",
        spn: -1,
        fmi: "FMI=2 - High Signal",
        primaryText: "",
        monitorActive: "",
        loopFault: "",
        faultTime: "",
        primaryDmCond: "",
        primaryDegradedMode: [],
        secondaryDmCond: "",
        secondaryDegradedMode: [],
        amberWarning: "",
        redStop: "",
        dm1Broadcast: "",
        snapshotLogged: false,
        faultLatch: "",
        faultClear: "",
        milWhenFault: "",
        milMethodFault: "",
        milMethodPrimaryDM: "",
        milMethodSecondaryDM: "",
        hilWhenFault: "",
        hilMethodFault: "",
        methodDisableFault: "",
        faultCounterType: "",
        productType: [],
        isHeading: false,
        parentBinding: 0,
        module: 0,
        artifactType: "",
      },
      {
        id: 3,
        spnName: "Brakes",
        implemented: true,
        faultCategory: "Category3",
        spn: 789,
        fmi: "FMI=3 - Circuit Open",
        primaryText: "",
        monitorActive: "",
        loopFault: "",
        faultTime: "",
        primaryDmCond: "",
        primaryDegradedMode: [],
        secondaryDmCond: "",
        secondaryDegradedMode: [],
        amberWarning: "",
        redStop: "",
        dm1Broadcast: "",
        snapshotLogged: false,
        faultLatch: "",
        faultClear: "",
        milWhenFault: "",
        milMethodFault: "",
        milMethodPrimaryDM: "",
        milMethodSecondaryDM: "",
        hilWhenFault: "",
        hilMethodFault: "",
        methodDisableFault: "",
        faultCounterType: "",
        productType: [],
        isHeading: false,
        parentBinding: 0,
        module: 0,
        artifactType: "",
      },
    ];

    render(
      <SPNLookup value={123} faultCodeData={faultyData} onChange={() => {}} />
    );

    const inputElement = screen.getByLabelText("SPN/Component");

    // Open the dropdown
    fireEvent.mouseDown(inputElement);
    expect(screen.getByText("123: Engine")).toBeInTheDocument();
    expect(screen.getByText("789: Brakes")).toBeInTheDocument();

    // Check that the invalid "456:" option is not displayed
    expect(screen.queryByText("456:")).toBeNull();
  });

  it("does not show any options if faultCodeData is empty", () => {
    render(<SPNLookup value={100} faultCodeData={[]} onChange={() => {}} />);

    // Ensure no options are rendered when faultCodeData is empty
    expect(screen.queryByRole("listbox")).toBeNull();
  });
});
