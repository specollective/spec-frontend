//create a smoke test for the OurTeam Page

import { render, screen } from "@testing-library/react";
import OurTeamPage from "../../pages/ourTeam";
import "@testing-library/jest-dom";

describe("OurTeamPage", () => {
  it("renders title", () => {
    render(<OurTeamPage />);

    // The i18n mock echoes translation keys, so assert on the heading role
    // (locale-independent) rather than literal English copy.
    const title = screen.getByRole("heading", { level: 1 });

    expect(title).toBeInTheDocument();
  });
});