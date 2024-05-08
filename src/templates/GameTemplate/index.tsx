import React, { useEffect, useState } from "react";
import * as styled from "./styles";
import { BsPlayFill } from "react-icons/bs";

import {
  DiCss3Full,
  DiHtml5,
  DiJsBadge,
  DiVisualstudio,
  DiGithubBadge,
  DiCode,
  DiBootstrap,
  DiPython,
} from "react-icons/di";
import { VscDebugRestart } from "react-icons/vsc";
import { AiOutlinePause } from "react-icons/ai";
import { BsArrowLeft } from "react-icons/bs";
import { Shuffle } from "../../services/shuffleArray";
import Card from "../../components/Card";
import Timer from "../../components/Timer";
import { IconType } from "react-icons";
import { GameOver } from "../../components/GameOver";
import { useRouter } from "next/router";
export default function GameTemplate() {
  var iconsArray = [
    DiCss3Full,
    DiHtml5,
    DiJsBadge,
    DiVisualstudio,
    DiGithubBadge,
    DiCode,
    DiBootstrap,
    DiCss3Full,
    DiHtml5,
    DiJsBadge,
    DiVisualstudio,
    DiGithubBadge,
    DiCode,
    DiBootstrap,
    DiPython,
    DiPython,
  ];
  const router = useRouter();
  const [randomArray, setRandomArray] = useState(Shuffle(iconsArray));

  const [openMenu, setOpenMenu] = useState(false);
  const [timer, setTimer] = useState(65);
  //Registra as ultimas 2 cartas viradas
  const [openCard, setOpenCard] = useState<Element[]>([]);
  //Registra as cartas que foram viradas corretamente
  const [correctCards, setCorrectCards] = useState<Element[]>([]);
  //Responsável por pausar/despausar
  const [pause, setPause] = useState(false);
  const [allCardsFlipped, setAllCardsFlipped] = useState(true);

  useEffect(() => {
    var storedTimed = getTimeInStorage();
    setTimer(5);
    setTimeout(() => {
      setTimer(storedTimed);
      setAllCardsFlipped(false);
    }, 5000);
  }, []);

  //Reinicia o jogo
  const restart = () => {
    if (allCardsFlipped) {
      return;
    }
    setRandomArray(Shuffle(iconsArray));
    for (let index = 0; index < randomArray.length; index++) {
      let card = document.getElementById(index.toString()) as HTMLDivElement;
      card.style.transform = "rotateY(0deg)";
    }
    setOpenCard([]);
    setCorrectCards([]);
    setOpenMenu(false);
    setPause(false);
    var storedTimed = getTimeInStorage();
    setAllCardsFlipped(true);
    setTimer(5);

    const timeOut = setTimeout(() => {
      setTimer(storedTimed);
      setAllCardsFlipped(false);
      return () => {
        clearInterval(timeOut);
      };
    }, 5000);
  };

  const checkOpenCard = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    // O e.target é a div que representa a parte da frente da carta. A variável card contem a div que está na parte de trás da carta, onde o SVG está inserido

    let cardParent = e.target as HTMLDivElement;
    if (cardParent.parentNode === null) {
      return;
    }
    if (cardParent.parentNode.children === null) {
      return;
    }
    let card = cardParent.parentNode.children[0];
    if (
      // Impede o usuário de virar mais de 2 cartas ao mesmo tempo
      openCard.length === 2 ||
      // impede a função de continuar caso o usuário clique duas vezes na mesma carta
      openCard.includes(card) ||
      // impede que função continue em cartas que já foram viradas corretamente
      correctCards.includes(e.target as Element) ||
      // impede que função continue quando o pause estiver ativo
      pause === true
    ) {
      return;
    }
    let list = openCard;
    list.push(card);
    setOpenCard(list);
    flipCard(e);
    // Condição que impede a comparação das cartas caso o número de cartas viradas não seja igual a 2
    if (openCard.length !== 2) {
      return;
    }

    let cardsAreEquals = compare(openCard);
    //Função compare() retorna true se as 2 cartas viradas forem iguais
    if (!cardsAreEquals) {
      //setTimeOut responsável por dar 1 segundos de delay para desvirar as cartas.
      //Se for removido, o usuário não tem tempo suficiente para ver o que tem dentro de cada carta
      setTimeout(() => {
        untapCards(openCard);
        setOpenCard([]);
      }, 1000);
      return;
    }
    list = correctCards;
    list.push(e.target as Element);
    //Armazena a carta que foi virada corretamente.
    setCorrectCards(list);
    setOpenCard([]);

    //Fim de jogo ao virar todas as cartas

    if (correctCards.length === 8) {
      setOpenMenu(true);
    }
  };
  //Faz a diminuíção do tempo
  useEffect(() => {
    if (timer > 0 && openMenu === false && pause === false) {
      const count = setInterval(function () {
        setTimer(timer - 1);
      }, 1000);

      return () => {
        clearInterval(count);
      };
    } else {
      if (pause !== false) {
        return;
      }
      setOpenMenu(true);
    }
  }, [timer, openMenu, pause]);
  const BackToHome = () => {
    router.push("/");
  };
  return (
    //@ts-ignore
    <styled.container display={allCardsFlipped}>
      <div className="menu">
        <div className="back" onClick={BackToHome}>
          <BsArrowLeft />
        </div>
        <div className="option" onClick={restart}>
          <VscDebugRestart />
        </div>

        <Timer time={timer} />
        <div
          className="option"
          onClick={() => {
            if (!allCardsFlipped) {
              setPause(!pause);
            }
          }}
        >
          {!pause && <AiOutlinePause />}
          {pause && <BsPlayFill />}
        </div>
      </div>

      <div className="card-container">
        {randomArray.map((img: IconType, id: number) => (
          <Card
            allCardsFlipped={allCardsFlipped}
            checkOpenCard={checkOpenCard}
            id={id}
            Img={img}
            key={id}
          ></Card>
        ))}
      </div>
      {openMenu && (
        <GameOver
          allCardsFlipped={allCardsFlipped}
          getStorageTime={getTimeInStorage}
          timer={timer}
          cards={correctCards}
          restart={restart}
          display={setOpenMenu}
        />
      )}
    </styled.container>
  );
}
const flipCard = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
  let frontCard = e.target as HTMLDivElement;
  let card = frontCard.parentNode as HTMLDivElement;
  card.style.transform = "rotateY(180deg)";
};
const compare = (cards: Element[]) => {
  let status = cards[0].innerHTML === cards[1].innerHTML ? true : false;
  return status;
};

//Desvira as cartas
const untapCards = (openCards: Element[]) => {
  openCards.forEach((insideCard) => {
    let card = insideCard.parentNode as HTMLDivElement;
    if (card === null) {
      return;
    }
    card.style.transform = "rotateY(0deg)";
  });
};

const getTimeInStorage = () => {
  var time = localStorage.getItem("time");
  if (time !== null) {
    return parseInt(time);
  }
  return 50;
};
