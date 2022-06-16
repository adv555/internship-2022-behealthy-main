import React from 'react';

interface LayoutProps {
  children?: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <section className="min-h-screen w-screen mx-auto">
      <div className="flex justify-center h-full w-full mx-auto ">
        {children}
      </div>
    </section>
  );
};
