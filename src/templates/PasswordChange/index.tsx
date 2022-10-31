import { useRouter } from "next/router";
import React, { FormEvent, useEffect, useState } from "react";
import { Background } from "../../components/Background";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Modal,
  Button,
  ModalBody,
  ModalOverlay,
  ModalContent,
  Text,
  ModalHeader,
  ModalFooter,
  useDisclosure,
  Spinner,
  FormControl,
  Input,
  FormLabel,
} from "@chakra-ui/react";
import axios from "axios";
export default function ChangePassword() {
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isAllowed, setIsAllowed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [loadingChange, setLoadingChange] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    var { token, id } = router.query;

    axios
      .get(
        `${process.env.NEXT_PUBLIC_DOMAIN_NAME}/api/change-password/${token}/${id}`
      )
      .then(() => {
        setIsAllowed(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [router.isReady]);

  const submitForm = (e: FormEvent) => {
    e.preventDefault();
    if (loadingChange) {
      return;
    }

    var { token, id } = router.query;
    if (!validatePasswordLenght(password, password2)) {
      toast.error("Password must have 8/30 characters", {
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
    if (!validatePasswordEqual(password, password2)) {
      toast.error("Passwords do not match", {
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
    setLoadingChange(true);

    axios
      .put(
        `${process.env.NEXT_PUBLIC_DOMAIN_NAME}/api/change-password/${token}/${id}`,
        { password }
      )
      .then(() => {
        router.push("/");
      })
      .catch((e) => {
        toast.error("an error occurred while changing the password", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setLoadingChange(false);
      });
  };

  return (
    <Background>
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
      {!!loading && (
        <div
          style={{
            position: "absolute",
            left: "calc(50% - 50px)",
            top: "calc(50% - 50px)",
          }}
        >
          <Spinner width={"100px"} height={"100px"} />
        </div>
      )}
      {!loading && (
        <Modal
          isCentered={true}
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={true}
          onClose={onClose}
        >
          <ModalOverlay background={"rgba(0, 0, 0, 0.2)"} />
          {!!isAllowed && (
            <form onSubmit={submitForm}>
              <ModalContent backgroundColor={"card"}>
                <ModalHeader color={"insideCard"}>New password</ModalHeader>
                <ModalBody pb={6}>
                  <FormControl>
                    <FormLabel color={"secundary"}>Password</FormLabel>
                    <Input
                      type={"password"}
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                      ref={initialRef}
                      placeholder="your password"
                    />
                  </FormControl>

                  <FormControl mt={4}>
                    <FormLabel color={"secundary"}>Confirm password</FormLabel>
                    <Input
                      type={"password"}
                      onChange={(e) => {
                        setPassword2(e.target.value);
                      }}
                      placeholder="confirm you password"
                    />
                  </FormControl>
                </ModalBody>

                <ModalFooter>
                  <Button
                    color={"primary"}
                    colorScheme="secundary"
                    type="submit"
                    backgroundColor={"insideCard"}
                    mr={3}
                  >
                    {loadingChange && <Spinner />}
                    {!loadingChange && <>Save</>}
                  </Button>
                </ModalFooter>
              </ModalContent>
            </form>
          )}
          {!isAllowed && (
            <ModalContent>
              <ModalHeader>Invalid link</ModalHeader>
              <ModalBody marginTop={-4} pb={6}>
                <p>this error can occur if the link has already been used</p>
              </ModalBody>
            </ModalContent>
          )}
        </Modal>
      )}
    </Background>
  );
}
const validatePasswordLenght = (password: String, password2: String) => {
  var status = true;
  if (password.length > 30 || password.length < 8) {
    status = false;
  } else if (password !== password2) {
    status = true;
  }
  return status;
};
const validatePasswordEqual = (password: String, password2: String) => {
  var status = true;
  if (password !== password2) {
    status = false;
  }
  return status;
};
