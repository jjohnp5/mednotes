import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { createVisit } from "../../services/visits";
import { handleAddVisit } from "../../redux/actions/visits";

const Visits = ({ patient }) => {
  const visits = useSelector((store) => store.visits);
  const user = useSelector((store) => store.user);
  const [newVisit, setNewVisit] = useState({
    reason: "",
    notes: "",
    date: "",
    patient: patient._id,
    notableInformation: {},
  });
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  const handleClose = () => {
    setNewVisit({
      reason: "",
      notes: "",
      date: "",
      patient: patient._id,
      notableInformation: {},
    });
    setShow(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewVisit({ ...newVisit, [name]: value });
  };

  const handleClick = async () => {
    const visit = await createVisit(newVisit, user.id);
    dispatch(handleAddVisit([...visits, visit.data]));
    setNewVisit({
      reason: "",
      notes: "",
      date: "",
      patient: patient._id,
      notableInformation: {},
    });
    setShow(false);
  };

  const handleAddMap = () => {
    setShow(true);
  };
  useEffect(() => {
    console.log("re-rendered in visits?");
  }, [visits]);
  return (
    <Fragment>
      <Col xs={12} className="py-3">
        <Button variant="success" onClick={handleAddMap}>
          Add a Visit
        </Button>
      </Col>
      {/* <Col>
        {visits &&
          visits.map((fm) => <Visit key={fm._id} fieldMap={fm} />)}
      </Col> */}

      <Modal size="lg" centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>New Visit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder="Visit Reason"
                    name="reason"
                    value={newVisit.reason}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Control
                    type="datetime-local"
                    placeholder="Date"
                    name="date"
                    value={newVisit.date}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label for="notes">Notes</Form.Label>
                  <Form.Control
                    id="notes"
                    as="textarea"
                    placeholder="Notes"
                    name="notes"
                    value={newVisit.notes}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <h6>Visit Informations</h6>
              </Col>
              <Col></Col>
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
    </Fragment>
  );
};

export default Visits;
