import React from 'react';

interface LeftSideContainerProps {
  children: React.ReactNode;
}

const LeftSideContainer: React.FC<LeftSideContainerProps> = ({ children }) => {
  return (
    <section className="relative w-full lg:w-1/2  max-h-screen overflow-scroll items-center flex flex-col">
      {children}
    </section>
  );
};

export default LeftSideContainer;
