import { useState } from 'react';
import Image from 'next/image';
import BreakLine from './BreakLine';
import downArrow from '../public/ProjectArrow.svg';
import upArrow from '../public/up-arrow.svg';
import Link from 'next/link';

interface ProjectProps  {
  link: string;
  linkLine: string;
  tag: string;
  info: {
    summary: string;
    list: string[];
  }
  pic: {
    alt: string;
    url: any;
  }
  name: string;
}

// TODO: Use interfaces for prop definitions
function ProjectsDisplay({ project } : ({ project: ProjectProps })) {
  return (
    <div className=" mb-2">
      <div className="flex justify-between max-h-[600px]">
        <div className="flex flex-col justify-between p-2">
          <div className=" text-sm lg:text-lg font-inter">
          {project.info.summary}
            {/* //create a conditional that checks for a value in project.info.list and conditionally renders the list as an unordered list  */}
            {project.info.list ? (
              <ul className="list-disc mt-8 p-2 font-inter">
                {project.info.list.map((item: any, index: any) => (
                  <li className="mt-2"key={`${item}-${index}`}>{item}</li>
                ))}
              </ul>
            ): null}
            
          </div>
          <div className="text-xl text-spec-yellow-600 hover:underline self-end mt-4">
            <Link className="underline text-spec-turquiose hover:text-spec-turquiose" href={project.link}>
            {project.linkLine}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectsAccordion({ projectsData } : { projectsData: any }) {
  const [isClicked, setIsClicked] = useState(null);

  const showProject = (index: any) => {
    setIsClicked(isClicked === index ? null : index);
  };

  const toggleBtn = (index: any) => {
    const downImage = <Image alt="down-arrow" src={downArrow} />;
    const upImage = <Image alt="up-arrow" src={upArrow} />;

    if (isClicked === index) {
      return upImage;
    } else {
      return downImage;
    }
  };

  return (
    <section className="py-14 md:py-30">
       <BreakLine lineWidth="full" />
      {projectsData?.map((project: ProjectProps, index: null) => (
        <div key={`${project.name}-${index}`}>
          <section className="hidden lg:block">
            <div className="cursor-pointer" onClick={() => showProject(index)}>
              <div className="grid grid-rows-3 grid-flow-col place-content-between items-end">
                <h3 className="row-span-1 col-span-1 font-dmserif text-4xl">
                  {project.name}
                </h3>
                <p className="col-span-2 font-montserrat">{project.tag}</p>
                <button
                  className="col-span-1 row-span-2"
                  aria-expanded={isClicked === index ? "true" : "false"}
                >
                  {toggleBtn(index)}
                </button>
              </div>
              {/* <BreakLine lineWidth="full" /> */}
            </div>
            {
              <section className={isClicked === index ? "block" : "hidden"}>
               
                <ProjectsDisplay project={project} />
              </section>
            }
             <BreakLine lineWidth="full" />
          </section>
          <section className="visible lg:hidden">
            <div className="flex flex-col">
              <div className="text-xl font-dmserif tracking-wider">{project.name}
              <div className="cursor-pointer float-right" onClick={() => showProject(index)}>
                 <button
                  className="row-span-3"
                  aria-expanded={isClicked === index ? "true" : "false"}
                >
                  {toggleBtn(index)}
                  </button> 
              </div>
              </div>
            </div>
              
             {
              <section className={isClicked === index ? "block" : "hidden"}>
                 <div className="font-medium font-montserrat">{project.tag}</div>
                <ProjectsDisplay project={project} />
              </section>
            }
              <BreakLine lineWidth="full" />
          </section>
           
        </div>
      ))}
    </section>
  );
}

export default ProjectsAccordion;