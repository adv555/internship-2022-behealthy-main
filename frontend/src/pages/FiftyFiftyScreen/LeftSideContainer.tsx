import React from 'react';

interface LeftSideContainerProps {
  children: React.ReactNode;
}

export const LeftSideContainer: React.FC<LeftSideContainerProps> = ({
  children,
}) => {
  return (
    <section className="relative w-full lg:w-1/2  max-h-screen overflow-auto items-center flex flex-col">
      <div className="flex justify-center">{children}</div>
    </section>
  );
};
