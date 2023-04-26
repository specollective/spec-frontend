import Head from "next/head";
import Image from "next/image";
import React from "react";


export default function Home() {
  return (
    <>
      <Head>
        <title>Sustainable Progress and Equality Collective</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen items-center justify-content px-10 pt-10 md:w-2/3 2xl:w-1/2 m-auto">
        <div className="w-full">
          <header className="lg:flex lg:items-center pb-10">
            <Image
              className="m-auto lg:m-0 lg:inline text-left"
              src="/spec-logo.svg"
              alt="spec-logo"
              width={120}
              height={120}
              priority
            />
            <h1
              className="block text-center lg:text-left text-4xl xl:text-3xl font-medium font-montserrat"
            >
              Sustainable Progress and Equality Collective
            </h1>
          </header>

          <section className="mb-4">
            <h2 className="text-4xl font-normal mb-4 font-dmserif text-spec-black">
              We are a radically transparent learning organization advancing{" "}
              <span className="text-spec-lightRed">sustainability</span> and{" "}
              <span className="text-spec-lightRed">social equity</span>{" "}
              through...
            </h2>
          </section>

          <section className="font-dmserif py-4">
            <h3 className="text-3xl font-normal mb-2 text-spec-turquiose font-dmserif">
              Community-engaged research
            </h3>
            <p className="text-2xl font-montserrat">
              We engage communities through <b>action-oriented research</b> to
              develop <b>community-driven solutions</b> to local and global
              problems.
            </p>
          </section>

          <section className="font-dmserif py-4">
            <h3 className="text-3xl font-normal mb-2 text-spec-turquiose font-dmserif">
              Professional service learning
            </h3>
            <p className="text-2xl font-montserrat">
              We provide <b>paid work experiences</b> that help people learn
              through service, contributing to{" "}
              <b>real-world social impact projects</b>.
            </p>
          </section>

          <section className="py-4 mb-10">
            <h3 className="text-3xl font-normal mb-2 text-spec-turquiose font-dmserif">
              Open collaborative innovation
            </h3>
            <p className="text-2xl font-montserrat">
              We are committed to <b>open source and open access</b> and
              operating transparently to foster{" "}
              <b>inclusion, accessibility, and innovation</b>.
            </p>
          </section>

          <section className="bg-spec-yellow py-10 px-4">
            <div className="grid grid-cols-1 items-center xl:grid-cols-2 gap-0 lg:gap-6">
              <div className="font-montserrat text-2xl text-center col-span-1 xl:text-center">
                Want to get involved?
              </div>

              <div className="grid grid-cols-1 col-span-1 gap-30 lg:grid-cols-2">
                <div className="text-center py-2">
                  <a
                    href="https://docs.specollective.org"
                    target="_blank"
                    rel="noreferrer"
                    className="text-xl font-medium mr-1 underline p-2 font-montserrat"
                  >
                    DOCUMENTATION
                  </a>
                </div>

                <div className="text-center">
                  <a
                    href="https://opencollective.com/spec"
                    className="block bg-spec-turquiose text-center p-2 text-2xl font-medium text-white rounded-br-lg rounded-tl-lg font-montserrat w-3/4 m-auto"
                  >
                    DONATE
                  </a>
                </div>
              </div>
            </div>
          </section>

          <footer className="grid md:grid-cols-2 pt-10 text-left md:text-center">
            <section className="block pb-4">
              Email us:
              <a
                className="underline pl-2"
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
