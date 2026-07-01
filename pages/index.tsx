import React from 'react'
import type { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/pages/serverSideTranslations'
import Layout from '../components/Layout'
import LandingHero from '../components/landing/LandingHero'
import Community from '../components/landing/Community'
import Story from '../components/landing/Story'
import Impact from '../components/landing/Impact'
import Approach from '../components/landing/Approach'
import Partnerships from '../components/landing/Partnerships'
import Connect from '../components/landing/Connect'
import nextI18NextConfig from '../next-i18next.config'

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(
        locale ?? nextI18NextConfig.i18n.defaultLocale,
        ['common', 'landing'],
        nextI18NextConfig
      )),
    },
  }
}

export default function Home() {
  return (
    <Layout>
      <LandingHero />
      <Story />
      <Approach />
      <Community />
      <Impact />
      <Partnerships />
      <Connect />
    </Layout>
  )
}
