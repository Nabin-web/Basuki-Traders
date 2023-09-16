/**
 *
 * Dialog
 *
 */

import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import './dialog.css';
import { FaTimes } from 'react-icons/fa';
import Modal from './Modal';

function useComponentVisible(initialIsVisible, setShowList) {
  const [isComponentVisible, setIsComponentVisible] = useState(
    initialIsVisible,
  );
  const ref = useRef(null);

  const handleClickOutside = event => {
    // uses ref to check if outside of Div is clicked
    if (ref.current && !ref.current.contains(event.target)) {
      setIsComponentVisible(false);
      if (setShowList === undefined) {
        console.log('!! onClose function not passed to dialog component. !!');
      } else {
        setShowList(false);
      }
    }
  };

  const handleHideDropdown = event => {
    if (event.key === 'Escape') {
      setShowList(false);
    }
  };
  useEffect(() => {
    document.addEventListener('keydown', handleHideDropdown, true);
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('keydown', handleHideDropdown, true);
      document.removeEventListener('click', handleClickOutside, true);
    };
  });

  return { ref, isComponentVisible, setIsComponentVisible };
}

const Dialog = ({
  open,
  onClose,
  className,
  title,
  body,
  actions,
  preventClose,
}) => {
  const {
    ref,
    isComponentVisible,
    setIsComponentVisible,
  } = useComponentVisible(open, onClose);

  const children = (
    <>
      <div
        className="w-screen h-screen z-40 fixed top-0 left-0 bottom-0 right-0 bg-black/25"
        onClick={preventClose ? null : onClose}
      />
      <div
        className={`fixed z-50 max-h-screen overflow-auto shadow-lg rounded-lg bg-white slide-dialog ${
          className && className !== '' ? className : 'max-w-xl'
        } `}
      >
        {title !== undefined && (
          <div className="flex items-center justify-between px-4 py-2 bg-primary rounded-tl-lg rounded-tr-lg">
            <h3 className="m-0 text-base text-white mr-2">{title}</h3>
            <button
              type="button"
              className="text-white opacity-75 hover:opacity-100 text-xl"
              onClick={onClose}
            >
              <FaTimes />
            </button>
          </div>
        )}
        {body !== undefined && <div className="p-4">{body}</div>}
        {actions !== undefined && (
          <div className="border-t p-2 flex justify-end">{actions}</div>
        )}
      </div>
    </>
  );

  return open ? <Modal>{children}</Modal> : null;
};

Dialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  className: PropTypes.string,
  title: PropTypes.any,
  body: PropTypes.any,
  actions: PropTypes.any,
};

export default Dialog;
