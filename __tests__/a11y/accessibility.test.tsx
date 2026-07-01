import { render } from "@testing-library/react";
import { axe } from "jest-axe";
import type { ReactElement } from "react";

import Home from "../../pages/index";
import OurTeam from "../../pages/ourTeam";
import GieePage from "../../pages/giee";
import GlqfPage from "../../pages/glqf";

// Renders each page that mounts without server-side props and asserts that
// axe-core finds no accessibility violations in the rendered markup.
const pages: [string, () => ReactElement][] = [
  ["index", Home],
  ["ourTeam", OurTeam],
  ["giee", GieePage],
  ["glqf", GlqfPage],
];

describe("accessibility (jest-axe)", () => {
  it.each(pages)("%s page has no axe violations", async (_name, Page) => {
    const { container } = render(<Page />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
