import React from 'react';
import { useTranslation } from 'next-i18next/pages';
import AppHead from './AppHead';
import Navbar from './Navbar';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { t } = useTranslation('common');
  return (
    <>
      <AppHead />
      <a href="#main-content" className="skip-link">
        {t('skipToContent')}
      </a>
      <Navbar />
      <main id="main-content">
        {children}
      </main>
      <Footer />
    </>
  );
}
