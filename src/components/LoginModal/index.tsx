import {
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  FormHelperText,
  Spinner,
} from "@chakra-ui/react";
import React, { FormEvent, useEffect, useState } from "react";
import * as styled from "./styles";
import validateLogin from "../../services/validateLogin";
import validator from "validator";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ApiRequests from "../../services/apiRequests";
import { useUserData } from "../../contexts/session";
import { ForgetPassword } from "../ForgetPassword";

export function LoginModal() {
  const { setReloadSession, reloadSession } = useUserData();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [forgetPassword, setForgetPassword] = useState(false);

  useEffect(() => {
    setForgetPassword(false);
    setPassword("");
    setEmail("");
  }, [isOpen]);
  const submitForm = (e: FormEvent) => {
    e.preventDefault();

    if (loading) {
      return;
    }
    setLoading(true);
    const formIsCorrect = validateLogin(email, password);

    if (!formIsCorrect) {
      setLoading(false);
      toast.error("Wrong email or password", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    console.log(ApiRequests.login(email, password));
    ApiRequests.login(email, password)
      .then(() => {
        setReloadSession(!reloadSession);
      })
      .catch((e) => {
        toast.error(e, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <styled.Container>
      <Button
        _hover={{ background: "transparent" }}
        className="btnLogin"
        onClick={onOpen}
      >
        Sign In
      </Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay background={"rgba(0, 0, 0, 0.2)"} />
        {!forgetPassword && (
          <form action="" onSubmit={submitForm}>
            <ModalContent background={"card2"}>
              <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
              />
              <ModalHeader color={"insideCard"}>Sign In</ModalHeader>
              <ModalCloseButton color={"secundary"} />
              <ModalBody pb={1}>
                <FormControl>
                  <FormLabel color={"secundary"}>E-mail</FormLabel>
                  <Input
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    defaultValue={email}
                    color={"secundary"}
                    borderColor={"grey"}
                    focusBorderColor={"insideCard"}
                    ref={initialRef}
                    placeholder="example@gmail.com"
                  />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel color={"secundary"}>Password</FormLabel>
                  <Input
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    defaultValue={password}
                    type={"password"}
                    color={"secundary"}
                    borderColor={"grey"}
                    focusBorderColor={"insideCard"}
                    placeholder="your password"
                  />
                  <FormHelperText
                    cursor={"pointer"}
                    textAlign={"right"}
                    color={"insideCard"}
                    onClick={() => {
                      setForgetPassword(true);
                    }}
                  >
                    Forget your password?
                  </FormHelperText>
                </FormControl>
              </ModalBody>
              <ModalFooter width={"100%"} paddingRight={"10px"}>
                <Button
                  backgroundColor={"insideCard"}
                  width={"100%"}
                  type="submit"
                  colorScheme="secundary"
                  color={"primary"}
                  mr={3}
                  _pressed={{ backgroundColor: "secundary" }}
                >
                  {!loading && <>Login</>}
                  {!!loading && <Spinner />}
                </Button>
              </ModalFooter>
            </ModalContent>
          </form>
        )}
        {forgetPassword && (
          <ForgetPassword
            setForgetPassword={setForgetPassword}
            validateEmail={validateEmail}
          />
        )}
      </Modal>
    </styled.Container>
  );
}
const validateEmail = (email: string) => {
  const isEmail = validator.isEmail(email) ? true : false;
  return isEmail;
};
