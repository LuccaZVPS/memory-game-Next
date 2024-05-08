import { memo, ReactNode, useEffect } from "react";
import * as styled from "./styles";
import { IconType } from "react-icons";
import { DiAndroid } from "react-icons/di";
interface props {
  Img: IconType;
  id: number;
  checkOpenCard: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  allCardsFlipped: boolean;
}
function Card({ Img, id, checkOpenCard, allCardsFlipped }: props) {
  useEffect(() => {
    if (allCardsFlipped) {
      var div = document.getElementById(id.toString()) as HTMLDivElement;
      div.style.transform = "rotateY(180deg)";
      return;
    }

    var div = document.getElementById(id.toString()) as HTMLDivElement;
    div.style.transform = "rotateY(0deg)";
  }, [allCardsFlipped]);
  return (
    <styled.flipCard>
             {/* @ts-ignore */}
      <styled.flipCardInner id={id.toString()}>
        <styled.flipCardFront>
          <Img />
        </styled.flipCardFront>
                     {/* @ts-ignore */}
        <styled.flipCardBack onClick={checkOpenCard}>?</styled.flipCardBack>
      </styled.flipCardInner>
    </styled.flipCard>
  );
}
export default memo(Card);
