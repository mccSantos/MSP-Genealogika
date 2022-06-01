import { api } from "../../services/api";
import { useState, useEffect,FormEvent } from "react";
import Button from "react-bootstrap/button";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Navbar from "react-bootstrap/Navbar";
import Popover from "@mui/material/Popover";
import { OrgDiagram, FamDiagram } from "basicprimitivesreact";
import Container from "react-bootstrap/Container";
import { PageFitMode, Enabled, GroupByType} from 'basicprimitives';
import {AdviserPlacementType, AnnotationType, Size} from 'basicprimitives';
import { ConnectorShapeType, Colors, LineType, ConnectorPlacementType } from 'basicprimitives';

import logo from "../../assets/Genealogika_logo.png";
import { NavDropdown,Modal } from "react-bootstrap";

var photos = {
  a: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAA8CAIAAACrV36WAAAAAXNSR0IArs4c6QAAAARn' + 
  'QU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAGnSURBVGhD7dnBbQJBDAVQk1o2QjlQwKYGzpSwKQfq4IxIC' + 
  'RTB9jLZHCJFwWv7/7EiDt6zmX2yPYMHNq01eb7n5flI36JiIXWpbFW2kAwgsdVblS0kA0hs9db/ZWs+vW/Wno9PxPE3dh' + 
  'ls6Od+HI1XT1d64Sb8R5utEulwdbA8VY+LZ/kqkfF456pBHxDz5Xxze/p2vsxukBbAshTVOE0PO4B2cUlWKrgUTKsrV0e' + 
  'ut3RVU/cm5aKKqPXVbjuIDPtDUh2JImq1+jmjkupIFNFStXadHncWXkecpb3393me4oJZnionXyjLV6W4QFZEleHCWNG+' + 
  '0eKggQJiRVV6vhAXwoqrul0AC1H1uuIsTLUyukYH1jBL7WJ8lgq6oqwkVXSQDrLSVEFXjJWoirlCrFRVyBVhJasirgCr6' + 
  '5tEv7a5A5jL0tcN7vNl9OVcHqtXRbocVr+Kc9k3H/3qPL69Ise7dh0SsS+2JmtFddgvdy/gGbY7Jdp2GRcyrlu1BfUjxt' + 
  'iPRm/lqVbGHOMHnU39zQm0I/UbBLA+GVosJHGVrcoWkgEktnoLydYXkF/LiXG21MwAAAAASUVORK5CYII='
};
type NodeDB = {
  id: string;
  name: string;
  parents: NodeDB[];
  children: NodeDB[];
};

let nodes = [];


export function TreeHome() {
  const [search, setSearch] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const[newNode, setNewNode] = useState("");
  function processNodes() {
  
    const [tree, setTree] = useState<NodeDB[]>([]);
  
    useEffect(() => {
      api.get<NodeDB[]>("Node")
      .then((response) => {
          setTree(response.data);
      }).catch((error) => {
        console.log(error.response.status);
        if (error.response.status == 401) {
          alert("Sem cookie");
        }
      });
    });
  
    for(var i = 0; i < tree.length; i++){
      var p = tree[i].parents;
      var parentsResult = [];
      for(var j = 0; j < p.length; j++){
        parentsResult.push(p[j].id);
      }
      nodes.push({
        id: tree[i].id,
        parents: parentsResult,
        title: tree[i].name,
        image: logo
      });
    }
  };

//const [pop, setPop] = useState<HTMLButtonElement | null>(null);

 /* const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setPop(event.currentTarget);
  };
  const handleClose = () => {
    setPop(null);
  };*/
  /*<Popover id={id} open={open}  anchorEl={pop} onClose={handleClose} 
            anchorOrigin={{ vertical: "bottom",horizontal: "left", }} >
            <Button size="sm"> </Button>
              </Popover>*/

  function SelectNodes(){
    if(search == ""){
      processNodes();
    }else{
      var newNodes = [];
      for(var i = 0; i < nodes.length; i++){
        var node = nodes[i];
        if(node.title == search){
          newNodes.push({
            id: node.id,
            parents: node.parents,
            title: node.title,
            image: logo
          });
          var p = node.parents;
          for(var j = 0; j < p.length;j++){
            for(var k = 0; k < nodes.length; k++){
              if(nodes[i].id == p[j]){
                newNodes.push({
                  id: nodes[i].id,
                  parents: nodes[i].parents,
                  title: nodes[i].title,
                  image: logo
                });
              }
            }
          }
          break;
        }
      }
    }
  };

  async function CreateNewNode(event: FormEvent){

    event.preventDefault();
    if (!newNode.trim()) {
      return;

    }
      await api.post("create-node", { newNode });
      handleClose;
  }
  /*const config = {
    pageFitMode: PageFitMode.FitToPage,
    cursorItem: 2,
    linesWidth: 1,
    linesColor: "black",
    hasSelectorCheckbox: Enabled.True,
    normalLevelShift: 20,
    dotLevelShift: 20,
    lineLevelShift: 20,
    normalItemsInterval: 10,
    dotItemsInterval: 30,
    lineItemsInterval: 30,
    arrowsDirection: GroupByType.Parents,
    showExtraArrows: false,
    items: [
      { id: 1, title: "Thomas Williams", label: "Thomas Williams", description: "1st husband", image: photos.a },
      { id: 2, title: "Mary Spencer", label: "Mary Spencer", description: "The Mary",image: photos.a },
      { id: 3, title: "David Kirby", label: "David Kirby", description: "2nd Husband", image: photos.a },
      { id: 4, parents: [1, 2], title: "Brad Williams", label: "Brad Williams", description: "1st son", image: photos.a },
      { id: 5, parents: [2, 3], title: "Mike Kirby", label: "Mike Kirby", description: "2nd son, having 2 spouses", image: photos.a},
      { id: 6, title: "Lynette Maloney", label: "Lynette Maloney", description: "Spouse I", image: photos.a },
      { id: 11, parents: [5, 6], title: "Steven Powell", label: "Steven Powell", description: "1st son", image: photos.a },
      { id: 7, title: "Sara Kemp", label: "Sara Kemp", description: "Spouse II", image: photos.a },
      { id: 12, parents: [5, 7], title: "John Smith", label: "John Smith", description: "2ns son", image: photos.a },
      { id: 8, parents: [7], title: "Leon Kemp", label: "Leon Kemp", description: "", image: photos.a }
    ]
  }; */
  const config = {
    pageFitMode: PageFitMode.FitToPage,
    cursorItem: 0,
    highlightItem: 0,
    hasSelectorCheckbox: Enabled.True,
    items: [
      {
        id: 0,
        parent: null,
        title: 'James Smith',
        description: 'VP, Public Sector',
        image: photos.a
      },
      {
        id: 1,
        parent: 0,
        title: 'Ted Lucas',
        description: 'VP, Human Resources',
        image: photos.a
      },
      {
        id: 2,
        parent: 0,
        title: 'Fritz Stuger',
        description: 'Business Solutions, US',
        image: photos.a
      }
    ]
  }; 

 
  return (
    <div>
      <Navbar bg="light" expand="lg" sticky="top">
      <Container fluid>
        <Navbar.Brand href="/">Home</Navbar.Brand>
        <Form className="d-flex">
          <FormControl
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
            onChange = {(event) => setSearch(event.target.value)}
          />
          <Button type="button" onClick={SelectNodes} variant="outline-success">
            Search
          </Button >
        </Form>
        <Button type="button"  onClick = {handleShow} variant="success" >Add</Button>
        </Container>
      </Navbar>
      <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Adding a new Person to the Tree</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="name"
                  autoFocus
                  onChange = {(event) => setNewNode(event.target.value)}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={CreateNewNode}>
              Add New Person
            </Button>
          </Modal.Footer>
        </Modal>

        <div className="placeholder">
        <OrgDiagram centerOnCursor={true} config={config} />
        </div>
          



    </div>
    
  );
}


