import React from "react";
import FacebookLogo from "../public/facebook-logo.svg"
import TwitterLogo from "../public/twitter-logo.svg"
import LinkedinLogo from "../public/linkedin-logo.svg"
import GithubLogo from "../public/github-logo.svg"
import Image from 'next/image'
import Link from "next/link";
export default function Footer() {
    return (

        <footer className=" bg-[#0C9FAA] h-80  ">
            
            
            <div className='max-w-3xl mx-auto  '>
            <div className="flex-column">
            <div className="text-center mt-12">
                  <a
                    href="https://opencollective.com/spec"
                    className="block bg-spec-yellow text-center p-2 text-2xl font-medium text-white rounded-br-lg rounded-tl-lg font-montserrat h-12 w-28 "
                  >
                    DONATE
                  </a>
                </div>
            <div className="flex items-center mt-10">© 2023 Sustainable Progress and Equality Collective</div> 
            </div>   
           
        
            <div className="  float-right text-lg  mb-4 ">

                  Documentation <br></br><br></br>Journal of Engadged Research <br></br><br></br>Digital Art Gallery<br></br><br></br>
                   <div className=" flex flex-row  space-x-4  ">
                  

                     <a
                      href="https://github.com/specollective"
                      target="_blank"
                      rel="noreferrer"
                      className="pl-1"
                    >
                      
                      
                    
                      <Image
                        className="flex-row  "
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
                      rel="noreferrer"
                      className="pl-1"
                    >
                      <Image
                        className="flex-row "
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
                      rel="noreferrer"
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
                      rel="noreferrer"
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
              </div>     
          </footer>
    )}


