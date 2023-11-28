import styled from 'styled-components';

export const FloatingLabel = styled.label<{
  isfloating?: string;
  isfocusing?: string;
  errorcolor?: string;
}>`
  z-index: 1;
  pointer-events: none;
  position: absolute;
  left: 0.65rem;
  transition: 0.2s ease all;
  -moz-transition: 0.2s ease all;
  -webkit-transition: 0.2s ease all;
  font-weight: normal;

  color: ${(props) =>
    props.isfocusing === 'true' ? `#1976d2` : props.errorcolor === 'error' ? `#f44336` : `#607d8b`};
  //if error is true, color is red
  top: ${(props) => (props.isfloating === 'true' ? `-0.56rem` : `0.66rem`)};
  font-size: ${(props) => (props.isfloating === 'true' ? `0.6875rem` : `0.875rem`)};
`;
