import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Template from "./Template";
import axios from "axios";
import { handleAddTemplate } from "../../redux/actions/template";

const TemplateList = () => {
  const templates = useSelector((store) => store.templates);
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const getTemplates = async () => {
    const templates = await axios.get(`/api/template/`, {
      params: {
        userId: user.id,
      },
    });
    dispatch(handleAddTemplate(templates.data));
  };

  useEffect(() => {
    getTemplates();
    // eslint-disable-next-line
  }, []);
  return (
    <Fragment>
      {templates.map((t) => (
        <Template key={t._id} template={t} />
      ))}
    </Fragment>
  );
};

export default TemplateList;
