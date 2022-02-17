import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Image,
  Row,
  Col,
  Spinner,
  Alert,
  Button,
} from "react-bootstrap";
import { API } from "../../static/API";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faPhone,
  faEnvelope,
  faEarth,
} from "@fortawesome/free-solid-svg-icons";
import { timestampToDate, timestampToIsoDate } from "../../static/js/utilities";
import CategoryBadge from "../components/CategoryBadge";

const MediaView = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [media, setMedia] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        setIsLoading(() => {
          return true;
        });

        const response = await fetch(`${API.url}/event/${params.id}`);

        if (response.ok) {
          const data = await response.json();

          setMedia(() => {
            return data;
          });
        } else {
          throw new Error("Failed to fetch the media!");
        }
      } catch {
      } finally {
        setIsLoading(() => {
          return false;
        });
      }
    };

    fetchMedia();
  }, [params]);

  return (
    <div className="my-4">
      <Container>
        {media !== null && (
          <Row as="article">
            <Col xs={12} sm={6} md={4}>
              <Image src={media.image_path} fluid className="mb-3 mb-sm-0" />
            </Col>
            <Col xs={12} sm={6} md={8}>
              <h1 className="h1 fw-bold text-success mb-4">{media.title}</h1>
              <CategoryBadge id={media.category_id} />
              <time
                dateTime={timestampToIsoDate(media.date)}
                className="d-block mt-2"
              >
                <FontAwesomeIcon icon={faCalendar} className="me-2" />
                Date: {timestampToDate(media.date)}
              </time>
              <p className="d-block mt-2 mb-0">
                <FontAwesomeIcon icon={faEarth} className="me-2" />
                Place: {media.place}
              </p>
              <a
                href={`mailto:${media.email}`}
                title={media.email}
                className="d-block mt-2 text-reset"
              >
                <FontAwesomeIcon icon={faEnvelope} className="me-2" />
                E-mail: {media.email}
              </a>
              <a
                href={`tel:${media.phone}`}
                title={media.phone}
                className="d-block mt-2 text-reset"
              >
                <FontAwesomeIcon icon={faPhone} className="me-2" />
                Phone: {media.phone}
              </a>
              <p className="mt-4 lh-lg">{media.description}</p>
            </Col>
          </Row>
        )}
        {isLoading && (
          <div className="text-center">
            <Spinner animation="border" role="status">
              <div className="visually-hidden">Loading</div>
            </Spinner>
          </div>
        )}
        {!isLoading && media === null && (
          <Alert variant="danger my-4">Failed to load the data!</Alert>
        )}

        {!isLoading && (
          <div className="mt-4 text-center">
            <Button
              variant="success"
              onClick={() => {
                navigate(-1);
              }}
            >
              Previous page
            </Button>
          </div>
        )}
      </Container>
    </div>
  );
};

export default MediaView;
