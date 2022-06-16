import React from 'react';
import { ReactComponent as EllipseTop } from 'assets/images/ellipse-11.svg';
import { ReactComponent as EllipseBottom } from 'assets/images/ellipse-12.svg';
import { ReactComponent as EllipseRight } from 'assets/images/ellipse-big.svg';
import { ReactComponent as Ellipse9 } from 'assets/images/ellipse-9.svg';
import { ReactComponent as Ellipse10 } from 'assets/images/ellipse-10.svg';
import { ReactComponent as Ellipse13 } from 'assets/images/ellipse-13.svg';
import { ReactComponent as Ellipse14 } from 'assets/images/ellipse-14.svg';

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
      <div className=" absolute top-0 left-[82px]">
        <EllipseTop />
      </div>
      <div className=" absolute top-[22px] right-0">
        <EllipseRight />
      </div>
      <div className=" absolute top-[130px] right-[161px]">
        <Ellipse9 />
      </div>
      <div className=" absolute top-[159px] right-[134px]">
        <Ellipse10 />
      </div>

      <div className=" absolute left-[331px] top-[935.52px]">
        <Ellipse13 />
      </div>
      <div className=" absolute left-[342px] top-[967.7px]">
        <Ellipse14 />
      </div>
      <div className="absolute top-[921px] left-[378px]">
        <EllipseBottom />
      </div>
      <div className="absolute top-[343px] left-1/2 ml-[-226.5px]">
        {children}
      </div>
    </section>
  );
};
