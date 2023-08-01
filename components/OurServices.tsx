import ProjectsAccordion from './ProjectsAccordian';
import whatWeDoData from '../constants/what-we-do-data';

function ProjectsSection() {
  return (
    <div className="bg-spec-black-600 font-Poppins md:w-4/5 lg:w-3/4 xl:w-2/3 2xl:w-1/2 md:m-auto">
      <ProjectsAccordion projectsData={whatWeDoData} />
    </div>
  );
}

export default ProjectsSection;