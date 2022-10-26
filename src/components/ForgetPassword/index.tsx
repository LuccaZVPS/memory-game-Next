import { Dispatch, useEffect, useState } from "react";

import {
  Button,
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
  Box,
  Text,
} from "@chakra-ui/react";
import React, { FormEvent } from "react";
import { MdMarkEmailRead } from "react-icons/md";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as styled from "./styles";
interface props {
  validateEmail: (email: string) => boolean;
  setForgetPassword: Dispatch<boolean>;
}
export function ForgetPassword({ validateEmail, setForgetPassword }: props) {
  const [email, setEmail] = useState("");
  const [sucess, setSucess] = useState(false);
  const [loading, setLoading] = useState(false);
  const initialRef = React.useRef(null);
  useEffect(() => {
    setSucess(false);
  }, []);
  const submitEmail = (e: FormEvent) => {
    e.preventDefault();
    if (loading) {
      return;
    }

    setLoading(true);
    if (!validateEmail(email)) {
      toast.error("Invalid email", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setLoading(false);

      return;
    }

    axios
      .post(
        `${process.env.NEXT_PUBLIC_DOMAIN_NAME}/api/change-password/allow`,
        {
          email: email,
        }
      )
      .then(() => {
        setSucess(true);
      })
      .catch((e) => {
        if (axios.isAxiosError(e)) {
          toast.error("Unregistred email", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <>
      {" "}
      <ModalContent background={"card2"}>
        {!sucess && (
          <form onSubmit={submitEmail}>
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
            <ModalHeader color={"insideCard"}>
              Forget your password?
            </ModalHeader>
            <ModalCloseButton color={"secundary"} />

            <ModalBody pb={1}>
              <FormControl>
                <FormLabel color={"secundary"}>Account email</FormLabel>
                <Input
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  color={"secundary"}
                  borderColor={"grey"}
                  focusBorderColor={"insideCard"}
                  ref={initialRef}
                  placeholder="example@gmail.com"
                />
                <FormHelperText
                  cursor={"pointer"}
                  textAlign={"right"}
                  color={"insideCard"}
                  onClick={() => {
                    setForgetPassword(false);
                  }}
                >
                  Go back to login
                </FormHelperText>
              </FormControl>
            </ModalBody>
            <ModalFooter paddingRight={"10px"}>
              <Button
                backgroundColor={"insideCard"}
                type="submit"
                colorScheme="secundary"
                color={"primary"}
                mr={3}
              >
                {!loading && <>Send</>}
                {!!loading && <Spinner />}
              </Button>
            </ModalFooter>
          </form>
        )}
        {sucess && (
          <ModalBody>
            <ModalCloseButton color={"secundary"} />

            <Box
              marginTop={"10px"}
              display={"flex"}
              justifyContent={"center"}
              width={"100%"}
              flexDirection={"column"}
              alignItems={"center"}
              textAlign={"center"}
            >
              <styled.Container>
                <MdMarkEmailRead style={{ fontSize: "40px" }} />
              </styled.Container>
              <Text color={"secundary"} fontSize={"1.2rem"}>
                Check your email inbox
              </Text>
              <Text color={"secundary"} marginTop={"20px"}>
                To change your password, please click on the link in the email
                we sent you.
              </Text>
            </Box>
          </ModalBody>
        )}
      </ModalContent>
    </>
  );
}
