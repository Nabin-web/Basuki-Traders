import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';
import Dialog from '../Dialog/index';

// const Transition = React.forwardRef(function Transition(props, ref) {
//   <Slide direction="up" ref={ref} {...props} />;
// });

export default function DeleteDialog(props) {
  const handleClose = () => {
    props.doClose();
  };

  const handleDialogDelete = () => {
    props.doDelete();
  };

  return (
    <div>
      <Dialog
        className="w-5/6 sm:w-96"
        open={props.open}
        onClose={handleClose}
        title={props.title ? props.title : ''}
        body={
          <div className="flex items-center p-2">
            <FaExclamationTriangle className="text-red-500 mr-4 text-5xl" />
            <p>
              {props.body
                ? props.body
                : `  Are you sure you want to delete this file? You can't undo this
                action.
                `}
            </p>
          </div>
        }
        actions={
          <div className="m-4 w-full flex justify-between px-1">
            <button
              type="button"
              className="-ml-1 bg-gray-100 w-1/2 border rounded px-3 py-2 text-sm leading-none font-bold hover:bg-gray-300"
              onClick={handleClose}
            >
              {props.closeButton ? props.closeButton : `Don't Delete`}
            </button>
            <button
              type="button"
              className="-mr-1 bg-red-100 w-1/2 text-red-600 px-3 py-2 text-sm font-bold leading-none border border-red-300 hover:bg-red-600 hover:text-white rounded"
              onClick={handleDialogDelete}
            >
              {props.confirmButton ? props.confirmButton : `Delete`}
            </button>
          </div>
        }
      />
    </div>
  );
}
