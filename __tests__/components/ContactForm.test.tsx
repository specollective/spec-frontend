import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import ContactForm from '../../components/ContactForm'
import '@testing-library/jest-dom'

describe('ContactForm', () => {
  beforeEach(() => {
    render(<ContactForm />)
  })

  it('renders component', () => {
    const contactForm = screen.getByRole('form')

    expect(contactForm).toBeInTheDocument()
  })

  describe('validations', () => {
    it('displays validation message on form submit', async () => {
      const submitButton = screen.getByRole('button', { name: 'Submit' })

      fireEvent.click(submitButton)

      await waitFor(() => {
        expect(screen.getByText('Enter email address')).toBeInTheDocument()
      })
    })

    xit('displays validation message for name field', async () => {
      render(<ContactForm />)

      const nameInput = screen.getByLabelText('Name')
      const submitButton = screen.getByRole('button', { name: 'Submit' })

      fireEvent.change(nameInput, { target: { value: 'My full name' } })
    })
  })

  xit('makes http request on submit', () => {})

  xit('handles error returned from API', () => {})
})
