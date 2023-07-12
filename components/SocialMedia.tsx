import FacebookLogo from '../public/facebook-logo.svg'
import TwitterLogo from '../public/twitter-logo.svg'
import LinkedinLogo from '../public/linkedin-logo.svg'
import GithubLogo from '../public/github-logo.svg'
import Image from 'next/image'

function SocialMedia () {
    return (
        <div>
            <div className=" flex flex-row space-x-4">
            <a
              href="https://github.com/specollective"
              target="_blank"
              rel="noreferrer"
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
            rel="noreferrer"
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
    )
}

//export the component
export default SocialMedia