import styles from "./styles.module.scss";
import logo from "../../assets/Genealogika_logo.png";
import { useNavigate } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import {Modal } from "react-bootstrap";
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
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const[newTicket, setNewTicket] = useState("");
  const[content, setNewContent] = useState("");
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [subject, setSubject] = useState("");
  const [user, setUser] = useState("");
  useEffect(() => {
    getId();
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

  async function getId(){
    await api.get("id-from-token").then((response) => {
      setUser(response.data);
    });
  }

  async function handleSearch(event: FormEvent) {
    getId();
    if (!subject.trim()) return;

    await api.get("tickets-by-subject", {});
  }

  async function handleAddTicket(event: FormEvent){
    if (!newTicket.trim() || !content.trim()) return;
    
    await api.post("create-ticket",{newTicket,content,user});
    handleClose;
  }


  return (
    <div>
      <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Adding a new Person to the Tree</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Subject</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Assunto"
                  autoFocus
                  onChange = {(event) => setNewTicket(event.target.value)}
                />
              </Form.Group>
            </Form>
            <Form>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Content</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Conteudo"
                  autoFocus
                  onChange = {(event) => setNewContent(event.target.value)}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleAddTicket }>
              Add Ticket
            </Button>
          </Modal.Footer>
        </Modal>
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
            onClick={handleShow}
            variant="outline-success"
            className={styles.btn}
          >
            Help?
          </Button>
        </Container>
      </Navbar>
      <div>
        <table >
          <tr>
            <th>id</th>
            <th>Name</th>
            <th>Subject</th>
            <th>Content</th>
          </tr>
          {tickets.map((val,key) => {
            return (
              <tr key={key} >
                <td>{val.id}</td>
                <td>{val.user.name}</td>
                <td>{val.subject}</td>
                <td>{val.content}</td>
              </tr>
            );
          })}
        </table>
      </div>
    </div>
  );
}

