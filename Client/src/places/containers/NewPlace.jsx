import React, { useCallback, useReducer } from 'react';

import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';

import Input from '../../shared/components/FormElements/Input';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from '../../shared/util/validators';

import { placeForm } from './NewPlace.module.scss';

const formReducer = (state, action) => {
  switch (action.type) {
    case 'INPUT_CHANGE':
      let formIsValid = true;
      for (let inputId in state.inputs) {
        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: { value: action.value, isValid: action.isValid },
        },
        isValid: formIsValid,
      };
    default:
      return state;
  }
};

const NewPlace = () => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: {
      title: {
        value: '',
        isValid: false,
      },
      description: {
        value: '',
        isValid: false,
      },
    },
    isValid: false,
  });

  const inputHandler = useCallback((id, value, isValid) => {
    dispatch({ type: 'INPUT_CHANGE', value, isValid, inputId: id });
  }, []);

  console.log(formState.isValid);

  return (
    <form className={placeForm}>
      <FormControl>
        <Input
          id="title"
          elementType="input"
          onInput={inputHandler}
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please Enter a valid title"
          label="Title"
        />
        <Input
          id="description"
          elementType="input"
          onInput={inputHandler}
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please Enter a valid description (at least 5 characters)"
          label="Description"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={!formState.isValid}
        >
          Submit
        </Button>
      </FormControl>
    </form>
  );
};

export default NewPlace;
