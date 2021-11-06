import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import FormControl from '@material-ui/core/FormControl';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { useForm } from '../../shared/hooks/form-hook';

import Input from '../../shared/components/FormElements/Input';
import ImageUpload from '../../shared/components/UiElements/ImageUpload';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from '../../shared/util/validators';

import { useHttpClient } from '../../shared/hooks/http-hook';
import CustomModal from '../../shared/components/UiElements/CustomModal';
import { AuthContext } from '../../shared/context/auth-context';
import ErrorModal from '../../shared/components/UiElements/ErrorModal';

import { input, placeForm, button, container } from './NewPlace.module.scss';

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

      image: {
        value: null,
        isValid: false,
      },
    },
    false
  );

  const history = useHistory();

  const submitHandler = async e => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', formState.inputs.title.value);
      formData.append('description', formState.inputs.description.value);
      formData.append('adress', formState.inputs.adress.value);
      formData.append('image', formState.inputs.image.value);

      await sendRequest('http://localhost:5000/api/places', 'POST', formData, {
        Authorization: 'Bearer ' + auth.token,
      });
      history.push('/');
    } catch (err) {
      console.log(err);
    }
  };

  if (isLoading) return <CustomModal spinner={true} />;

  return (
    <>
      {error ? <ErrorModal error={error} clearError={clearError} /> : null}
      <div className={container}>
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
            <Box mb={2}>
              <ImageUpload id="image" onInput={inputHandler} center />
            </Box>
            <Box>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={!formState.isValid}
                className={button}
              >
                Submit
              </Button>
            </Box>
          </FormControl>
        </form>
      </div>
    </>
  );
};

export default NewPlace;
