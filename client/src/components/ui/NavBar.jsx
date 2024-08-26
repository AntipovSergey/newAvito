import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";

function NavBar({ user, logoutHandler }) {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    axiosInstance("/categories").then(({ data }) => setCategories(data));
  }, []);
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          Avito
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title="Categories" id="basic-nav-dropdown">
              {categories.map((category) => (
                <NavDropdown.Item
                  as={NavLink}
                  to={`/category/${category.id}`}
                  key={category.id}
                >
                  {category.name}
                </NavDropdown.Item>
              ))}
            </NavDropdown>
            {user.status === "logged" ? (
              <>
                <Nav.Link as={NavLink} to="/user">
                  Add item
                </Nav.Link>
                <Nav.Link as={NavLink} onClick={logoutHandler}>
                  Logout
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={NavLink} to="/auth/signin">
                  Sign in
                </Nav.Link>
                <Nav.Link as={NavLink} to="/auth/signup">
                  Sign up
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
