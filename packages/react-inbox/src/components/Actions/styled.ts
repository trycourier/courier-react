import styled from 'styled-components';

export const Container = styled.div`
  flex-shrink: 0;
`;

export const Action = styled.div<{ href: string, target: string }>(() => ({
  cursor: "pointer",
  border: "none",
  fontSize: 12,
  color: "#9E3789",
  padding: "8px 15px",
  flexShrink: 0,
  maxHeight: 32,
  outline: "none",
  marginLeft: 6,
  maxWidth: 100,
  background: "#FFFFFF",
  boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
  textDecoration: "none",
  "&:active": {
    boxShadow: "none",
  },

  "&:hover": {
    background: "rgb(0 0 0 / 10%)",
  },

  borderRadius: 6,
}));