import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <header style={{ background: '#f5f5f5', padding: '1rem' }}>
        <h1>Productivity Stopwatch</h1>
      </header>
      {children}
      <footer style={{ background: '#f5f5f5', padding: '1rem', textAlign: 'center' }}>
        <p>&copy; {new Date().getFullYear()} My App. All rights reserved.</p>
      </footer>
    </>
  );
};

export default Layout;