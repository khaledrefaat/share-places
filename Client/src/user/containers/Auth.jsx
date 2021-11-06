import React, { useState, useContext } from 'react';
import Input from '../../shared/components/FormElements/Input';
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { AuthContext } from '../../shared/context/auth-context';
import CustomModal from '../../shared/components/UiElements/CustomModal';
import ImageUpload from '../../shared/components/UiElements/ImageUpload';

import { useHttpClient } from '../../shared/hooks/http-hook';

import { container, auth, form, btn } from './Auth.module.scss';

const Auth = () => {
  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: '',
        isValid: false,
      },
      password: {
        value: '',
        isValid: false,
      },
    },
    false
  );
  const [isLoginMode, setIsLoginMode] = useState(true);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const authenticate = useContext(AuthContext);

  const submitHandler = async e => {
    e.preventDefault();

    if (isLoginMode) {
      try {
        const res = await sendRequest(
          'http://localhost:5000/api/users/login',
          'POST',
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          {
            'Content-Type': 'application/json',
          }
        );
        authenticate.login(res.userId, res.token);
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        const formData = new FormData();
        formData.append('email', formState.inputs.email.value);
        formData.append('name', formState.inputs.name.value);
        formData.append('password', formState.inputs.password.value);
        formData.append('image', formState.inputs.image.value);

        const res = await sendRequest(
          'http://localhost:5000/api/users/signup',
          'POST',
          formData
        );

        authenticate.login(res.userId, res.token);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const switchModeHandler = () => {
    clearError();
    if (!isLoginMode)
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
          image: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    else
      setFormData(
        {
          ...formState.inputs,
          name: {
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

    setIsLoginMode(previousMode => !previousMode);
  };

  return (
    <>
      <div className={container}>
        {isLoading && <CustomModal spinner={true} />}
        <div className={auth}>
          <form className={form} onSubmit={submitHandler}>
            <FormControl>
              <Box mb={3}>
                <Typography variant="h4" align="center">
                  {isLoginMode ? 'Login' : 'SignUp'}
                </Typography>
              </Box>
              {!isLoginMode && (
                <>
                  <Box mb={2}>
                    <Input
                      id="name"
                      validators={[VALIDATOR_REQUIRE]}
                      errorText="Please Enter A Name!"
                      label="Name"
                      name="name"
                      initialValue={formState.inputs.name.value}
                      initialValid={formState.inputs.name.isValid}
                      required
                      onInput={inputHandler}
                      fullWidth
                    />
                  </Box>
                  <Box mb={2}>
                    <ImageUpload id="image" onInput={inputHandler} center />
                  </Box>
                </>
              )}
              <Box mb={2}>
                <Input
                  id="email"
                  validators={[VALIDATOR_EMAIL()]}
                  errorText="Please Enter A Valid Email!"
                  label="Email"
                  initialValue={formState.inputs.email.value}
                  initialValid={formState.inputs.email.isValid}
                  required
                  onInput={inputHandler}
                  fullWidth
                  name="email"
                />
              </Box>
              <Box mb={2}>
                <Input
                  id="password"
                  validators={[VALIDATOR_MINLENGTH(6)]}
                  errorText="Please Enter A Valid Password At Least 6 Chars!"
                  label="Password"
                  initialValue={formState.inputs.password.value}
                  initialValid={formState.inputs.password.isValid}
                  required
                  onInput={inputHandler}
                  fullWidth
                  type="password"
                  name="password"
                />
              </Box>
              <Button
                className={btn}
                variant="contained"
                color="primary"
                type="submit"
                disabled={!formState.isValid}
              >
                {isLoginMode ? 'Login' : 'Sign Up'}
              </Button>
            </FormControl>
          </form>
          {error ? (
            <Box mt={2}>
              <Typography variant="subtitle1" color="secondary">
                {error}
              </Typography>
            </Box>
          ) : null}
          <Box mt={2} textAlign="center">
            {isLoginMode ? 'Not a member? ' : 'Already a member? '}
            <Button color="secondary" onClick={switchModeHandler}>
              {isLoginMode ? 'Sign Up' : 'Login'}
            </Button>
          </Box>
        </div>
      </div>
    </>
  );
};

export default Auth;
