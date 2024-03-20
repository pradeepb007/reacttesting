import React from "react";
import { render, screen } from "@testing-library/react";
import PageSection from "./PageSection";

describe("PageSection component", () => {
  it("renders children correctly", () => {
    render(
      <PageSection>
        <div>Hello World</div>
      </PageSection>
    );

    expect(screen.getByText("Hello World")).toBeInTheDocument();
  });
});
