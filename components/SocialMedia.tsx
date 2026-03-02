import Image from 'next/image'

function SocialMedia () {
  return (
    <div className="flex gap-4">
      <a
        href="https://github.com/specollective"
        target="_blank"
        rel="noreferrer"
        aria-label="Visit SPEC on GitHub (opens in new tab)"
        className="hover:opacity-75 transition-opacity focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-spec-turquoise rounded"
      >
        <Image
          src="/github-logo.svg"
          alt=""
          width={35}
          height={33}
          priority
        />
      </a>
      <a
        href="https://www.linkedin.com/company/specollective"
        target="_blank"
        rel="noreferrer"
        aria-label="Visit SPEC on LinkedIn (opens in new tab)"
        className="hover:opacity-75 transition-opacity focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-spec-turquoise rounded"
      >
        <Image
          src="/linkedin-logo.svg"
          alt=""
          width={35}
          height={33}
          priority
        />
      </a>
      <a
        href="https://www.facebook.com/specollective"
        target="_blank"
        rel="noreferrer"
        aria-label="Visit SPEC on Facebook (opens in new tab)"
        className="hover:opacity-75 transition-opacity focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-spec-turquoise rounded"
      >
        <Image
          src="/facebook-logo.svg"
          alt=""
          width={35}
          height={33}
          priority
        />
      </a>
      <a
        href="https://twitter.com/specollective"
        target="_blank"
        rel="noreferrer"
        aria-label="Visit SPEC on Twitter (opens in new tab)"
        className="hover:opacity-75 transition-opacity focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-spec-turquoise rounded"
      >
        <Image
          src="/twitter-logo.svg"
          alt=""
          width={35}
          height={33}
          priority
        />
      </a>
    </div>
  )
}

//export the component
export default SocialMedia