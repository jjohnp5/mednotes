import { Fragment, React } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { handleRemoveTemplateFieldmaps } from "../../redux/actions/fieldMaps";
import { handleRemoveTemplate } from "../../redux/actions/template";
import { deleteTemplate } from "../../services/template";
import Fieldmaps from "../FieldmapComponents/Fieldmaps";

const Template = ({ template, setSelectedTemplate }) => {
  // const templates = useSelector(store => store.templates)
  // const user = useSelector(store=> store.user);
  const dispatch = useDispatch();
  const handleDelete = async () => {
    let deletedTemplate = await deleteTemplate(template);
    deletedTemplate = deletedTemplate.data;
    dispatch(handleRemoveTemplateFieldmaps(deletedTemplate._id));
    dispatch(handleRemoveTemplate(deletedTemplate));
    setSelectedTemplate(null);
  };
  return (
    <Fragment>
      <hr></hr>
      <Row className="pt-4">
        <Col>
          <h1>{template.name}</h1>
        </Col>
        <Col>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <p>{template.description}</p>
        </Col>
        <Col>
          <Row>
            <Fieldmaps template={template} />
          </Row>
        </Col>
      </Row>
    </Fragment>
  );
};

export default Template;
