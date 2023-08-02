import { render, screen, waitFor } from '@testing-library/react'
import HomePage from '../../pages/home'
import '@testing-library/jest-dom'

describe('HomePage', () => { 
  it('renders company name', async () => {
    render(<HomePage />)
    
    // waitFor is needed to handle the dynamic import of components.
    const title = await waitFor(() => screen.getByText(/Sustainable Progress and Equality Collective/));
    expect(title).toBeInTheDocument();
  })
})