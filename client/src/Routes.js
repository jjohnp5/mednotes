import { Col, Container, Nav, Navbar, Row } from "react-bootstrap";
import React,  {useEffect} from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Home from "./components/Pages/Home";
import { LinkContainer } from "react-router-bootstrap";
import LoginComponent from "./components/LoginComponent";
import LogoutComponent from "./components/LogoutComponent";
import Patients from "./components/PatientComponents/Patients";
import Templates from "./components/TemplateComponents/Templates";
import { getPatientsByUserId } from "./services/patient";
import { getTemplateByUserId } from "./services/template";
import { handleAddPatient } from "./redux/actions/patient";
import { handleAddTemplate } from "./redux/actions/template";
import styled from "styled-components";

const FullScreen = styled(Container)`
  min-height: ${window.innerHeight}px;
`;

const ResponsiveRow = styled(Row)`
  flex-direction: row;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;
const FloatingNavlink = styled(Nav.Link)`
  @media (min-width: 768px) {
    float: right;
  }
`;

const Routes = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const getTemplatesAndPatients = async () => {
      const templates = await getTemplateByUserId(user.id);
      const patients = await getPatientsByUserId(user.id);
      dispatch(handleAddPatient(patients.data));
      dispatch(handleAddTemplate(templates.data));
  }
  useEffect(() => {
    if(user && user.id){
      getTemplatesAndPatients();

    }
    console.log(user);
    // eslint-disable-next-line
  }, [user]);
  return (
    <Router>
      <Navbar bg="dark" expand="md" variant="dark">
        <Container fluid>
          <Navbar.Brand href="/">Note Taker</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto justify-content-between w-100">
              <Col>
                <ResponsiveRow>
                  <LinkContainer to="/home">
                    <Nav.Link>Home</Nav.Link>
                  </LinkContainer>
                  {user && user.id && (
                    <LinkContainer to="/templates">
                      <Nav.Link>Templates</Nav.Link>
                    </LinkContainer>
                  )}
                  {user && user.id && (
                    <LinkContainer to="/patients">
                      <Nav.Link>Patients</Nav.Link>
                    </LinkContainer>
                  )}
                </ResponsiveRow>
              </Col>
              <Col className="pl-0">
                {user && user.id ? (
                  <LogoutComponent />
                ) : (
                  <LinkContainer to="/login">
                    <FloatingNavlink>Login</FloatingNavlink>
                  </LinkContainer>
                )}
              </Col>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <FullScreen fluid>
        <Switch>
          <Route path="/login" component={LoginComponent} />
          <Route
            path={["/templates", "/templates/:templateId"]}
            component={Templates}
          />
          <Route
            path={["/patients", "/patients/:patientId"]}
            component={Patients}
          />
          <Route path="/" component={Home} />
        </Switch>
      </FullScreen>
    </Router>
  );
};

export default Routes;
