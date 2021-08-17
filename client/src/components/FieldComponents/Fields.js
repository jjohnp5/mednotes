import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import React, { Fragment, useState } from "react";
import {
  createField,
  deleteField,
  updateFieldById,
} from "../../services/templateField";
import { useDispatch, useSelector } from "react-redux";

import Field from "./Field";
import { handleUpdateFieldmap } from "../../redux/actions/fieldMaps";

const Fields = ({ fieldMap, fields }) => {
  const user = useSelector((store) => store.user);
  const [newField, setNewField] = useState({
    name: "",
    value: "",
    template: fieldMap.template,
    templateJunction: fieldMap._id,
    sortOrder: fields.length,
  });
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  const handleClose = () => {
    setShow(false);
  };
  const handleOpenModal = () => setShow(true);
  const handleAddField = async () => {
    const field = await createField(newField, user.id);
    let tempFields = [...fields];
    tempFields.push(field.data);
    const updateFieldmap = { ...fieldMap, templateFields: tempFields };
    dispatch(handleUpdateFieldmap(updateFieldmap));
    setNewField({
      name: "",
      value: "",
      template: fieldMap.template,
      templateJunction: fieldMap._id,
      sortOrder: fields.length,
    });
    setShow(false);
  };
  const handleRemoveField = async (fieldToRemove) => {
    const field = await deleteField(fieldToRemove, user.id);
    let tempFields = [...fields].filter((f) => f._id !== field.data._id);
    const updateFieldmap = { ...fieldMap, templateFields: tempFields };
    dispatch(handleUpdateFieldmap(updateFieldmap));
  };
  const handleUpdateField = async (fieldToUpdate) => {
    const field = await updateFieldById(fieldToUpdate, user.id);
    let tempFields = [...fields].map((f) => {
      if (f._id === field.data._id) {
        return fieldToUpdate;
      }
      return f;
    });
    const updateFieldmap = { ...fieldMap, templateFields: tempFields };
    dispatch(handleUpdateFieldmap(updateFieldmap));
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewField({ ...newField, [name]: value });
  };
  return (
    <Fragment>
      <Row>
        <Col></Col>
        <Col>
          <Button
            className="float-right"
            variant="success"
            onClick={handleOpenModal}
          >
            Add Field-Value Pair
          </Button>
        </Col>
      </Row>
      {fields &&
        fields.map((f) => (
          <Field
            key={f._id}
            field={f}
            handleRemoveField={handleRemoveField}
            handleUpdateField={handleUpdateField}
          />
        ))}
      <Modal size="lg" centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>New Field - Value Pair</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder="Name"
                    name="name"
                    value={newField.name}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder="Value"
                    name="value"
                    value={newField.value}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddField}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default Fields;
