import React from 'react';
import Dialog from './Dialog.jsx';

const withDialog = Component => ({
  modalTitle,
  modalText,
  isVisible,
  setVisible,
  clickedItemId,
  onConfirm,
  ...props
}) => (
  <div>
    <Component {...props} />
    <Dialog
      title={modalTitle}
      text={modalText}
      isVisible={isVisible}
      onCancel={() => setVisible(false)}
      onConfirm={() => onConfirm(clickedItemId)}
    />
  </div>
);

export default withDialog;
