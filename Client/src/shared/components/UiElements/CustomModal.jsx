import React from 'react';

import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Box from '@material-ui/core/Box';
import { ReactComponent as Svg } from '../../../icons/spinner.svg';

import {
  modal__box,
  modal__header,
  modal__form,
  modal__footer,
  modal__map,
  modal__spinner,
} from './CustomModal.module.scss';

const CustomModal = props => {
  if (props.spinner) {
    return (
      <Modal open={true}>
        <div className={modal__spinner}>
          <Svg />
        </div>
      </Modal>
    );
  }

  const renderBox = props.map ? (
    <Box width="75%" className={modal__box}>
      <div className={modal__header}>
        <Typography id="modal-modal-title" variant="h5" component="h6">
          {props.header}
        </Typography>
      </div>
      <form
        onSubmit={props.onSubmit ? props.onSubmit : e => e.preventDefault()}
        className={`${modal__form} ${modal__map}`}
      >
        {props.children}
        <footer className={modal__footer}>{props.footer}</footer>
      </form>
    </Box>
  ) : (
    <Box width="50%" className={modal__box}>
      <div className={modal__header}>
        <Typography id="modal-modal-title" variant="h5" component="h6">
          {props.header}
        </Typography>
      </div>
      <form
        onSubmit={props.onSubmit ? props.onSubmit : e => e.preventDefault()}
        className={`${modal__form}`}
      >
        {props.children}
        <footer className={modal__footer}>{props.footer}</footer>
      </form>
    </Box>
  );

  return (
    <Modal
      open={props.open}
      onClose={props.onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      {renderBox}
    </Modal>
  );
};

export default CustomModal;
