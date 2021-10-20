import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';

import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from '../../shared/util/validators';
import Input from '../../shared/components/FormElements/Input';
import { useForm } from '../../shared/hooks/form-hook';
import CustomModal from '../../shared/components/UiElements/CustomModal';
import ErrorModal from '../../shared/components/UiElements/ErrorModal';
import { useHttpClient } from '../../shared/hooks/http-hook';

const useStyles = makeStyles({
  margin: {
    marginRight: '10px',
  },
});

const UpdatePlace = () => {
  const { placeId } = useParams();
  const classes = useStyles();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [place, setPlace] = useState();
  const history = useHistory();
  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: '',
        isValid: false,
      },
      description: {
        value: '',
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const res = await sendRequest(
          `http://localhost:5000/api/places/${placeId}`
        );
        setFormData(
          {
            title: {
              value: res.place.title,
              isValid: true,
            },
            description: {
              value: res.place.description,
              isValid: true,
            },
          },
          true
        );
        setPlace(res.place);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPlace();
  }, [sendRequest, placeId, setFormData]);

  const updatePlace = async () => {
    try {
      await sendRequest(
        `http://localhost:5000/api/places/${placeId}`,
        'PATCH',
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
        }),
        { 'Content-Type': 'application/json' }
      );
      // you can also use auth.userid
      history.push(`/${place.creator}/places`);
    } catch (err) {
      console.log(err);
    }
  };

  if (isLoading) return <CustomModal spinner={true} />;

  if (!place && !error)
    return (
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="flex-start"
        style={{ minHeight: '100vh' }}
      >
        <h3>Could'nt find this place</h3>
      </Grid>
    );

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="flex-start"
      style={{ minHeight: '100vh' }}
    >
      {error ? <ErrorModal error={error} clearError={clearError} /> : null}
      {!isLoading && place && (
        <form>
          <FormControl>
            <Box width={500} mb={2}>
              <Input
                id="title"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a valid title."
                label="Title"
                initialValue={place.title}
                initialValid={true}
                required
                onInput={inputHandler}
                fullWidth
              />
            </Box>
            <Box width={500} mb={2}>
              <Input
                id="description"
                validators={[VALIDATOR_MINLENGTH(5)]}
                errorText="Please enter a valid description (at least 5 characters)."
                label="Description"
                multiline
                minRows="5"
                initialValue={place.description}
                initialValid={true}
                required
                onInput={inputHandler}
                fullWidth
              />
            </Box>
            <Box>
              <Button
                className={classes.margin}
                type="submit"
                variant="contained"
                color="primary"
                disabled={!formState.isValid}
                onClick={updatePlace}
              >
                Update Place
              </Button>
            </Box>
          </FormControl>
        </form>
      )}
    </Grid>
  );
};

export default UpdatePlace;
