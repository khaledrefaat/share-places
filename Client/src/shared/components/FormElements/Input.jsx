import React, { useReducer, useEffect } from 'react';

import TextField from '@material-ui/core/TextField';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import { validate } from '../../util/validators';

import { input } from './Input.module.scss';

const inputReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE':
      return {
        ...state,
        value: action.value,
        isValid: validate(action.value, action.validators),
      };
    case 'TOUCH':
      return { ...state, isTouched: true };
    default:
      return state;
  }
};

const Input = props => {
  const { elementType, validators, id, onInput, errorText, ...restProps } =
    props;

  const [inputState, dispatch] = useReducer(inputReducer, {
    value: '',
    isValid: false,
    isTouched: false,
  });

  const changeHandler = e =>
    dispatch({ type: 'CHANGE', value: e.target.value, validators });

  const onTouch = () => dispatch({ type: 'TOUCH' });

  const ErrorText = withStyles({
    root: {
      color: '#f44336',
    },
  })(Typography);

  const { value, isValid } = inputState;

  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, onInput, value, isValid]);

  const element =
    elementType === 'input' ? (
      <>
        <TextField
          className={input}
          width="300"
          value={inputState.value}
          onChange={changeHandler}
          error={!inputState.isValid && inputState.isTouched && true}
          onBlur={onTouch}
          {...restProps}
        />
        {!inputState.isValid && inputState.isTouched && (
          <ErrorText variant="body1">{errorText}</ErrorText>
        )}
      </>
    ) : (
      <>
        <TextareaAutosize
          className={input}
          value={inputState.value}
          onChange={changeHandler}
          error={!inputState.isValid && inputState.isTouched && true}
          onBlur={onTouch}
          {...restProps}
        />
        {!inputState.isValid && inputState.isTouched && (
          <ErrorText variant="body1">{errorText}</ErrorText>
        )}
      </>
    );

  return element;
};

export default Input;
