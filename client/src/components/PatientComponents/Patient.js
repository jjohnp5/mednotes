import { Button, Col, Form, Row } from "react-bootstrap";
import React, { Fragment, useEffect, useState } from "react";
import { deletePatient, updatePatient } from "../../services/patient";
import {
  handleRemovePatient,
  handleUpdatePatient,
} from "../../redux/actions/patient";
import { useDispatch, useSelector } from "react-redux";

import UpdatableInput from "../Reusables/UpdatableInput";
import Visits from "../Visits/Visits";

const Patient = ({ patient, setSelectedPatient }) => {
  // const patients = useSelector(store => store.patients)
  // const user = useSelector(store=> store.user);
  const [localPatient, setPatient] = useState(patient);
  const templates = useSelector((store) => store.templates);
  const [patientUpdated, setPatientUpdated] = useState(false);
  const dispatch = useDispatch();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPatient({ ...localPatient, [name]: value });
    setPatientUpdated(true);
  };
  const handleDelete = async () => {
    let deletedPatient = await deletePatient(patient);
    deletedPatient = deletedPatient.data;
    dispatch(handleRemovePatient(deletedPatient));
    setSelectedPatient(null);
  };
  const handleUpdate = async () => {
    let updatedPatient = await updatePatient(localPatient);
    updatedPatient = updatedPatient.data;
    delete updatedPatient.patientFields;
    dispatch(handleUpdatePatient(updatedPatient));
    setPatientUpdated(false);
  };
  useEffect(() => {
    setPatient(patient);
    console.log(patient);
    // eslint-disable-next-line
  }, [patient]);
  return (
    <Fragment>
      <hr></hr>
      <Row className="pt-4" noGutters>
        <Col xs={3} sm={2}>
          <UpdatableInput
            lg
            onChange={handleInputChange}
            type="text"
            name="firstName"
            value={localPatient.firstName}
          />
        </Col>
        <Col xs={3} sm={3}>
          <UpdatableInput
            lg
            onChange={handleInputChange}
            type="text"
            name="lastName"
            value={localPatient.lastName}
          />
        </Col>
        <Col xs={3} sm={3} className="my-auto">
          <Form.Group className="mb-0">
            <Form.Control
              onChange={handleInputChange}
              as="select"
              name="template"
              value={localPatient.template || ""}
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
        <Col className="my-auto">
          {patientUpdated ? (
            <Button className="float-right" variant="success" onClick={handleUpdate}>
              Update
            </Button>
          ) : (
            <Button className="float-right" variant="danger" onClick={handleDelete}>
              Delete Patient
            </Button>
          )}
        </Col>
      </Row>
      <Row>
        <Col>
          <Row className="pt-4">
            <Visits patient={patient} />
          </Row>
        </Col>
      </Row>
    </Fragment>
  );
};

export default Patient;
