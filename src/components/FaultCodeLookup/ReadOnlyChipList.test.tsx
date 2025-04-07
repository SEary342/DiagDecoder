import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ReadOnlyChipList } from "./ReadOnlyChipList";

describe("ReadOnlyChipList", () => {
  it("renders without crashing", () => {
    render(<ReadOnlyChipList items={[]} />);
    // No chips rendered but no crash
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("renders a chip for each item", () => {
    const items = ["One", "Two", "Three"];
    render(<ReadOnlyChipList items={items} />);

    items.forEach((item) => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });
  });

  it("renders chips with correct labels", () => {
    const items = ["Apple", "Banana", "Cherry"];
    render(<ReadOnlyChipList items={items} />);
    const chips = screen.getAllByTestId("ro-chip");
    expect(chips.length).toBe(items.length);

    items.forEach((label, index) => {
      expect(chips[index]).toHaveTextContent(label);
    });
  });
});
