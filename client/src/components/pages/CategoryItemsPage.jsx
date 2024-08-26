import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import { useParams } from "react-router-dom";
import Container from "react-bootstrap/esm/Container";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import ItemCard from "../ui/ItemCard";

function CategoryItemsPage({ user }) {
  const [items, setItems] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axiosInstance(`/categories/${id}/items`).then(({ data }) => setItems(data));
  }, [id]);

  return (
    <Container style={{ marginTop: 40 }}>
      <Row className="g-4">
        {items.map((item) => (
          <Col key={item.id} sm={12} md={6} lg={4} className="d-flex">
            <ItemCard item={item} user={user} className="h-100 w-100" />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default CategoryItemsPage;
