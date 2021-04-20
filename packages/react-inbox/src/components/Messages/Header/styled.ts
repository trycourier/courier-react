import styled from "styled-components";

export const Container = styled.div`
  padding: 18px 20px 12px;
  user-select: none;
  display: flex;
  color: rgb(36, 50, 75);
  -webkit-box-pack: justify;
  justify-content: space-between;
  font-size: 18px;
  font-weight: 700;
  line-height: 25px;
`;

export const MarkAllAsRead = styled.div(({ theme }) => ({
  fontSize: 14,
  fontStyle: "normal",
  fontWeight: 400,
  letterSpacing: "0em",
  color: theme?.brand?.colors?.primary ?? "#9121c2",
}));
