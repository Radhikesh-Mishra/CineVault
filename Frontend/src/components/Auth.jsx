import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { registerUser, loginUser } from "../slices/authSlice.js";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isRegister) {
      dispatch(registerUser(form)).then(() => navigate("/"));
    } else {
      dispatch(loginUser({ email: form.email, password: form.password })).then(() => navigate("/"));
    }
  };

  return (
    <Container className="mt-5 pt-4">
      <h4>{isRegister ? "Register" : "Login"}</h4>
      <Form onSubmit={handleSubmit}>
        {isRegister && (
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" name="name" onChange={handleChange} />
          </Form.Group>
        )}
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" name="email" onChange={handleChange} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name="password" onChange={handleChange} />
        </Form.Group> <br />
        <Button type="submit">{isRegister ? "Register" : "Login"}</Button>
        <Button variant="link" onClick={() => setIsRegister(!isRegister)}>
          {isRegister ? "Already have an account? Login" : "Don't have an account? Register"}
        </Button>
      </Form>
    </Container>
  );
};

export default Auth;