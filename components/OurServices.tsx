import ProjectsAccordion from './ProjectsAccordian';
import whatWeDoData from '../constants/what-we-do-data';

function ProjectsSection() {
  return (
    <div className="bg-spec-black-600 font-Poppins md:m-auto px-20 md:px-40">
      <ProjectsAccordion projectsData={whatWeDoData} />
    </div>
  );
}

export default ProjectsSection;