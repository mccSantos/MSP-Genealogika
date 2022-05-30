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
import { useState, FormEvent, useEffect } from "react";

//import io from "socket.io-client";

type Ticket = {
  id: string;
  subject: string;
  content: string;
  user: {
    name: string;
  };
};

//const socket = io("http://localhost:4000");

//socket.on("new_ticket", (newTicket) => {
// console.log(newTicket);
//});

export function Forum() {
  const navigate = useNavigate();

  const navigateTicketForm = () => {
    navigate("/");
  };
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [subject, setSubject] = useState("");
  //const [user, setUser] = useState("");
  useEffect(() => {
    /*api
      .post(
        "login",
        {
          email: "user1@email.email",
          password: "pwd",
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      )
      .then(() => {*/
    api
      .get<Ticket[]>("tickets")
      .then((response) => {
        setTickets(response.data);
        //});
      })
      .catch((error) => {
        console.log(error.response.status);
        if (error.response.status == 401) {
          alert("Sem cookie");
        }
      });
  });

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
            <Button type="submit" variant="success" className={styles.btn}>
              Search
            </Button>
          </Form>
          <Button
            type="button"
            onClick={navigateTicketForm}
            variant="outline-success"
            className={styles.btn}
          >
            Help?
          </Button>
        </Container>
      </Navbar>
      <div>
        <ul>
          {tickets.map((ticket) => {
            return (
              <li key={ticket.id} className={styles.listItem}>
                {ticket.user.name} - {ticket.subject} - {ticket.content}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
