import React from "react";
import FacebookLogo from "../public/facebook-logo.svg"
import TwitterLogo from "../public/twitter-logo.svg"
import LinkedinLogo from "../public/linkedin-logo.svg"
import GithubLogo from "../public/github-logo.svg"
import Image from 'next/image'
import Link from "next/link";
export default function Footer() {
    return (

        <footer className="bg-[#0C9FAA] h-80">
            
            
           
            <section className="flex p-14 justify-evenly">
            <div className="flex-row">
            <div className="text-center mt-12 px-4">
                  <a
                    href="https://opencollective.com/spec"
                    className="  block bg-spec-yellow  text-center ml-24 p-3.5 text-md font-medium text-black rounded-br-lg rounded-tl-lg font-montserrat h-12 w-28 "
                  >
                    DONATE
                  </a>
                </div>
            <div className="hidden lg:block items-center mt-10">© 2023 Sustainable Progress and Equality Collective</div> 
            </div>   
           
        
            <div className="float-right text-lg  mb-4 ">

                   <div className="hidden lg:block">Documentation <br></br><br></br>Journal of Engadged Research <br></br><br></br>Digital Art Gallery<br></br><br></br></div>
                   <div className=" flex flex-row  space-x-4  ">
                  

                     <a
                      href="https://github.com/specollective"
                      target="_blank"
                      rel="noopener"
                      className="pl-1"
                    >
                      
                      
                    
                      <Image
                        className=" "
                        src={GithubLogo}
                        alt="github-logo"
                        width={35}
                        height={33}
                        priority
                      />
                    </a>
                    
                    <a
                      href="https://www.linkedin.com/company/specollective"
                      aria-label="LinkedIn"
                      target="_blank"
                      rel="noopener"
                      className="pl-1"
                    >
                      <Image
                        className=" "
                        src={LinkedinLogo}
                        alt="linkedin-logo"
                        width={35}
                        height={33}
                        priority
                      />
                    </a>
                    <a
                      href="https://www.facebook.com/specollective"
                      target="_blank"
                      rel="noopener"
                      className="pl-1"
                    >
                        
                    <Image
                        className="float-right"
                        src={FacebookLogo}
                        alt="facebook-logo"
                        width={35}
                        height={33}
                        priority
                        
                      />
                      
                     </a> 
                    <a
                      href="https://twitter.com/specollective"
                      target="_blank"
                      rel="noopener"
                      className="pl-1"
                    >
                      <Image
                        className="float-right  "
                        src={TwitterLogo}
                        alt="twitter-logo"
                        width={35}
                        height={33}
                        priority
                        
                      />
                    </a> 
                    
                     
                    
                    </div>
                    
                  </div>
                  </section> 
              
               
          </footer>
    )}


