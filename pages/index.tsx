import Head from "next/head";
import Image from "next/image";
import Navbar from "./Navbar";
import GetInvolved from "./GetInvolved";

export default function Home() {
  return (
    <>
      <Navbar />
      <Head>
        <title>Sustainable Progress and Equality Collective</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="justify-content m-auto flex min-h-screen items-center px-10 pt-10 md:w-2/3 2xl:w-1/2">
        <div className="w-full">
          <header className="pb-10 lg:flex lg:items-center">
            <Image
              className="m-auto text-left lg:m-0 lg:inline"
              src="/spec-logo.svg"
              alt="spec-logo"
              width={120}
              height={120}
              priority
            />
            <h1 className="block text-center font-montserrat text-4xl font-medium lg:text-left xl:text-3xl">
              Sustainable Progress and Equality Collective
            </h1>
          </header>

          <section className="mb-4">
            <h2 className="mb-4 font-dmserif text-4xl font-normal text-spec-black">
              We are a radically transparent learning organization advancing{" "}
              <span className="text-spec-lightRed">sustainability</span> and{" "}
              <span className="text-spec-lightRed">social equity</span>{" "}
              through...
            </h2>
          </section>

          <section className="py-4 font-dmserif">
            <h3 className="mb-2 font-dmserif text-3xl font-normal text-spec-turquiose">
              Community-engaged research
            </h3>
            <p className="font-montserrat text-2xl">
              We engage communities through <b>action-oriented research</b> to
              develop <b>community-driven solutions</b> to local and global
              problems.
            </p>
          </section>

          <section className="py-4 font-dmserif">
            <h3 className="mb-2 font-dmserif text-3xl font-normal text-spec-turquiose">
              Professional service learning
            </h3>
            <p className="font-montserrat text-2xl">
              We provide <b>paid work experiences</b> that help people learn
              through service, contributing to{" "}
              <b>real-world social impact projects</b>.
            </p>
          </section>

          <section className="mb-10 py-4">
            <h3 className="mb-2 font-dmserif text-3xl font-normal text-spec-turquiose">
              Open collaborative innovation
            </h3>
            <p className="font-montserrat text-2xl">
              We are committed to <b>open source and open access</b> and
              operating transparently to foster{" "}
              <b>inclusion, accessibility, and innovation</b>.
            </p>
          </section>

          <section className="bg-spec-yellow py-10 px-4">
            <div className="grid grid-cols-1 items-center gap-0 lg:gap-6 xl:grid-cols-2">
              <div className="col-span-1 text-center font-montserrat text-2xl xl:text-center">
                Want to get involved?
              </div>

              <div className="gap-30 col-span-1 grid grid-cols-1 lg:grid-cols-2">
                <div className="py-2 text-center">
                  <a
                    href="https://docs.specollective.org"
                    target="_blank"
                    rel="noreferrer"
                    className="mr-1 p-2 font-montserrat text-xl font-medium underline"
                  >
                    DOCUMENTATION
                  </a>
                </div>

                <div className="text-center">
                  <a
                    href="https://opencollective.com/spec"
                    className="m-auto block w-3/4 rounded-br-lg rounded-tl-lg bg-spec-turquiose p-2 text-center font-montserrat text-2xl font-medium text-white"
                  >
                    DONATE
                  </a>
                </div>
              </div>
            </div>
          </section>

          <footer className="grid pt-10 text-left md:grid-cols-2 md:text-center">
            <section className="block pb-4">
              Email us:
              <a
                className="pl-2 underline"
                href="mailto:info@specollective.org"
              >
                info@specollective.org
              </a>
            </section>
            <section className="block pb-4">
              Follow Us:
              <a
                href="https://github.com/specollective"
                target="_blank"
                rel="noreferrer"
                className="pl-2"
              >
                <Image
                  className="inline"
                  src="/github-logo.svg"
                  alt="github-logo"
                  width={25}
                  height={25}
                  priority
                />
              </a>
              <a
                href="https://www.linkedin.com/company/specollective"
                target="_blank"
                rel="noreferrer"
                className="pl-2"
              >
                <Image
                  className="inline"
                  src="/linkedin-logo.svg"
                  alt="linkedin-logo"
                  width={25}
                  height={25}
                  priority
                />
              </a>
              <a
                href="https://twitter.com/specollective"
                target="_blank"
                rel="noreferrer"
                className="pl-2"
              >
                <Image
                  className="inline"
                  src="/twitter-logo.svg"
                  alt="twitter-logo"
                  width={25}
                  height={25}
                  priority
                />
              </a>
            </section>
          </footer>
        </div>
      </main>
    </>
  );
}
