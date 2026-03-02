import SocialMedia from './SocialMedia'
import Button from './Button'

export default function Footer() {
  return (
    <footer className="bg-spec-turquoise py-16 px-6">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-16 xl:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="flex flex-col items-center lg:items-start gap-8">
            <Button
              href="https://opencollective.com/spec"
              variant="secondary"
              size="md"
            >
              Donate to SPEC
            </Button>

            <div className="lg:hidden">
              <SocialMedia />
            </div>

            <p className="font-montserrat text-center lg:text-left text-sm md:text-base">
              © 2023 Sustainable Progress and Equality Collective
            </p>
          </div>

          <div className="hidden lg:flex lg:flex-col lg:items-end gap-6">
            <nav className="flex flex-col items-end gap-3" aria-label="Footer navigation">
              <a
                href="https://medium.com/journal-of-engaged-research"
                target="_blank"
                rel="noreferrer"
                className="font-montserrat text-base hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-spec-turquoise"
              >
                Journal of Engaged Research
                <span className="sr-only"> (opens in new tab)</span>
              </a>
              <a
                href="https://medium.com/journal-of-engaged-research/expressions/home"
                target="_blank"
                rel="noreferrer"
                className="font-montserrat text-base hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-spec-turquoise"
              >
                Digital Art Gallery
                <span className="sr-only"> (opens in new tab)</span>
              </a>
            </nav>

            <div className="mt-4">
              <SocialMedia />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}


