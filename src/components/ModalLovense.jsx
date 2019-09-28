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
import { connect } from 'react-redux';
import { toggleLovenseModal, testLovenseSettings } from '../actions/lovense';

const ModalContainer = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CardNoOutline = styled(Card)`
  width: 300px;
  outline: 0;
`;

const FullWidthTextField = styled(TextField)`
  width: 100%;
  margin-bottom: 15px !important;
`;

function ModalLovense({ visible, currentLovenseUrl, currentLovenseId, dispatch }) {
  const [lovenseUrl, setLovenseUrl] = React.useState(currentLovenseUrl);
  const [lovenseId, setLovenseId] = React.useState(currentLovenseId);

  const closeModal = () => {
    setLovenseUrl(currentLovenseUrl);
    setLovenseId(currentLovenseId);
    dispatch(toggleLovenseModal());
  };

  const testConnection = () => {
    dispatch(testLovenseSettings(lovenseUrl, lovenseId));
  };

  return (
    <ModalContainer disableBackdropClick open={visible} onClose={closeModal}>
      <CardNoOutline>
        <CardHeader title="Lovense Config" />
        <CardContent>
          <FullWidthTextField
            label="Lovense URL"
            value={lovenseUrl}
            onChange={event => {
              setLovenseUrl(event.target.value);
            }}
          />
          <FullWidthTextField
            label="Lovense Device Id"
            value={lovenseId}
            onChange={event => {
              setLovenseId(event.target.value);
            }}
          />
          <Button color="primary" onClick={testConnection}>
            Test!
          </Button>
        </CardContent>
        <CardActions>
          <Button color="primary">Save</Button>
          <Button color="primary" onClick={closeModal}>
            Cancel
          </Button>
        </CardActions>
      </CardNoOutline>
    </ModalContainer>
  );
}

ModalLovense.propTypes = {
  visible: PropTypes.bool.isRequired,
  currentLovenseUrl: PropTypes.string.isRequired,
  currentLovenseId: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapState = state => ({
  visible: state.ui.lovenseModalVisible,
  currentLovenseUrl: state.lovenseSettings.url,
  currentLovenseId: state.lovenseSettings.deviceId,
});

export default connect(
  mapState,
  dispatch => ({ dispatch })
)(ModalLovense);
