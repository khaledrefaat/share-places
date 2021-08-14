import React from 'react';
import ReactDOM from 'react-dom';

import {
  modal,
  modal__content,
  modal__header,
  modal__form,
  modal__footer,
} from './Modal.module.scss';

const ModalOverLay = props => {
  console.log(props);
  const content = (
    <div className={`modal ${props.className} ${modal}`} style={props.style}>
      <div className={`${modal__content} modal-content`}>
        <header
          className={`modal-header ${modal__header} ${props.headerClass}`}
        >
          <h2 className="modal-title">{props.header}</h2>
        </header>
        <form
          onSubmit={props.onSubmit ? props.onSubmit : e => e.preventDefault()}
        >
          <div className={`${modal__form} ${props.contentClass}`}>
            {props.children}
          </div>
          <footer className={`${modal__footer} ${props.footerClass}`}>
            {props.footer}
          </footer>
        </form>
      </div>
    </div>
  );

  return ReactDOM.createPortal(content, document.getElementById('modal-hook'));
};

const Modal = props => {
  return <ModalOverLay {...props} />;
};

export default Modal;
