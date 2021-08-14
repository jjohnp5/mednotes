import { Fragment, React, useState } from "react";
import { Button, Col, Row, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { handleRemoveTemplateFieldmaps } from "../../redux/actions/fieldMaps";
import {
  handleRemoveTemplate,
  handleUpdateTemplate,
} from "../../redux/actions/template";
import { deleteTemplate, updateTemplate } from "../../services/template";
import Fieldmaps from "../FieldmapComponents/Fieldmaps";
import UpdatableInput from "../Reusables/UpdatableInput";

const Template = ({ template, setSelectedTemplate }) => {
  // const templates = useSelector(store => store.templates)
  // const user = useSelector(store=> store.user);
  const [localTemplate, setTemplate] = useState(template);
  const [templateUpdated, setTemplateUpdated] = useState(false);
  const dispatch = useDispatch();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTemplate({ ...localTemplate, [name]: value });
    setTemplateUpdated(true);
  };
  const handleDelete = async () => {
    let deletedTemplate = await deleteTemplate(template);
    deletedTemplate = deletedTemplate.data;
    dispatch(handleRemoveTemplateFieldmaps(deletedTemplate._id));
    dispatch(handleRemoveTemplate(deletedTemplate));
    setSelectedTemplate(null);
  };
  const handleUpdate = async () => {
    let updatedTemplate = await updateTemplate(localTemplate);
    updatedTemplate = updatedTemplate.data;
    delete updatedTemplate.templateFields;
    dispatch(handleUpdateTemplate(updatedTemplate));
    setTemplateUpdated(false);
  };
  return (
    <Fragment>
      <hr></hr>
      <Row className="pt-4">
        <Col>
          <UpdatableInput
            lg
            onChange={handleInputChange}
            type="text"
            name="name"
            value={localTemplate.name}
          />
        </Col>
        <Col>
          {templateUpdated ? (
            <Button variant="success" onClick={handleUpdate}>
              Update
            </Button>
          ) : (
            <Button variant="danger" onClick={handleDelete}>
              Delete
            </Button>
          )}
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <UpdatableInput
            onChange={handleInputChange}
            type="text"
            name="description"
            value={localTemplate.description}
          />
        </Col>
        <Col>
          <Row className="pt-4">
            <Fieldmaps template={template} />
          </Row>
        </Col>
      </Row>
    </Fragment>
  );
};

export default Template;
