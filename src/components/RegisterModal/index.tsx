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
  Text,
  Spinner,
  Box,
} from "@chakra-ui/react";
import { MdMarkEmailRead } from "react-icons/md";
import React, { FormEvent, FormEventHandler, useEffect, useState } from "react";
import * as styled from "./styles";
import validateRegister from "../../services/validateRegister";
export function RegisterModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [loading, setLoading] = useState(false);
  const [isCreated, setIsCreated] = useState(false);
  useEffect(() => {
    setIsCreated(false);
  }, [isOpen]);
  const submitForm = async (e: FormEvent) => {
    e.preventDefault();

    if (loading || isCreated) {
      return;
    }
    setLoading(true);
    if (
      await validateRegister(email, username, password, password2, setLoading)
    ) {
      setIsCreated(true);
    }
  };
  return (
    <styled.Container>
      <Button
        _hover={{ background: "insideCard" }}
        className="btnRegister"
        onClick={onOpen}
      >
        Sign Up
      </Button>

      <Modal
        closeOnOverlayClick={false}
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay background={"rgba(0, 0, 0, 0.2)"} />
        <form action="" onSubmit={submitForm}>
          <ModalContent background={"card2"}>
            {!isCreated && (
              <ModalHeader color={"insideCard"}>Sign Up</ModalHeader>
            )}

            <ModalCloseButton color={"secundary"} />

            <ModalBody pb={6}>
              {!isCreated && (
                <>
                  <FormControl id="emailR">
                    <FormLabel color={"secundary"}>E-mail</FormLabel>
                    <Input
                      defaultValue={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      color={"secundary"}
                      borderColor={"grey"}
                      focusBorderColor={"insideCard"}
                      ref={initialRef}
                      placeholder="example@gmail.com"
                    />
                    <Text
                      color={"red.500"}
                      textAlign={"right"}
                      height={"1px"}
                    ></Text>
                  </FormControl>

                  <FormControl mt={4} id="usernameR">
                    <FormLabel color={"secundary"}>Username</FormLabel>
                    <Input
                      defaultValue={username}
                      onChange={(e) => {
                        setUsername(e.target.value);
                      }}
                      color={"secundary"}
                      borderColor={"grey"}
                      focusBorderColor={"insideCard"}
                      placeholder="nickname"
                    />
                    <Text
                      color={"red.500"}
                      textAlign={"right"}
                      height={"1px"}
                    ></Text>
                  </FormControl>

                  <FormControl mt={4} id="passwordR">
                    <FormLabel color={"secundary"}>Password</FormLabel>
                    <Input
                      type={"password"}
                      defaultValue={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                      color={"secundary"}
                      borderColor={"grey"}
                      focusBorderColor={"insideCard"}
                      placeholder="your password"
                    />
                    <Text
                      color={"red.500"}
                      textAlign={"right"}
                      height={"1px"}
                    ></Text>
                  </FormControl>

                  <FormControl mt={4} id="password2R">
                    <FormLabel color={"secundary"}>Confirm password</FormLabel>
                    <Input
                      type={"password"}
                      defaultValue={password2}
                      onChange={(e) => {
                        setPassword2(e.target.value);
                      }}
                      color={"secundary"}
                      borderColor={"grey"}
                      focusBorderColor={"insideCard"}
                      placeholder="Confirm your password"
                    />
                    <Text
                      color={"red.500"}
                      textAlign={"right"}
                      height={"1px"}
                    ></Text>
                  </FormControl>
                </>
              )}
              {!!isCreated && (
                <Box
                  marginTop={"40px"}
                  display={"flex"}
                  justifyContent={"center"}
                  width={"100%"}
                  flexDirection={"column"}
                  alignItems={"center"}
                  textAlign={"center"}
                >
                  <styled.Mail>
                    <MdMarkEmailRead style={{ fontSize: "40px" }} />
                  </styled.Mail>
                  <Text color={"secundary"} fontSize={"1.2rem"}>
                    Verify your email address
                  </Text>
                  <Text color={"secundary"} marginTop={"20px"}>
                    To confirm your email andress, please click on the link in
                    the email we sent you.
                  </Text>
                </Box>
              )}
            </ModalBody>

            <ModalFooter width={"100%"} paddingRight={"10px"}>
              {!isCreated && (
                <Button
                  backgroundColor={"insideCard"}
                  width={"100%"}
                  type="submit"
                  colorScheme="secundary"
                  color={"primary"}
                  mr={3}
                >
                  {!loading && <>Create</>}
                  {!!loading && <Spinner color="primary" />}
                </Button>
              )}
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </styled.Container>
  );
}
