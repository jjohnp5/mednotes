import { Button, Col, Row } from "react-bootstrap";
import React, { Fragment, useEffect, useState } from "react";
import {
  deleteJunction,
  getJunctionById,
  updateJunctionById,
} from "../../services/junction";
import {
  handleRemoveFieldmap,
  handleUpdateFieldmap,
} from "../../redux/actions/fieldMaps";
import { useDispatch, useSelector } from "react-redux";

import { BsDash } from "react-icons/bs";
import Fields from "../FieldComponents/Fields";
import UpdatableInput from "../Reusables/UpdatableInput";

const Fieldmap = ({ fieldMap }) => {
  const user = useSelector((store) => store.user);
  const [populateFields, setPopulateFields] = useState([]);
  const [isUpdated, setIsUpdated] = useState(false);
  const [focused, setFocused] = useState(false);
  const [junction, setJunction] = useState(fieldMap);
  const dispatch = useDispatch();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setJunction({ ...junction, [name]: value });
    !isUpdated && setIsUpdated(true);
  };
  const handleFocus = () => {
    setFocused(true);
  };
  const handleBlur = async () => {
    setTimeout(() => setFocused(false), 200);
    if (!isUpdated) return;
    const tempJunction = { ...junction };
    delete tempJunction.templateFields;
    const newJunction = await updateJunctionById(tempJunction, user.id);
    dispatch(handleUpdateFieldmap(newJunction.data));
    setIsUpdated(false);
  };
  const handleDeleteMap = async () => {
    const deletedJunction = await deleteJunction(junction, user.id);
    dispatch(handleRemoveFieldmap(deletedJunction.data));
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
        {focused && (
          <Col xs={1} className="my-auto">
            <Button variant="outline-danger" onClick={handleDeleteMap}>
              {<BsDash />}
            </Button>
          </Col>
        )}
        <Col>
          <UpdatableInput
            lg
            type="text"
            onChange={handleChange}
            name="name"
            value={junction.name}
            onBlur={handleBlur}
            onFocus={handleFocus}
          />
        </Col>
        <Col></Col>
      </Row>

      {populateFields && <Fields fieldMap={fieldMap} fields={populateFields} />}
    </Fragment>
  );
};

export default Fieldmap;
