import React from "react";
import { Card, Button} from "react-bootstrap";
import Skeleton from "react-loading-skeleton";
import "./style.css";
export default function CardAnimal({ animal }) {
  const handleLink = () => {
    window.location = `/animal/detail/id_animal=${animal.id_dong_vat}`;
  };
  return (
    <Card bg="none">
      <Card.Header>
        <Button variant="success" className="btn-more" onClick={handleLink}>Xem chi tiết</Button>
        {animal ? (
          <Card.Img
            src={animal.list_image.length > 0 && animal.list_image[0]}
          />
        ) : (
          <Skeleton borderRadius={8} />
        )}
      </Card.Header>
      <Card.Body>
        <Card.Title className="text-center">{animal.ten_tieng_viet}</Card.Title>
      </Card.Body>
    </Card>
  );
}
