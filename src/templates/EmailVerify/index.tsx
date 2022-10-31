import { Background } from "../../components/Background";
import React from "react";
import Link from "next/link";

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
} from "@chakra-ui/react";
import ApiRequests from "../../services/apiRequests";
import { useRouter } from "next/router";

export function EmailVerify() {
  const { isOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const router = useRouter();
  const [sucess, setSucess] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    const { token, id } = router.query;
    if (router.isReady) {
      if (typeof token === "string" && typeof id === "string") {
        ApiRequests.emailVerify(token, id)
          .then(() => {
            setLoading(false);
            setSucess(true);
          })
          .catch(() => {
            setLoading(false);
          });
      }
    }
  }, [router.isReady]);

  return (
    <Background>
      <div
        style={{
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {!loading && (
          <Modal
            isCentered={true}
            initialFocusRef={initialRef}
            finalFocusRef={finalRef}
            isOpen={true}
            onClose={onClose}
          >
            <ModalOverlay />
            <ModalContent background={"primary"}>
              <ModalHeader color={"secundary"} ml={1} marginBottom={"-2"}>
                {!!sucess && <> Account Verified</>}
                {!sucess && <> Error to verify</>}
              </ModalHeader>
              <ModalBody color={"secundary"}>
                {!!sucess && (
                  <Text ml={1}>Now you are able to login in your account</Text>
                )}
                {!sucess && (
                  <Text ml={1}>
                    An error occurred while verifying your account. This error
                    may appear if your account is already verified
                  </Text>
                )}
              </ModalBody>

              <ModalFooter>
                <Button
                  color={"primary"}
                  background={"insideCard"}
                  colorScheme="secundary"
                  _hover={{ transform: "scale(1.02)" }}
                  mr={1}
                >
                  <Link href={"/"}>
                    <a>Home</a>
                  </Link>
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        )}
        {!!loading && <Spinner width={10} height={10} />}
      </div>
    </Background>
  );
}
