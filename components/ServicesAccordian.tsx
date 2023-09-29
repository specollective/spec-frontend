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

function ServiceRow({ project } : ({ project: ProjectProps })) {
  return (
    <div className="mb-2 mt-4">
      <div className="flex justify-between max-h-[600px]">
        <div className="flex flex-col justify-between">
          <p className="font-semibold text-lg font-montserrat mb-2 block md:hidden md:pt-2 md:pb-6">
            { project.tag }
          </p>
          <div className="text-sm lg:text-lg font-montserrat font-normal">
            {project.info.summary}
            {/* //create a conditional that checks for a value in project.info.list and conditionally renders the list as an unordered list  */}
            {project.info.list ? (
              <ul className="list-disc mt-4 p-4 font-montserrat">
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

function ServicesAccordion({ services } : { services: any }) {
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
    <section className="w-full">
      <BreakLine lineWidth="full" />
      {services?.map((project: ProjectProps, index: null) => (
        <div className="w-full" key={`${project.name}-${index}`}>
          <div className="cursor-pointer" onClick={() => showProject(index)}>
            <div className="grid grid-cols-5">
              <div className="col-span-4">
                <h3 className="font-dmserif text-2xl md:text-4xl">
                  {project.name}
                </h3>
                <p className="font-semibold text-lg font-montserrat hidden md:block md:pt-2 md:pb-6">
                  { project.tag }
                </p>
              </div>
              <div className="col-span-1">
                <button
                  className="float-right"
                  aria-expanded={isClicked === index ? "true" : "false"}
                >
                  {toggleBtn(index)}
                </button>
              </div>
            </div>
          </div>
          {
            <section className={isClicked === index ? "block" : "hidden"}>
              <ServiceRow project={project} />
            </section>
          }
          <BreakLine lineWidth="full" />
        </div>
      ))}
    </section>
  );
}

export default ServicesAccordion;
