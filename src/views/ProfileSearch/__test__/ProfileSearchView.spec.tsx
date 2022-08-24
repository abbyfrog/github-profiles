import React from "react";
import { render, screen } from "@testing-library/react";
import { ProfileSearchView } from "../ProfileSearchView";

describe("ProfileSearchView", () => {
  it("renders title", () => {
    render(<ProfileSearchView />);

    const linkElement = screen.getByText('GitHub profile finder');

    expect(linkElement).toBeInTheDocument();
  });
});
