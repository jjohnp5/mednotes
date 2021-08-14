import { React, useEffect } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginComponent from "./components/LoginComponent";
import styled from "styled-components";
import { Navbar, Nav, Container, Col, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import LogoutComponent from "./components/LogoutComponent";
import Home from "./components/Pages/Home";
import Templates from "./components/TemplateComponents/Templates";

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
  useEffect(() => {
    console.log(user);
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
          <Route path="/" component={Home} />
        </Switch>
      </FullScreen>
    </Router>
  );
};

export default Routes;
