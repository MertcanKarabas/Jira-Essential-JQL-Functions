import styled from 'styled-components';
import { colors, elevation } from '@atlaskit/theme';

export const Card = styled.div`
  ${elevation['e100']};
  background: ${colors.N0};
  position: relative;
  text-decoration: none;
  border-radius: 3px;
  margin: 20px;
  padding: 20px;
  box-sizing: border-box;
`;

export const TableContainer = styled.div`
  margin-top: 20px;
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

export const StyledTh = styled.th`
  background-color: ${colors.N30};
  color: ${colors.N800};
  padding: 10px;
  text-align: left;
`;

export const StyledTd = styled.td`
  border: 1px solid ${colors.N30};
  margin-left: 5px;
  padding: 10px;
`;

export const StyledKey = styled.div`
  cursor: pointer;
  color: blue;
  &:hover {
    color: ${colors.B300};
    text-decoration: underline;
  }
`;
export const StyledAssignee = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  img {
    width: 20px;
    height: 20px;
    margin-right: 8px;
  }
`;


export const FormContainer = styled.div`
  margin-bottom: 20px;
`;

export const Input = styled.input`
  margin-right: 10px;
  margin-top: 10px;
  width: 300px;
  padding: 5px;
  border: 1px solid ${colors.N30};
  border-radius: 3px;
`;

export const ButtonContainer = styled.div`
  margin-top: 10px;
`;

export const StyledButton = styled.button`
  padding: 10px 20px;
  margin-right: 10px;
  width: 150px;
  background-color: ${colors.B400};
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;

  &:hover {
    background-color: ${colors.B300};
  }
`;

export const ErrorText = styled.p`
  color: red;
`;