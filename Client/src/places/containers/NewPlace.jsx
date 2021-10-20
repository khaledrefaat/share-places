import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import FormControl from '@material-ui/core/FormControl';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { useForm } from '../../shared/hooks/form-hook';

import Input from '../../shared/components/FormElements/Input';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from '../../shared/util/validators';

import { input, placeForm } from './NewPlace.module.scss';
import { useHttpClient } from '../../shared/hooks/http-hook';
import CustomModal from '../../shared/components/UiElements/CustomModal';
import { AuthContext } from '../../shared/context/auth-context';
import ErrorModal from '../../shared/components/UiElements/ErrorModal';

const NewPlace = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      title: {
        value: '',
        isValid: false,
      },
      description: {
        value: '',
        isValid: false,
      },
      adress: {
        value: '',
        isValid: false,
      },
    },
    false
  );

  const history = useHistory();

  const submitHandler = async e => {
    e.preventDefault();
    try {
      await sendRequest(
        'http://localhost:5000/api/places',
        'POST',
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
          adress: formState.inputs.adress.value,
          creator: auth.userId,
        }),
        { 'Content-Type': 'application/json' }
      );
      history.push('/');
    } catch (err) {
      console.log(err);
    }
  };

  if (isLoading) return <CustomModal spinner={true} />;

  return (
    <>
      {error ? <ErrorModal error={error} clearError={clearError} /> : null}
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
    </>
  );
};

export default NewPlace;
