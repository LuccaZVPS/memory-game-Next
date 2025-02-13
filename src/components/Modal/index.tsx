import React, { Dispatch, memo, MouseEventHandler, ReactNode } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Container, Content } from "./styles";
interface ModalProps {
  children: ReactNode;
  title: string;
  setDisplay: Dispatch<boolean>;
}

function Modal({ children, title, setDisplay }: ModalProps) {
  return (
    // @ts-ignore
    <Container
      onClick={() => {
        setDisplay(false);
      }}
    >   
             {/* @ts-ignore */}

      <Content
 //@ts-ignore
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <h2>{title}</h2>

        {children}
        <div
          className="close"
          onClick={() => {
            setDisplay(false);
          }}
        >
          <AiOutlineClose />
        </div>
      </Content>
    </Container>
  );
}
export default memo(Modal);
