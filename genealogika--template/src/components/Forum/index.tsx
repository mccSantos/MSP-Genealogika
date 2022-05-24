import styles from "./styles.module.scss";
import logo from "../../assets/Genealogika_logo.png";
import { useNavigate } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/button";

import { api } from "../../services/api";
import { useState, FormEvent } from "react";
import io from "socket.io-client";

type Ticket = {
  id: string;
  subject: string;
  content: string;
  user: {
    name: string;
  };
};

const socket = io("http://localhost:4000");

socket.on("new_ticket", (newTicket) => {
  console.log(newTicket);
});

export function Forum() {
  const [subject, setSubject] = useState("");
  //const [user, setUser] = useState("");

  async function handleSearch(event: FormEvent) {
    if (!subject.trim()) return;

    await api.get("tickets-by-subject", {});
  }
  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Container fluid>
          <Navbar.Brand href="/">Home</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />

          <Form className="d-flex">
            <FormControl
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              onSubmit={handleSearch}
              onChange={(event) => setSubject(event.target.value)}
              value={subject}
            />
            <Button type="submit" variant="outline-success">
              Search
            </Button>
          </Form>
        </Container>
      </Navbar>
      <div></div>
    </div>
  );
}
