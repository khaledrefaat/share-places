import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';

import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from '../../shared/util/validators';
import DUMMY_PLACES from '../../shared/DummyPlaces';
import Input from '../../shared/components/FormElements/Input';
import { useForm } from '../../shared/hooks/form-hook';

const useStyles = makeStyles({
  margin: {
    marginRight: '10px',
  },
});

const UpdatePlace = () => {
  const { placeId } = useParams();
  const classes = useStyles();

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

  const [isLoading, setIsLoading] = useState(true);

  const identifiedPlace = DUMMY_PLACES.find(({ id }) => id === placeId);
  const { title, description } = identifiedPlace;

  useEffect(() => {
    if (identifiedPlace)
      setFormData(
        {
          title: {
            value: title,
            isValid: true,
          },
          description: {
            value: description,
            isValid: true,
          },
        },
        true
      );
    setIsLoading(false);
  }, [identifiedPlace, setFormData, title, description]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="flex-start"
      style={{ minHeight: '100vh' }}
    >
      <form>
        <FormControl>
          <Box width={500} mb={2}>
            <Input
              id="title"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a valid title."
              label="Title"
              initialValue={formState.inputs.title.value}
              initialValid={formState.inputs.title.isValid}
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
              initialValue={formState.inputs.description.value}
              initialValid={formState.inputs.description.isValid}
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
            >
              Update Place
            </Button>
          </Box>
        </FormControl>
      </form>
    </Grid>
  );
};

export default UpdatePlace;
