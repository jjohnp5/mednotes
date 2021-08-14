import { React, useEffect, useState, Fragment } from "react";
import { Button, Col, Row, Modal, Form, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { handleAddFieldmap } from "../../redux/actions/fieldMaps";
import { createJunction } from "../../services/junction";
import Fieldmap from "./Fieldmap";

const Fieldmaps = ({ template }) => {
  const fieldMaps = useSelector((store) => store.fieldMaps);
  const user = useSelector((store) => store.user);
  const [newFieldmap, setNewFieldmap] = useState({
    name: "",
    template: template._id,
  });
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  const handleClose = () => setShow(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewFieldmap({ ...newFieldmap, [name]: value });
  };

  const handleClick = async () => {
    const fieldMap = await createJunction(newFieldmap, user.id);
    dispatch(handleAddFieldmap([...fieldMaps, fieldMap.data]));
    setShow(false);
  };

  const handleAddMap = () => {
    setShow(true);
  };
  useEffect(() => {
    console.log("re-rendered in fieldmaps?");
    console.log(fieldMaps);
  }, [fieldMaps]);
  return (
    <Fragment>
      <Col xs={12} className="py-3">
        <Button variant="success" onClick={handleAddMap}>
          Add Group
        </Button>
      </Col>
      <Col>
        {fieldMaps &&
          fieldMaps.map((fm) => <Fieldmap key={fm._id} fieldMap={fm} />)}
      </Col>

      <Modal size="lg" centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>New Template</Modal.Title>
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
                    value={newFieldmap.name}
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
          <Button variant="primary" onClick={handleClick}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default Fieldmaps;
