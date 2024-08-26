import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function ItemCard({ item, user, setItems, setModalContent, deleteHandler }) {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img
        variant="top"
        src={item.image}
        style={{
          width: "100%",
          maxHeight: "200px", // Ограничиваем высоту изображения
          objectFit: "contain",
          padding: 5
        }}
      />
      <Card.Body style={{ display: "flex", flexDirection: "column", gap: "10px", height: "auto" }}>
        <Card.Title>{item.name}</Card.Title>
        <Card.Text>{item.description}</Card.Text>
        <Card.Text>Price: {item.price} dollars</Card.Text>
        {user.status === "logged" && user.data.id === item.user_id && (
          <>
            <Button variant="primary" onClick={() => setModalContent(item)}>
              Edit
            </Button>
            <Button variant="danger" onClick={() => deleteHandler(item.id)}>
              Delete
            </Button>
          </>
        )}
      </Card.Body>
    </Card>
  );
}

export default ItemCard;
