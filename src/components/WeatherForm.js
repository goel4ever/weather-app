import React from 'react';
import {Button, Col, Form, InputGroup, Row} from "react-bootstrap";

export default class WeatherForm extends React.Component {
  render() {
    return (
      <Form onSubmit={this.props.getWeather}>
        <Row>
          <Col>
            <InputGroup className="mb-3">
              <Form.Control name="zipcode" placeholder="Zip Code . . ." />
              <Button type="submit" variant="outline-light" id="button-addon2">
                Get Weather
              </Button>
            </InputGroup>
          </Col>
        </Row>
      </Form>
    );
  }
}
