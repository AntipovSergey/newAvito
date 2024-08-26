import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import ItemCard from "../ui/ItemCard";
import EditModal from "../ui/EditModal";

export default function MainPage({user, items, setItems, modalContent, setModalContent, deleteHandler, editHandler}) {
  return (
    <Container style={{ marginTop: 40 }}>
      <Row className="g-4">
        {items.map((item) => (
          <Col key={item.id} sm={12} md={6} lg={4} className="d-flex">
            <ItemCard item={item} user={user} setItems={setItems} setModalContent={setModalContent} deleteHandler={deleteHandler} className="h-100 w-100" />
          </Col>
        ))}
      </Row>
      <EditModal setModalContent={setModalContent} modalContent={modalContent} editHandler={editHandler}/>
    </Container>
  );
}
