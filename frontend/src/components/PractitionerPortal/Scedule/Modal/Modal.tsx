import { Typography } from 'components/common/Typography';
import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
  title?: string;
}

export const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  title,
  children,
}) => {
  function escHandler(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      onClose();
    }
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('keydown', escHandler);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('keydown', escHandler);
      }
    };
  }, []);
  if (typeof document !== 'undefined') {
    return createPortal(
      <div
        className={`fixed inset-0 z-10 ${open ? '' : 'pointer-events-none'}`}
      >
        {/* backdrop */}
        <div
          className={`fixed inset-0 bg-greyScaleMainBlack ${
            open ? 'opacity-50' : 'pointer-events-none opacity-0'
          } `}
          onClick={onClose}
        />

        {/* content */}
        <div
          className={`fixed right-0 h-full bg-white shadow-lg w-full max-w-screen-sm pl-9 pt-6 pb-10 pr-12 ${
            open ? 'opacity-100' : 'pointer-events-none opacity-0'
          } transition-opacity duration-300 ease-in-out`}
        >
          <div>
            <Typography type={'h3'} children={title} />
          </div>
          {children}
        </div>
      </div>,
      document.querySelector('#modal-root') as Element,
    );
  } else {
    return null;
  }
};
