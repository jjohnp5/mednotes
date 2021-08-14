import { Fragment, React, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import styled from "styled-components";

const StyledInput = styled(Form.Control)`
  border: none;
  &:focus {
    border: none;
    box-shadow: none;
    border-bottom: 1px solid grey;
    border-radius: 0;
  }
`;

const Field = ({ field, handleRemoveField, handleUpdateField }) => {
  const [localField, setLocalField] = useState(field);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLocalField({ ...localField, [name]: value });
  };

  return (
    <Fragment>
      <Row className="pt-2">
        <Col xs={1}>
          <Button variant="danger" onClick={() => handleRemoveField(field)}>
            X
          </Button>
        </Col>
        <Col>
          <Form.Group>
            <StyledInput
              type="text"
              value={localField.name}
              name="name"
              onChange={handleInputChange}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <StyledInput
              type="text"
              value={localField.value}
              name="value"
              onChange={handleInputChange}
            />
          </Form.Group>
        </Col>
      </Row>
    </Fragment>
  );
};

export default Field;
