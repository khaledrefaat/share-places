import React from 'react';

import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

import {
  modal__box,
  modal__header,
  modal__form,
  modal__footer,
} from './CustomModal.module.scss';

const CustomModal = props => {
  return (
    <Modal
      open={props.open}
      onClose={props.onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box width="75%" className={modal__box}>
        <div className={modal__header}>
          <Typography id="modal-modal-title" variant="h5" component="h6">
            {props.header}
          </Typography>
        </div>
        <form
          onSubmit={props.onSubmit ? props.onSubmit : e => e.preventDefault()}
          className={modal__form}
        >
          {props.children}
          <footer className={modal__footer}>
            {props.footer}
            <Button variant="contained" color="primary" onClick={props.onClose}>
              Close
            </Button>
          </footer>
        </form>
      </Box>
    </Modal>
  );
};

export default CustomModal;
