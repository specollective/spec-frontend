//create a smoke test for the OurTeam Page

import { render, screen } from "@testing-library/react";
import OurTeamPage from "../../pages/ourTeam";
import "@testing-library/jest-dom";

describe("OurTeamPage", () => {
  it("renders title", () => {
    render(<OurTeamPage />);

    const title = screen.getByText(
      /Our Team/
    );

    expect(title).toBeInTheDocument();
  });
});