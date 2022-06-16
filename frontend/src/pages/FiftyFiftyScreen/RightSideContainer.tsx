import React from 'react';

interface RightSideContainerProps {
  children: React.ReactNode;
}

export const RightSideContainer: React.FC<RightSideContainerProps> = ({
  children,
}) => {
  return (
    <section
      className="w-1/2 relative mx-auto min-h-screen max-h-screen
     bg-primaryBlue overflow-hidden hidden lg:block"
    >
      {children}
    </section>
  );
};
