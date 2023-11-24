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
          src="/github-logo.svg"
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
            src="/linkedin-logo.svg"
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
            src="/facebook-logo.svg"
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
            src="/twitter-logo.svg"
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