import { Fragment, React, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import styled from "styled-components";
import { BsCheck, BsDash } from "react-icons/bs";

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
  const [localFieldUpdated, setLocalFieldUpdated] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLocalField({ ...localField, [name]: value });
    setLocalFieldUpdated(true);
  };
  const handleUpdateSubmit = () => {
    handleUpdateField(localField);
    setLocalFieldUpdated(false);
  };

  return (
    <Fragment>
      <Row className="pt-2 pl-3">
        <Col xs={1}>
          {localFieldUpdated ? (
            <Button variant="success" onClick={handleUpdateSubmit}>
              {<BsCheck />}
            </Button>
          ) : (
            <Button
              variant="outline-danger"
              onClick={() => handleRemoveField(localField)}
            >
              {<BsDash />}
            </Button>
          )}
        </Col>
        <Col>
          <Row noGutters>
            <Col sm={2} xs={12}>
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
        </Col>
      </Row>
    </Fragment>
  );
};

export default Field;
