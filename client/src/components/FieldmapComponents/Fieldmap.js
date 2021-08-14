import { React, Fragment, useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { handleUpdateFieldmap } from "../../redux/actions/fieldMaps";
import { getJunctionById, updateJunctionById } from "../../services/junction";
import Fields from "../FieldComponents/Fields";
import UpdatableInput from "../Reusables/UpdatableInput";

const Fieldmap = ({ fieldMap }) => {
  const user = useSelector((store) => store.user);
  const [populateFields, setPopulateFields] = useState([]);
  const [isUpdated, setIsUpdated] = useState(false);
  const [junction, setJunction] = useState(fieldMap);
  const dispatch = useDispatch();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setJunction({ ...junction, [name]: value });
    !isUpdated && setIsUpdated(true);
  };
  const handleBlur = async () => {
    if (!isUpdated) return;
    const tempJunction = { ...junction };
    delete tempJunction.templateFields;
    const newJunction = await updateJunctionById(tempJunction, user.id);
    dispatch(handleUpdateFieldmap(newJunction.data));
    setIsUpdated(false);
  };
  const getPopulatedFields = async () => {
    const newFieldMap = await getJunctionById(fieldMap._id, user.id);
    dispatch(handleUpdateFieldmap(newFieldMap.data));
    setPopulateFields(newFieldMap.data.templateFields);
  };
  useEffect(() => {
    getPopulatedFields();
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    setPopulateFields(fieldMap.templateFields);
    // eslint-disable-next-line
  }, [fieldMap]);
  return (
    <Fragment>
      <Row>
        <Col>
          <UpdatableInput
            lg
            type="text"
            onChange={handleChange}
            name="name"
            value={junction.name}
            onBlur={handleBlur}
          />
        </Col>
        <Col></Col>
      </Row>

      {populateFields && <Fields fieldMap={fieldMap} fields={populateFields} />}
    </Fragment>
  );
};

export default Fieldmap;
