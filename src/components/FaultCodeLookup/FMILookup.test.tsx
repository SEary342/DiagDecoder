import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { FMILookup } from "./FMILookup"
import { describe, it, expect, vi } from "vitest"
import { faultCode } from "../../types/faultCodes"

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
    spn: 100,
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
]

describe("FMILookup component", () => {
  it("renders correctly and shows options for selected SPN", async () => {
    const handleChange = vi.fn()

    render(
      <FMILookup
        value={null}
        faultCodeData={mockFaultCodes}
        spnSelected={100}
        onChange={handleChange}
      />,
    )

    const input = screen.getByRole("combobox")
    expect(input).toBeInTheDocument()

    await userEvent.click(input)

    const option1 = await screen.findByText("1 - Low Signal")
    const option2 = await screen.findByText("2 - High Signal")

    expect(option1).toBeInTheDocument()
    expect(option2).toBeInTheDocument()
  })

  it("calls onChange with raw FMI when an option is selected", async () => {
    const handleChange = vi.fn()

    render(
      <FMILookup
        value={null}
        faultCodeData={mockFaultCodes}
        spnSelected={100}
        onChange={handleChange}
      />,
    )

    const input = screen.getByRole("combobox")
    await userEvent.click(input)

    const optionToSelect = await screen.findByText("2 - High Signal")
    await userEvent.click(optionToSelect)

    expect(handleChange).toHaveBeenCalledWith("FMI=2 - High Signal")
  })

  it("shows the cleaned label when a value is selected", async () => {
    render(
      <FMILookup
        value={'"FMI=1 - Low Signal"'}
        faultCodeData={mockFaultCodes}
        spnSelected={100}
        onChange={() => {}}
      />,
    )

    const input = screen.getByRole("combobox") as HTMLInputElement
    expect(input.value).toBe("1 - Low Signal")
  })
})
