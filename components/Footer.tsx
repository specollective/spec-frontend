import Image from 'next/image'
import SocialMedia from './SocialMedia'

export default function Footer() {
  return (
    <footer className="bg-[#0C9FAA] h-80">
      <section className="flex p-14 justify-evenly">
      <div className="flex-row ">
        <div className="text-center mt-12 px-4">
          <a
            href="https://opencollective.com/spec"
            className="  block bg-spec-yellow  text-center ml-24 p-3.5 text-md font-medium text-black rounded-br-lg rounded-tl-lg font-montserrat h-12 w-28 "
          >
            DONATE
          </a>
          </div>
            <div className=" lg:hidden items-center mt-10">
         <SocialMedia/>
        </div> 
        <div className=" lg:block items-center mt-10">
          © 2023 Sustainable Progress and Equality Collective
        </div> 
      </div>   

      <div className="lg:visible float-right text-lg  mb-4 ">
          <div className="hidden lg:visible lg:block">
           
          Documentation <br></br><br></br>
          Journal of Engadged Research
          <br></br><br></br>Digital Art Gallery
            <br></br><br></br>
          </div>
          <SocialMedia/>
      </div>
    </section>
  </footer>
)}


