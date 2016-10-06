import React from 'react';
import { Row, Col, FormGroup, Button, ControlLabel } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';

const handleSubscribe = (event) => {
  event.preventDefault();
  Meteor.call('subscribeToMailingList', {
    emailAddress: document.querySelector('[name="emailAddress"]').value,
    name: {
      first: document.querySelector('[name="firstName"]').value,
      last: document.querySelector('[name="lastName"]').value,
    },
  }, (error) => {
    if (error) {
      Bert.alert(error.reason, 'danger');
    } else {
      Bert.alert('Subscribed!', 'success');
    }
  });
};

export const Subscribe = () => (
  <form onSubmit={ handleSubscribe }>
    <Row>
      <Col xs={ 6 }>
        <FormGroup>
          <ControlLabel>First Name</ControlLabel>
          <input type="text" name="firstName" className="form-control" />
        </FormGroup>
      </Col>
      <Col xs={ 6 }>
        <FormGroup>
          <ControlLabel>Last Name</ControlLabel>
          <input type="text" name="lastName" className="form-control" />
        </FormGroup>
      </Col>
    </Row>
    <Row>
      <Col xs={ 12 }>
        <FormGroup>
          <ControlLabel>Email Address</ControlLabel>
          <input type="text" name="emailAddress" className="form-control" />
        </FormGroup>
      </Col>
    </Row>
    <Row>
      <Col xs={ 12 }>
        <Button bsStyle="success" type="submit">Subscribe</Button>
      </Col>
    </Row>
  </form>
);

Subscribe.propTypes = {};
