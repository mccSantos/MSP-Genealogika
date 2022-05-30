import styled from "styled-components";

export const PersonNodeWrapper = styled.div`
  position: absolute;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const PersonNodeInner = styled.div`
  background-color: wheat;
  display: flex;
  width: 80%;
  height: 80%;
`;

export const PersonNodeSubtreeBttn = styled.button`
  position: absolute;
  top: 6px;
  right: 14px;
  width: 14px;
  height: 10px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 4px 0;
  background: blue;
  cursor: pointer;
`;
