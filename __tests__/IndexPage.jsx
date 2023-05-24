import { render, screen } from '@testing-library/react'
import IndexPage from '../pages/index'
import '@testing-library/jest-dom'

describe('IndexPage', () => { 
  it('renders company name', () => {
    render(<IndexPage />)

    const title = screen.getByText(/Sustainable Progress and Equality Collective/)

    expect(title).toBeInTheDocument()
  })

  it('renders core activities', () => {
    render(<IndexPage />)

    const coreActivies = [
      'Community-engaged research',
      'Professional service learning',
      'Open collaborative innovation'
    ]

    coreActivies.forEach((activity) => {
      const activityElement = screen.getByText(activity)
      expect(activityElement).toBeInTheDocument()
    })
  })

  it('renders component with mobile tailwind classes', () => {
    render(<IndexPage />)

    const mainSection = screen.getByRole('main')

    expect(mainSection).toHaveClass('md:w-2/3')
  })
})