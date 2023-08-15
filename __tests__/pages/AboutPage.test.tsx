//create smoke test for aboutPage to make sure it renders

import React from 'react';
import { render, screen } from '@testing-library/react';
import AboutPage from '../../pages/aboutPage';
import '@testing-library/jest-dom';

describe('AboutPage', () => {
  it('renders company name', () => {
    render(<AboutPage />);
    const title = screen.getByText(
      /About Page/
    );
    expect(title).toBeInTheDocument();
  });

});