import React, { useEffect, useState } from "react";
import { Container, Row, Col, Spinner, Alert, Button } from "react-bootstrap";
import { API } from "../../static/API";
import Media from "../components/Media";
import { eventListState } from "../abstract/EventContext";
import { useRecoilState } from "recoil";

const Index = () => {
  const [movies, setMovies] = useRecoilState(eventListState);
  const [isLoading, setIsLoading] = useState(true);
  const [pagination, setPagination] = useState(1);

  const incrementPagination = (e) => {
    e.preventDefault();

    setPagination((prev) => {
      return prev + 1;
    });
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setIsLoading(() => {
          return true;
        });
        const response = await fetch(
          `${API.url}/event?page=${pagination}&limit=8`
        );

        if (response.ok) {
          const data = await response.json();

          if (data.length === 0) {
            setPagination(() => {
              return false;
            });
          }

          setMovies((prev) => {
            return [...prev, ...data];
          });
        } else {
        }
      } catch {
      } finally {
        setIsLoading(() => {
          return false;
        });
      }
    };

    if (pagination !== false) {
      fetchMovies();
    }
  }, [pagination]);

  return (
    <div className="my-4">
      <Container>
        <section>
          <h1 className="h2 fw-bold mb-4">Movie list</h1>
          {movies.length > 0 && (
            <Row>
              {movies.map((item) => {
                return (
                  <Col xs={6} sm={4} md={3} className="mb-4" key={item.id}>
                    <Media item={item} />
                  </Col>
                );
              })}
              {isLoading === false && pagination !== false && (
                <div className="text-center mt-4">
                  <Button variant="dark" onClick={incrementPagination}>
                    Load more
                  </Button>
                </div>
              )}
            </Row>
          )}
          {isLoading && (
            <div className="my-4 text-center">
              <Spinner animation="border" role="status">
                <div className="visually-hidden">Loading</div>
              </Spinner>
            </div>
          )}
          {!isLoading && movies.length === 0 && (
            <Alert variant="danger my-4">The movie list is empty!</Alert>
          )}
        </section>
      </Container>
    </div>
  );
};

export default Index;
