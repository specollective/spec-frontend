// Global Jest setup, loaded via `setupFilesAfterEnv` in jest.config.js.
import '@testing-library/jest-dom'
import { toHaveNoViolations } from 'jest-axe'
import React from 'react'

// Registers the `toHaveNoViolations` matcher for jest-axe accessibility tests.
expect.extend(toHaveNoViolations)

// Mock next-i18next so components that call useTranslation/Trans render in
// jsdom without an i18n provider. `t` echoes the key back (good enough for
// smoke + accessibility assertions); returnObjects yields an empty array so
// components that map over lists render without crashing.
jest.mock('next-i18next/pages', () => ({
  useTranslation: () => ({
    t: (key, opts) => (opts && opts.returnObjects ? [] : key),
    i18n: { language: 'en', changeLanguage: () => Promise.resolve() },
    ready: true,
  }),
  Trans: ({ i18nKey, children }) => children ?? i18nKey ?? null,
  appWithTranslation: (Component) => Component,
}))

// Mock the router so components using useRouter (e.g. LanguageSwitcher) render
// outside Next's router context.
jest.mock('next/router', () => ({
  useRouter: () => ({
    pathname: '/',
    asPath: '/',
    route: '/',
    query: {},
    locale: 'en',
    locales: ['en', 'es'],
    defaultLocale: 'en',
    push: jest.fn(() => Promise.resolve(true)),
    replace: jest.fn(() => Promise.resolve(true)),
    prefetch: jest.fn(() => Promise.resolve()),
  }),
}))
