import React from 'react'
import Layout from '../components/Layout'
import LandingHero from '../components/landing/LandingHero'
import Community from '../components/landing/Community'
import Story from '../components/landing/Story'
import Impact from '../components/landing/Impact'
import Approach from '../components/landing/Approach'
import Partnerships from '../components/landing/Partnerships'
import Connect from '../components/landing/Connect'

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
