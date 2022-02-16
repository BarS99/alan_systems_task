import React, { useEffect, useState } from "react";
import { Container, Row, Col, Spinner, Alert, Button } from "react-bootstrap";
import { API } from "../../static/API";
import Media from "../components/Media";
import { eventListState, eventPaginationState } from "../abstract/EventContext";
import { useRecoilState } from "recoil";

const Index = () => {
  const [events, setEvents] = useRecoilState(eventListState);
  const [isLoading, setIsLoading] = useState(false);
  const [pagination, setPagination] = useRecoilState(eventPaginationState);

  const incrementPagination = (e) => {
    e.preventDefault();

    setPagination((prev) => {
      return prev + 1;
    });
  };

  useEffect(() => {
    const abortC = new AbortController();

    const fetchEvents = async () => {
      try {
        setIsLoading(() => {
          return true;
        });
        const response = await fetch(
          `${API.url}/event?page=${pagination}&limit=8`,
          { signal: abortC.signal }
        );

        if (response.ok) {
          const data = await response.json();

          if (data.length === 0) {
            setPagination(() => {
              return false;
            });
          }

          setEvents((prev) => {
            return [...prev, ...data];
          });
        } else {
          throw new Error("Failed to fetch the data!");
        }
      } catch {
      } finally {
        setIsLoading(() => {
          return false;
        });
      }
    };

    if (pagination !== false) {
      fetchEvents();
    }

    return () => {
      abortC.abort();
    };
  }, [pagination, setEvents, setPagination]);

  return (
    <div className="my-4">
      <Container>
        <section>
          <h1 className="h2 fw-bold mb-4">Event list</h1>
          {events.length > 0 && (
            <Row>
              {events.map((item) => {
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
          {!isLoading && events.length === 0 && (
            <Alert variant="danger my-4">The event list is empty!</Alert>
          )}
        </section>
      </Container>
    </div>
  );
};

export default Index;
