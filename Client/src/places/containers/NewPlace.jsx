import React, { useCallback, useReducer } from 'react';

import FormControl from '@material-ui/core/FormControl';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

import Input from '../../shared/components/FormElements/Input';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from '../../shared/util/validators';

import { input, placeForm } from './NewPlace.module.scss';

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

  const submitHandler = e => {
    e.preventDefault();
    console.log(formState.inputs);
  };

  return (
    <form onSubmit={submitHandler} className={placeForm}>
      <FormControl>
        <Box mb={2}>
          <Input
            id="title"
            onInput={inputHandler}
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid title."
            label="Title"
            required
            className={input}
          />
        </Box>
        <Box mb={2}>
          <Input
            id="description"
            onInput={inputHandler}
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid description (at least 5 characters)."
            label="Description"
            multiline
            minRows="5"
            required
            className={input}
          />
        </Box>
        <Box mb={2}>
          <Input
            id="adress"
            onInput={inputHandler}
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid adress."
            label="Adress"
            required
            className={input}
          />
        </Box>
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
