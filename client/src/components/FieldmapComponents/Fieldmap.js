import { React, Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleUpdateFieldmap } from "../../redux/actions/fieldMaps";
import { getJunctionById } from "../../services/junction";
import Fields from "../FieldComponents/Fields";

const Fieldmap = ({ fieldMap }) => {
  const user = useSelector((store) => store.user);
  const [populateFields, setPopulateFields] = useState([]);
  const dispatch = useDispatch();
  const getPopulatedFields = async () => {
    const newFieldMap = await getJunctionById(fieldMap._id, user.id);
    dispatch(handleUpdateFieldmap(newFieldMap.data));
    setPopulateFields(newFieldMap.data.templateFields);
  };
  useEffect(() => {
    getPopulatedFields();
  }, []);
  useEffect(() => {
    setPopulateFields(fieldMap.templateFields);
    // eslint-disable-next-line
  }, [fieldMap]);
  return (
    <Fragment>
      <h1>{fieldMap.name}</h1>
      {populateFields && <Fields fieldMap={fieldMap} fields={populateFields} />}
    </Fragment>
  );
};

export default Fieldmap;
