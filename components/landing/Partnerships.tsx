import React from 'react'
import { Heading1, Heading3 } from '../Typography/Heading'
import { Paragraph1, Paragraph2 } from '../Typography/Paragraph'
import { Eyebrow } from '../Typography/Eyebrow'

const partners = [
  {
    name: 'RAND Center to Advance Racial Equity Policy',
    url: 'https://carep.specollective.org/',
    description:
      'RAND launched CAREP in 2020 to develop approaches and solutions that build racial equity in systems and policies. SPEC partnered with CAREP on a two-year digital education initiative, producing microcredentials, game-based learning tools, a digital expressions gallery, and the Journal of Engaged Research.',
  },
  {
    name: 'BuildJustly',
    url: 'https://buildjustly.org/',
    description:
      'A 501(c)(3) nonprofit working to empower the building of our country\u2019s full economic potential through equitable technology. BuildJustly develops tools and research to advance digital inclusion and close the gap for the 1 in 3 U.S. households with no connected devices or low digital engagement.',
  },
  {
    name: 'Open Source Medical Supplies',
    url: 'https://opensourcemedicalsupplies.org/',
    description:
      'A nonprofit that empowers people around the world to keep their communities safe through reliable open-source designs, manufacturing guides, and shared knowledge for medical supplies.',
  },
  {
    name: 'Public Invention',
    url: 'https://www.pubinv.org/',
    description:
      'A nonprofit that invents in the public, for the public — building humanitarian open-source hardware including projects like the NASA-MCOG ceramic oxygen generator to help save lives in low-income countries.',
  },
]

export default function Partnerships() {
  return (
    <section
      aria-labelledby="partnerships-heading"
      className="py-16 md:py-24 px-6 md:px-12 lg:px-16 xl:px-20"
    >
      <div className="max-w-screen-xl mx-auto">
        <Eyebrow className="mb-4">PARTNERSHIPS</Eyebrow>
        <Heading1 as="h2" className="max-w-screen-md">
          <span id="partnerships-heading">
            Organizations we have worked alongside
          </span>
        </Heading1>
        <Paragraph1 className="mt-6 max-w-screen-md text-spec-gray">
          SPEC believes in open collaboration across organizations. These
          partnerships have shaped our work and expanded what we can offer
          our community.
        </Paragraph1>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="border-l-4 border-spec-turquoise pl-6"
            >
              <Heading3 as="h3" className="mb-3">
                <a
                  href={partner.url}
                  className="text-spec-turquoise underline hover:no-underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {partner.name}
                </a>
              </Heading3>
              <Paragraph2 className="text-spec-gray">
                {partner.description}
              </Paragraph2>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
