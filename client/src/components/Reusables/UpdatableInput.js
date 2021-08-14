import { Form } from "react-bootstrap";
import styled from "styled-components";

const StyledInput = styled(Form.Control)`
  border: none;
  ${(props) => props.lg && "font-size: 2rem;"}
  &:focus {
    border: none;
    box-shadow: none;
    border-bottom: 1px solid grey;
    border-radius: 0;
  }
`;

const UpdatableInput = (props) => {
  return <StyledInput {...props} />;
};

export default UpdatableInput;
