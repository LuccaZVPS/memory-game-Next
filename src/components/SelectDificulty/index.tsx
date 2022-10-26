import { Container } from "./styles";
import Modal from "../Modal";
import { Dispatch } from "react";
import { useRouter } from "next/router";

interface props {
  display: Dispatch<boolean>;
}

export function SelectDificulty({ display }: props) {
  const router = useRouter();

  const chooseDificult = (time: Number) => {
    localStorage.setItem("time", time.toString());
    router.push("/play");
  };
  return (
    <Modal setDisplay={display} title={"Dificulty"}>
      <Container>
        <div className="mode">
          <button
            onClick={() => {
              chooseDificult(50);
            }}
            className="options"
          >
            Easy
          </button>
          <button
            onClick={() => {
              chooseDificult(35);
            }}
            className="options"
          >
            Normal
          </button>
          <button
            onClick={() => {
              chooseDificult(20);
            }}
            className="options"
          >
            Hard
          </button>
        </div>
      </Container>
    </Modal>
  );
}
