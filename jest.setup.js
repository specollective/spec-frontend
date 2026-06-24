// Global Jest setup, loaded via `setupFilesAfterEnv` in jest.config.js.
import '@testing-library/jest-dom'
import { toHaveNoViolations } from 'jest-axe'

// Registers the `toHaveNoViolations` matcher for jest-axe accessibility tests.
expect.extend(toHaveNoViolations)
