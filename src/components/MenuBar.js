import React from "react";
import { Nav, Navbar, Container, Button } from "react-bootstrap";

import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, logout } from "../store/user/userSlice";

const MenuBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  console.log(user);
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/home">Final App</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/posts">Posts</Nav.Link>
            {user.isLoggedIn ? (
              <>
                <Nav.Link href="/profile">Profile</Nav.Link>
                <Button
                  variant="outline-light"
                  onClick={() => {
                    dispatch(logout());
                    navigate("/home");
                  }}
                >
                  Logout
                </Button>
              </>
            ) : (
              <Nav.Link href="/login">Login</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MenuBar;
