import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/Form";
import axiosInstance from "../../api/axiosInstance";
import { useNavigate } from "react-router-dom";

function AddItemPage({ setItems, categories }) {
  const navigate = useNavigate();
  // const [categories, setCategories] = useState([]);
  // useEffect(() => {
  //   axiosInstance("/categories").then(({ data }) => setCategories(data));
  // }, []);

  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      const formData = Object.fromEntries(new FormData(e.target));
      const { data } = await axiosInstance.post("/items/newItem", formData);
      setItems((prev) => [...prev, data]);
      navigate("/");
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  return (
    <Container>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="exampleForm.SelectCustom">
          <Form.Label>Category</Form.Label>
          <Form.Select aria-label="Default select example" name="category_id">
            <option>Open this select menu</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            placeholder="Enter items' name"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            name="description"
            placeholder="Enter items' description"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="text"
            name="price"
            placeholder="Enter items' price"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Label>Image</Form.Label>
          <Form.Control
            type="text"
            name="image"
            placeholder="Enter image URL"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
}

export default AddItemPage;
