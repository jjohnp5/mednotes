import axios from "axios";
import { Fragment, React, useEffect, useState } from "react";
import {
  Button,
  Dropdown,
  DropdownButton,
  InputGroup,
  Row,
  Col,
  Modal,
  Container,
  Form,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { handleAddFieldmap } from "../../redux/actions/fieldMaps";
import { handleAddTemplate } from "../../redux/actions/template";
import { getTemplateByUserId } from "../../services/template";
import Template from "./Template";

const Templates = () => {
  const user = useSelector((store) => store.user);
  const templates = useSelector((store) => store.templates);
  const [template, setTemplate] = useState({ name: "", description: "" });
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => setShow(true);

  const handleClick = async (e) => {
    e.preventDefault();
    const addedTemplate = await axios.post(
      "/api/template",
      {
        user: user.id,
        name: template.name,
        description: template.description,
      },
      {
        params: {
          userId: user.id,
        },
      }
    );
    const newTemplate = [...templates, addedTemplate.data];
    dispatch(handleAddTemplate(newTemplate));
    setTemplate({ name: "", description: "" });
    setShow(false);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTemplate({ ...template, [name]: value });
  };

  const handleDropdownSelect = (e) => {
    const { value } = e.target;
    setSelectedTemplate(templates[value]);
    dispatch(handleAddFieldmap(templates[value].fieldMaps));
  };
  const getTemplates = async () => {
    const templates = await getTemplateByUserId(user.id);
    dispatch(handleAddTemplate(templates.data));
  };
  useEffect(() => {
    getTemplates();
    // eslint-disable-next-line
  }, []);
  useEffect(() => {}, [templates]);
  return (
    <Fragment>
      <Row className="pt-4">
        <Col>
          <InputGroup>
            <DropdownButton
              variant="outline-primary"
              title="Templates"
              id="template-dropdown"
            >
              {templates.map((t, i) => (
                <Dropdown.Item
                  as="button"
                  onClick={handleDropdownSelect}
                  value={i}
                  key={t._id}
                >
                  {t.name}
                </Dropdown.Item>
              ))}
            </DropdownButton>
          </InputGroup>
        </Col>
        <Col>
          <Button onClick={handleShow}>Add New Template</Button>
        </Col>
      </Row>
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
                    value={template.name}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Control
                    as="textarea"
                    placeholder="Description"
                    name="description"
                    onChange={handleChange}
                    value={template.description}
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

      {selectedTemplate && (
        <Template
          template={selectedTemplate}
          setSelectedTemplate={setSelectedTemplate}
        />
      )}
    </Fragment>
  );
};

export default Templates;
