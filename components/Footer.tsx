import SocialMedia from './SocialMedia'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-[#0C9FAA] h-80">
      <section className="flex p-4 justify-evenly">
      <div className="flex-row">
        <div className="text-center mt-12 mx-6 px-4">
          <a
            href="https://opencollective.com/spec"
            className="  block bg-spec-yellow  text-center ml-24 p-3.5 text-md font-medium text-black rounded-br-2xl rounded-tl-2xl   hover:text-black hover:bg-white hover:border-spec-yellow hover:border-4 font-montserrat h-12 w-28 "
          >
            DONATE
          </a>
          <div className='flex flex-col justify-center'>
            <div className="flex justify center lg:hidden content-center mt-10 mx-14">
              <SocialMedia/>
            </div> 
            <div className="lg:block font-montserrat items-center mt-10">
              © 2023 Sustainable Progress and Equality Collective
            </div> 
          </div> 
        </div> 
      </div>   

      <div className="lg:visible float-right text-lg  mb-4 ">
        <div className="hidden lg:visible lg:block">
          <a
            href="https://docs.specollective.org/introduction/"
            aria-label="Documentation"
            target="_blank"
            rel="noreferrer"
            className="pl-1 font-montserrat"
          >
            <p>Documentation</p>
          </a>
          <a
            href="https://medium.com/journal-of-engaged-research"
            aria-label="JoER"
            target="_blank"
            rel="noreferrer"
            className="pl-1 font-montserrat"
          >
            <p>Journal of Engaged Research</p>
          </a>
          <a
            href="https://medium.com/journal-of-engaged-research/expressions/home"
            aria-label="ArtGallery"
            target="_blank"
            rel="noreferrer"
            className="pl-1 font-montserrat"
          >
            <p>Digital Art Gallery</p>
          </a>
          
          <br></br>
          <SocialMedia/>
          <br></br>
        </div>
      </div>
    </section>
  </footer>
)}


