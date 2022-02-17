import React, { useEffect, useState } from "react";
import { Container, Row, Col, Spinner, Alert } from "react-bootstrap";
import { API } from "../../static/API";
import Media from "../components/Media";
import { eventListState } from "../abstract/EventContext";
import { useRecoilState } from "recoil";

const Index = () => {
  const [events, setEvents] = useRecoilState(eventListState);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const abortC = new AbortController();

    const fetchEvents = async () => {
      try {
        setIsLoading(() => {
          return true;
        });
        const response = await fetch(`${API.url}/event`, {
          signal: abortC.signal,
        });

        if (response.ok) {
          const data = await response.json();

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

    if (events.length === 0) {
      fetchEvents();
    }

    return () => {
      abortC.abort();
    };
  }, [setEvents, events]);

  return (
    <div className="my-4">
      <Container>
        <section>
          <h1 className="h2 fw-bold mb-4">Event list</h1>
          {events.length > 0 && (
            <Row>
              {events.map((item) => {
                return (
                  <Col
                    xs={6}
                    md={4}
                    lg={3}
                    className="mb-4 d-flex"
                    key={item.id}
                  >
                    <Media item={item} />
                  </Col>
                );
              })}
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
