import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";

function SignInPage({ signInHandler }) {
  return (
    <Container>
      <Form
        style={{
          marginTop: 40,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        onSubmit={signInHandler}
      >
        <Form.Group
          className="mb-3"
          controlId="formBasicEmail"
          style={{ width: "100%" }}
        >
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" name="email" placeholder="Введите email" />
        </Form.Group>
        <Form.Group
          className="mb-3"
          controlId="formBasicPassword"
          style={{ width: "100%" }}
        >
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Введите пароль"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Войти
        </Button>
      </Form>
    </Container>
  );
}

export default SignInPage;
