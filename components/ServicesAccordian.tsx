import { useState } from 'react';
import Image from 'next/image';
import BreakLine from './BreakLine';
import { Heading2, Subtitle1 } from './Typography/Heading';
import { Paragraph1 } from './Typography/Paragraph';

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
          <div className="text-sm lg:text-lg">
            <Paragraph1>
              {project.info.summary}
            </Paragraph1>
            
            {/* Create a conditional that checks for a value in project.info.list and conditionally renders the list as an unordered list  */}
            {project.info.list ? (
              <ul className="list-disc p-4 font-montserrat">
                {project.info.list.map((item: any, index: any) => (
                  <li className="mt-2" key={`${item}-${index}`}>
                    <Paragraph1>{item}</Paragraph1>
                  </li>
                ))}
              </ul>
            ): null}
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
    const downImage = <Image
      alt="down-arrow"
      src="/ProjectArrow.svg"
      width={65}
      height={65}
    />;
    const upImage = <Image
      alt="up-arrow"
      src="/up-arrow.svg"
      width={65}
      height={65}
    />;

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
                <Heading2>
                  {project.name}
                </Heading2>
                <Subtitle1 className="pt-2 hidden md:block">
                  {project.tag}
                </Subtitle1>
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
