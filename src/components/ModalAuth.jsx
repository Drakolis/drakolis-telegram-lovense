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
  Collapse,
} from '@material-ui/core';
import NumberFormat from 'react-number-format';
import { connect } from 'react-redux';
import { loginCodeAction, loginNumberAction } from '../actions/login';
import authSteps from '../constants/authSteps';

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
  margin-bottom: 15px !important;
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

function ModalAuth({ pending, loggedIn, step, dispatch }) {
  const [number, setNumber] = React.useState('');
  const [code, setCode] = React.useState('');

  const isCodeStep = () => step === authSteps.CODE;

  const handleLogIn = () => {
    dispatch(loginNumberAction(number));
    if (isCodeStep()) {
      dispatch(loginCodeAction(code));
    }
  };

  return (
    <ModalContainer open={!loggedIn} disableBackdropClick disableEscapeKeyDown>
      <CardNoOutline>
        <CardHeader title="Auth" />
        <CardContent>
          <FullWidthTextField
            id="input-with-icon-textfield"
            label="Phone Number"
            disabled={step !== authSteps.NUMBER}
            InputProps={{
              inputComponent: NumberFormatPhone,
            }}
            value={number}
            onChange={event => {
              setNumber(event.target.value);
            }}
          />
          <Collapse in={isCodeStep()}>
            <FullWidthTextField
              label="Confirmation Code"
              InputProps={{ inputComponent: NumberFormat }}
              value={code}
              onChange={event => {
                setCode(event.target.value);
              }}
            />
          </Collapse>
        </CardContent>
        <CardActions>
          <Button color="primary" disabled={!number} onClick={handleLogIn}>
            Log In {pending ? '1' : '0'}
          </Button>
        </CardActions>
      </CardNoOutline>
    </ModalContainer>
  );
}

ModalAuth.propTypes = {
  pending: PropTypes.bool.isRequired,
  step: PropTypes.string.isRequired,
  loggedIn: PropTypes.string.isRequired,

  dispatch: PropTypes.func.isRequired,
};

const mapState = state => ({
  pending: state.currentTGAccount.pending,
  loggedIn: state.currentTGAccount.loggedIn,
  step: state.currentTGAccount.step,
});

export default connect(
  mapState,
  dispatch => ({ dispatch })
)(ModalAuth);
