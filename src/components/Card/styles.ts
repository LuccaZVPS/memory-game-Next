import styled from "styled-components";

export const flipCardBack = styled.div`
  transition: 0.2s;
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden; /* Safari */
  backface-visibility: hidden;
  color: black;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.colors.card};
  font-size: 3rem;
  cursor: pointer;
  :hover {
    transform: scale(1.02);
  }
`;
export const flipCardFront = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden; /* Safari */
  backface-visibility: hidden;
  background-color: ${(props) => props.theme.colors.insideCard};
  color: white;
  transform: rotateY(180deg);
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4rem;
  color: ${(props) => props.theme.colors.primary};
`;
export const flipCardInner = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.8s;
  border-radius: 15px;
  transform-style: preserve-3d;
  transform: rotateY("180deg");
`;
export const flipCard = styled.div`
  perspective: 1000px; /* Remove this if you don't want the 3D effect */
  border-radius: 15px;
`;
