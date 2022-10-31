import { Dispatch } from "react";
import Modal from "../Modal";
import { useState, useEffect } from "react";
import { score, UsersTime } from "./types";
import * as styled from "./styles";
import axios, { AxiosResponse } from "axios";
import { Box, Spinner } from "@chakra-ui/react";
interface RankingsProps {
  display: Dispatch<boolean>;
}

export function Rankings({ display }: RankingsProps) {
  const [pagedData, setPagedData] = useState<score[]>([]);
  const [data, setData] = useState<score[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (data.length === 0) {
      axios
        .get("http://localhost:3000/api/user/time")
        .then((response: AxiosResponse) => {
          let array: score[] = [];
          const data = response.data as UsersTime[];
          data.forEach((item, number) => {
            let object: score = { ...item, position: number + 1 };
            array.push(object);
          });
          setData(array);
        });
    }
    setPagedData(data.slice(0, 4));
    if (data.length > 0) {
      setIsLoading(false);
    }
  }, [data]);

  const countPages = () => {
    const total = data.length % 4;
    if (total === 0) {
      return data.length / 4;
    }
    return Math.floor(data.length / 4 + 1);
  };

  const nextPage = () => {
    if (page === countPages()) {
      return;
    }
    let final = (page + 1) * 4;
    let first = final - 4;

    setPage(page + 1);
    setPagedData(data.slice(first, final));
  };
  const previousPage = () => {
    if (page === 1) {
      return;
    }
    let final = page * 4 - 4;
    let first = final - 4;
    setPage(page - 1);
    setPagedData(data.slice(first, final));
  };
  return (
    <Modal title="Rankings" setDisplay={display}>
      <styled.Container>
        <table>
          <thead>
            <tr>
              <td>#</td>
              <td>Nome</td>
              <td>Tempo</td>
            </tr>
          </thead>
          {!isLoading && (
            <tbody>
              {pagedData.map((score) => (
                <tr key={score.name}>
                  <td>{score.position}</td>
                  <td>{score.name}</td>
                  <td>{score.time}s</td>
                </tr>
              ))}
            </tbody>
          )}
          {isLoading && (
            <Box
              width={"100%"}
              display="flex"
              justifyContent={"center"}
              padding="1"
              backgroundColor={"primary"}
            >
              <Spinner color="secundary" />
            </Box>
          )}
        </table>
        <styled.pagination>
          <styled.triangle direction={true} onClick={previousPage} />
          {page}/{countPages()}
          <styled.triangle direction={false} onClick={nextPage} />
        </styled.pagination>
      </styled.Container>
    </Modal>
  );
}
