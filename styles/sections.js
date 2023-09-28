// Breakpoint prefix	Minimum width	CSS
// sm	640px	@media (min-width: 640px) { ... }
// md	768px	@media (min-width: 768px) { ... }
// lg	1024px	@media (min-width: 1024px) { ... }
// xl	1280px	@media (min-width: 1280px) { ... }
// 2xl	1536px	@media (min-width: 1536px) { ... }

const sectionClasses = {
  container: `flex flex-col mx-8 pt-10 md:mx-12 lg:flex lg:flex-row lg:mx-44 lg:px-12 items-center justify-center`,
  column: 'lg:w-1/2 lg:max-w-lg lg:pl-10',
}

export default sectionClasses;