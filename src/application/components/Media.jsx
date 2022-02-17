import React from "react";
import { Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import CategoryBadge from "./CategoryBadge";

const Media = ({ item }) => {
  return (
    <Card className="media flex-grow-1">
      <Card.Img src={item.image_path} />
      <Card.Body className="flex-grow-1 d-flex flex-column justify-content-between">
        <div>
          <CategoryBadge id={item.category_id} />
          <Card.Title
            as="h2"
            className="h5 pb-2 mb-2 fw-bold border-bottom border-2 border-success"
          >
            {item.title}
          </Card.Title>
          <p className="media__text">{item.description}</p>
        </div>
        <Button
          variant="success"
          as={Link}
          to={`/media-view/${item.id}`}
          className="w-100"
        >
          See more
        </Button>
      </Card.Body>
    </Card>
  );
};

export default Media;
