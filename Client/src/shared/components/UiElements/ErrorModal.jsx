import React from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CustomModal from './CustomModal';

import { error } from './ErrorModal.module.scss';

const ErrorModal = props => {
  return (
    <CustomModal onClose={props.clearError} open={true}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          textAlign: 'center',
        }}
      >
        <Box mt={2}>
          <p className={error}>{props.error}</p>
        </Box>
        <Box sx={{ marginLeft: 'auto' }} mt={2}>
          <Button
            onClick={() => props.clearError()}
            variant="contained"
            color="primary"
          >
            Close
          </Button>
        </Box>
      </Box>
    </CustomModal>
  );
};

export default ErrorModal;
