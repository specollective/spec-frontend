import Image from 'next/image';

function Section({ children, bgColor }) {
  console.log(bgColor);
  return (
    <section className={`bg-${bgColor} min-h-96 mb-10}`}>
      {children}
    </section>
  )
}

function Paragraph1({ children }) {
  return (
    <p className="text-base md:text-lg">
      {children}
    </p>
  )
}


export default function StyleGuide() {
  return (
    <main>
      
      {/* Headings */}
      <Section bgColor="slate-200">
        <Heading1>
          Heading #1
        </Heading1>
        <Heading2>
          Heading #2
        </Heading2>
        <h3 className="text-base md:text-2xl">
          Heading #3
        </h3>

        {/* Paragraph */}
        <Paragraph1>Paragraph</Paragraph1>
      </Section>

      <Section bgColor="blue-200">
        {/* 2 column layout */}
        <div className="grid md:grid-cols-2">
          <div className="col-span-1">
            <Heading2>Column 1</Heading2>
            <Paragraph1>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Paragraph1>
          </div>
          <div className="col-span-1">
            <Image
              src="/500x500.svg"
              alt="Picture of the author"
              width={500}
              height={500}
            />
          </div>
        </div>
      </Section>

      <Section bgColor="green-300">
        {/* 2 column layout */}
        <div className="grid md:grid-cols-3 h-60">
          <div className="col-span-1 bg-slate-300">
            <p>Column 1</p>
          </div>
          <div className="col-span-1 bg-slate-400">
            <p>Column 2</p>
          </div>
          <div className="bg-slate-600">
            <p>Column 3</p>
          </div>
        </div>
      </Section>

      <Section bgColor="purple-300">
        <div className="flex flex-row min-h-screen justify-center items-center bg-slate-200">
          <div>
            <Heading1 className="text-center">
              Column 1
            </Heading1>
            <Paragraph1>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Paragraph1>
          </div>
        </div>
      </Section>


      


      {/* Button */}
      
    </main>
      
  )
}