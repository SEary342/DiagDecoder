import { render, screen, fireEvent } from "@testing-library/react"
import { DiagAppBar } from "./DiagAppBar"
import { vi } from "vitest"

const pages = ["Fault Code Lookup", "DM Calculator"]

describe("DiagAppBar Component", () => {
  it("should render the AppBar with the correct title and buttons", () => {
    render(
      <DiagAppBar
        selectedPage={pages[0]}
        pages={pages}
        onPageChange={vi.fn()}
      />,
    )

    // Check if the AppBar title is rendered correctly
    expect(screen.getByText("CPT Diagnostics Tool")).toBeInTheDocument()

    // Check if both buttons are rendered
    expect(screen.getByText("Fault Code Lookup")).toBeInTheDocument()
    expect(screen.getByText("DM Calculator")).toBeInTheDocument()
  })

  it("should call onPageChange when a button is clicked", () => {
    const onPageChangeMock = vi.fn()
    render(
      <DiagAppBar
        selectedPage={pages[0]}
        pages={pages}
        onPageChange={onPageChangeMock}
      />,
    )

    // Click on the 'DM Calculator' button
    fireEvent.click(screen.getByText("DM Calculator"))

    // Verify if onPageChange was called with the correct argument
    expect(onPageChangeMock).toHaveBeenCalledWith("DM Calculator")

    // Click on the 'Fault Code Lookup' button
    fireEvent.click(screen.getByText("Fault Code Lookup"))

    // Verify if onPageChange was called with the correct argument
    expect(onPageChangeMock).toHaveBeenCalledWith("Fault Code Lookup")
  })

  it("should highlight the active page button", () => {
    const onPageChangeMock = vi.fn()
    const { rerender } = render(
      <DiagAppBar
        selectedPage={pages[0]}
        pages={pages}
        onPageChange={onPageChangeMock}
      />,
    )

    // Initially, 'Fault Code Lookup' should be active
    expect(screen.getByText("Fault Code Lookup")).toHaveStyle(
      "background-color: rgba(255, 255, 255, 0.2)",
    )

    // Re-render the component with the updated state
    rerender(
      <DiagAppBar
        selectedPage={pages[1]}
        pages={pages}
        onPageChange={onPageChangeMock}
      />,
    )

    // Now, 'DM Calculator' should be active
    expect(screen.getByText("DM Calculator")).toHaveStyle(
      "background-color: rgba(255, 255, 255, 0.2)",
    )
    expect(screen.getByText("Fault Code Lookup")).not.toHaveStyle(
      "background-color: rgba(255, 255, 255, 0.2)",
    )
  })
})
