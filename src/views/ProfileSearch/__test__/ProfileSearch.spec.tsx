import React from "react";
import { render, screen } from "@testing-library/react";
import { ProfileSearch } from "../ProfileSearch";

describe("ProfileSearch", () => {
  it("renders title", () => {
    render(<ProfileSearch />);

    const linkElement = screen.getByText('GitHub profile finder');

    expect(linkElement).toBeInTheDocument();
  });
});
