import { Dispatch, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import Modal from "../Modal";
import { VscDebugRestart } from "react-icons/vsc";
import { Container, ModalContainer } from "./styles";
import axios from "axios";
import { useUserData } from "../../contexts/session";
interface GameOverProps {
  display: Dispatch<boolean>;
  restart: () => void;
  timer: number;
  getStorageTime: () => number;
  cards: Element[];
  allCardsFlipped: boolean;
}

export function GameOver({
  display,
  restart,
  timer,
  getStorageTime,
  cards,
  allCardsFlipped,
}: GameOverProps) {
  const user = useUserData();

  const time = getStorageTime();
  useEffect(() => {
    if (allCardsFlipped) {
      return;
    }
    if (timer > 0) {
      const finalTime = time - timer;
      console.log(time, timer);
      update(finalTime);
    }
  }, [timer]);
  const update = (finalTime: number) => {
    if (cards.length !== 8) {
      return;
    }

    if (user.userData.logged === false) {
      return;
    }

    const userTime = user.userData.time ?? 0;

    if (userTime <= finalTime && userTime !== 0) {
      return;
    }

    axios.defaults.withCredentials = true;
    axios
      .put("http://localhost:3000/api/session", { time: finalTime })
      .then(() => {
        toast.success("Your new record is now on the leaderboards", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        user.setReloadSession(!user.reloadSession);
      })
      .catch((e) => {
        toast.error("an error occurred while saving your new time", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };
  return (
    <ModalContainer>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Modal setDisplay={display} title="Game Over">
        <Container>
          <div className="score">
            <p>Time: {time - timer}s</p>
            {user.userData.logged && <p>Record: {user.userData.time}s</p>}
          </div>
          <div className="play-again">
            <p>Do you want to play again?</p>
            <VscDebugRestart onClick={restart} />
          </div>
        </Container>
      </Modal>
    </ModalContainer>
  );
}
