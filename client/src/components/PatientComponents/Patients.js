import {
  Button,
  Col,
  Container,
  Dropdown,
  DropdownButton,
  Form,
  InputGroup,
  Modal,
  Row,
} from "react-bootstrap";
import React, { Fragment, useEffect, useState } from "react";
import { createPatient, getPatientsByUserId } from "../../services/patient";
import { useDispatch, useSelector } from "react-redux";

import Patient from "./Patient";
import { handleAddPatient } from "../../redux/actions/patient";

const Patients = () => {
  const user = useSelector((store) => store.user);
  const patients = useSelector((store) => store.patients);
  const templates = useSelector((store) => store.templates);
  const [patient, setPatient] = useState({
    firstName: "",
    lastName: "",
    template: "",
    user: user.id,
  });
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => setShow(true);

  const handleClick = async (e) => {
    e.preventDefault();
    const currentPatient = { ...patient };
    Object.keys(currentPatient).forEach((k) => {
      if (!currentPatient[k]) delete currentPatient[k];
    });
    const addedPatient = await createPatient(patient);
    const newPatient = [...patients, addedPatient.data];
    dispatch(handleAddPatient(newPatient));
    setPatient({ name: "", description: "" });
    setShow(false);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatient({ ...patient, [name]: value });
  };

  const handleDropdownSelect = (e) => {
    const { value } = e.target;
    console.log(value);
    setSelectedPatient(patients[value]);
  };
  const getPatients = async () => {
    const patients = await getPatientsByUserId(user.id);
    dispatch(handleAddPatient(patients.data));
  };
  useEffect(() => {
    getPatients();
    console.log(patients);
    // eslint-disable-next-line
  }, [user]);
  useEffect(() => {}, [patients]);
  return (
    <Fragment>
      <Row className="pt-4">
        <Col>
          <InputGroup>
            <DropdownButton
              variant="outline-primary"
              title="Patients"
              id="patient-dropdown"
            >
              {patients.map((t, i) => (
                <Dropdown.Item
                  as="button"
                  onClick={handleDropdownSelect}
                  value={i}
                  key={t._id}
                >
                  {`${t.firstName} ${t.lastName}`}
                </Dropdown.Item>
              ))}
            </DropdownButton>
          </InputGroup>
        </Col>
        <Col>
          <Button onClick={handleShow}>Add New Patient</Button>
        </Col>
      </Row>
      <Modal size="lg" centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>New Patient</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder="First Name"
                    name="firstName"
                    value={patient.firstName}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder="Description"
                    name="lastName"
                    onChange={handleChange}
                    value={patient.lastName}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Control
                    as="select"
                    name="template"
                    onChange={handleChange}
                    value={patient.template}
                  >
                    <option value="">-Select Template-</option>
                    {templates.map((t) => (
                      <option key={t._id} value={t._id}>
                        {t.name}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleClick}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      {selectedPatient && (
        <Patient
          patient={selectedPatient}
          setSelectedPatient={setSelectedPatient}
        />
      )}
    </Fragment>
  );
};

export default Patients;
