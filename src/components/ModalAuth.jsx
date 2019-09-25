/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  Modal,
  TextField,
  Button,
  Card,
  CardHeader,
  CardContent,
  CardActions,
} from '@material-ui/core';
import NumberFormat from 'react-number-format';

const { ipcRenderer } = window;

function NumberFormatPhone(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={values => {
        onChange({
          target: {
            value: values.value,
          },
        });
      }}
      prefix="+"
    />
  );
}

NumberFormatPhone.propTypes = {
  inputRef: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

const FullWidthTextField = styled(TextField)`
  width: 100%;
`;

const CardNoOutline = styled(Card)`
  width: 300px;
  outline: 0;
`;

const ModalContainer = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function ModalAuth() {
  const [open, setOpen] = React.useState(true);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogIn = () => {
    ipcRenderer.send('LOGMEIN');
  };

  return (
    <ModalContainer open={open} onClose={handleClose} disableBackdropClick disableEscapeKeyDown>
      <CardNoOutline>
        <CardHeader title="Auth" />
        <CardContent>
          <FullWidthTextField
            id="input-with-icon-textfield"
            label="Phone Number"
            InputProps={{
              inputComponent: NumberFormatPhone,
            }}
          />
        </CardContent>
        <CardActions>
          <Button color="primary" onClick={handleLogIn}>
            Log In
          </Button>
        </CardActions>
      </CardNoOutline>
    </ModalContainer>
  );
}

// <TextField label="Confirmation Code" InputProps={{ inputComponent: NumberFormat }} />
