// Search-engine indexing toggles for incubating sections.
//
// While a section is still in progress we keep it out of search results with a
// `noindex` robots meta tag, rendered by that section's layout component. When a
// section is ready to launch publicly, flip its flag to `true` (or delete the
// entry) and the noindex tag is no longer emitted.
export const INDEXABLE = {
  giee: false,
  glqf: false,
};
