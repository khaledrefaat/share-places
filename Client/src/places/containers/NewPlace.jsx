import React from 'react';

import Input from '../../shared/components/FormElements/Input';
import { VALIDATOR_REQUIRE } from '../../shared/util/validators';

import { placeForm } from './NewPlace.module.scss';

const NewPlace = () => {
  return (
    <form className={placeForm}>
      <Input elementType="input" validators={[VALIDATOR_REQUIRE()]} />
    </form>
  );
};

export default NewPlace;
