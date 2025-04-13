import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { ReadOnlyText } from "./ReadOnlyText" // adjust path as needed

describe("ReadOnlyText", () => {
  it("renders the label correctly", () => {
    render(<ReadOnlyText label="Test Label" value="Sample text" />)
    expect(screen.getByLabelText("Test Label")).toBeInTheDocument()
  })

  it("renders the value correctly", () => {
    render(<ReadOnlyText label="Test Label" value="Sample text" />)
    const input = screen.getByLabelText("Test Label") as HTMLInputElement
    expect(input.value).toBe("Sample text")
  })

  it("sets the field as read-only", () => {
    render(<ReadOnlyText label="Test Label" value="Read-only text" />)
    const input = screen.getByLabelText("Test Label") as HTMLInputElement
    expect(input).toHaveAttribute("readonly")
  })

  it("supports multiline by default", () => {
    render(<ReadOnlyText label="Test Label" value="Multiline text" />)
    const input = screen.getByLabelText("Test Label")
    expect(input.tagName).toBe("TEXTAREA")
  })

  it("renders as single line when multiline is false", () => {
    render(
      <ReadOnlyText label="Test Label" value="Single line" multiline={false} />,
    )
    const input = screen.getByLabelText("Test Label")
    expect(input.tagName).toBe("INPUT")
  })

  it("renders empty value when value is not provided", () => {
    render(<ReadOnlyText label="Empty Field" />)
    const input = screen.getByLabelText("Empty Field") as HTMLInputElement
    expect(input.value).toBe("")
  })
})
