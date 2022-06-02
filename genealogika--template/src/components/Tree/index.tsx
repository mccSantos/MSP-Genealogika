import { api } from "../../services/api";
import { useState, useEffect, FormEvent } from "react";
import Button from "react-bootstrap/button";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Navbar from "react-bootstrap/Navbar";
import Popover from "@mui/material/Popover";
import { OrgDiagram, FamDiagram } from "basicprimitivesreact";
import Container from "react-bootstrap/Container";
import { PageFitMode, Enabled, GroupByType , LCA,Tree} from "basicprimitives";
import { AdviserPlacementType, AnnotationType, Size } from "basicprimitives";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faUserSlash } from '@fortawesome/free-solid-svg-icons';
import {
  ConnectorShapeType,
  Colors,
  LineType, 
  ConnectorPlacementType,
} from "basicprimitives";

import logo from "../../assets/Genealogika_logo.png";
import { NavDropdown, Modal } from "react-bootstrap"; 
import styles from "./styles.module.scss";


var photos = {
  a:
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAA8CAIAAACrV36WAAAAAXNSR0IArs4c6QAAAARn" +
    "QU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAGnSURBVGhD7dnBbQJBDAVQk1o2QjlQwKYGzpSwKQfq4IxIC" +
    "RTB9jLZHCJFwWv7/7EiDt6zmX2yPYMHNq01eb7n5flI36JiIXWpbFW2kAwgsdVblS0kA0hs9db/ZWs+vW/Wno9PxPE3dh" +
    "ls6Od+HI1XT1d64Sb8R5utEulwdbA8VY+LZ/kqkfF456pBHxDz5Xxze/p2vsxukBbAshTVOE0PO4B2cUlWKrgUTKsrV0e" +
    "ut3RVU/cm5aKKqPXVbjuIDPtDUh2JImq1+jmjkupIFNFStXadHncWXkecpb3393me4oJZnionXyjLV6W4QFZEleHCWNG+" +
    "0eKggQJiRVV6vhAXwoqrul0AC1H1uuIsTLUyukYH1jBL7WJ8lgq6oqwkVXSQDrLSVEFXjJWoirlCrFRVyBVhJasirgCr6" +
    "5tEv7a5A5jL0tcN7vNl9OVcHqtXRbocVr+Kc9k3H/3qPL69Ise7dh0SsS+2JmtFddgvdy/gGbY7Jdp2GRcyrlu1BfUjxt" +
    "iPRm/lqVbGHOMHnU39zQm0I/UbBLA+GVosJHGVrcoWkgEktnoLydYXkF/LiXG21MwAAAAASUVORK5CYII=",
};

type NodeDB = {
  id: string;
  name: string;
  parents: NodeDB[];
  children: NodeDB[];
};


export function TreeHome() {
  const [search, setSearch] = useState("");
  const [show, setShow] = useState(false);
 

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
   
  const [showParent, setshowParent] = useState(false);
  const handleCloseP = () => setShow(false);
  const handleShowP = () => setShow(true);
  const [newNodeP, setNewNodeP] = useState("");
  var itemC = {id: "ansd"};
  const [newNode, setNewNode] = useState("");
  const [firstRun, setFirstRun] = useState(true);
  //const [tree, setTree] = useState<NodeDB[]>([]);
  const [nodes, setNodes] = useState([]);
  if (firstRun) {
    SelectNodes();
    setFirstRun(false);
  }
  /*this.onAddButtonClick = onAddButtonClick.bind(this);
  this.onRemoveButtonClick = onRemoveButtonClick.bind(this);

  

  function onRemoveButtonClick(itemConfig) {
    const { items } = this.state;

    this.setState(this.getDeletedItems(items, [itemConfig.id]));
  }

  function getDeletedItems(items = [], deletedItems = []) {
    const tree = this.getTree(items);
    const hash = deletedItems.reduce((agg, itemid) => {
      agg.add(itemid.toString());
      return agg;
    }, new Set());
    const cursorParent = this.getDeletedItemsParent(tree, deletedItems, hash);
    const result = [];
    tree.loopLevels(this, (nodeid, node) => {
      if (hash.has(nodeid.toString())) {
        return tree.SKIP;
      }
      result.push(node);
    });

    return {
      items: result,
      cursorItem: cursorParent
    };
  }

  function getDeletedItemsParent(tree, deletedItems, deletedHash) {
    let result = null;
    const lca = LCA(tree);
    result = deletedItems.reduce((agg, itemid) => {
      if (agg == null) {
        agg = itemid;
      } else {
        agg = lca.getLowestCommonAncestor(agg, itemid);
      }
      return agg;
    }, null);

    if (deletedHash.has(result.toString())) {
      result = tree.parentid(result);
    }
    return result;
  }*/
    
  
/*
  function getTree(items = []) {
    const tree = Tree();

    // rebuild tree
    for (let index = 0; index < items.length; index += 1) {
      const item = items[index];
      tree.add(item.parent, item.id, item);
    }

    return tree;
  }*/
  async function CreateNewNodeP(event: FormEvent) {
    event.preventDefault();
    if (!newNode.trim()) {
      return;
    }
    var id = itemC.id;
    await api.post("create-node-parent", { name: newNode, id });
    processNodes();

  }
  async function CreateNewNode(event: FormEvent) {
    event.preventDefault();
    if (!newNode.trim()) {
      return;
    }
    await api.post("create-node", { name: newNode });
    handleClose();
  }
  function processNodes() {
    api
      .get<NodeDB[]>("nodes")
      .then((response) => {
        let tree = response.data;
        let nodes = [];
        for (var i = 0; i < tree.length; i++) {
          var p = tree[i].parents;
          var parentsResult = [];
          if (p)
            for (var j = 0; j < p.length; j++) {
              parentsResult.push(p[j].id);
            }
          if (parentsResult.length == 0) {
            parentsResult = null;
          }
          nodes.push({
            id: tree[i].id,
            parents: parentsResult,
            title: tree[i].name,
            image: logo,
          });
        }
        setNodes(nodes);
      })
      .catch((error) => {
        if (error.response.status == 401) {
          alert("Sem cookie");
        }
      });
  }

  function SelectNodes() {
    if (search == "") {
      processNodes();
    } else {
      var newNodes = [];
      for (var i = 0; i < nodes.length; i++) {
        var node = nodes[i];
        if (node.title == search) {
          newNodes.push({
            id: node.id,
            parents: node.parents,
            title: node.title,
            image: logo,
          });
          var p = node.parents;
          for (var j = 0; j < p.length; j++) {
            for (var k = 0; k < nodes.length; k++) {
              if (nodes[i].id == p[j]) {
                newNodes.push({
                  id: nodes[i].id,
                  parents: nodes[i].parents,
                  title: nodes[i].title,
                  image: logo,
                });
              }
            }
          }
          break;
        }
      }
    }
  }
  const config = {
    pageFitMode: PageFitMode.AutoSize,
    autoSizeMinimum: { width: 100, height: 100 },
    cursorItem: 2,
    highlightItem: 0,
    hasSelectorCheckbox: Enabled.False,
    items: nodes,
    linesWidth: 1,
    linesColor: "black",
    normalLevelShift: 20,
    dotLevelShift: 20,
    lineLevelShift: 20,
    normalItemsInterval: 10,
    dotItemsInterval: 30,
    lineItemsInterval: 30,
    arrowsDirection: GroupByType.Children,
    showExtraArrows: false,
    onButtonsRender: (({ context: itemConfig }) => {
      return <>
        <button key="1" className="StyledButton"
          onClick={(event) => {
            event.stopPropagation();
            itemC = itemConfig;
            handleShowP;
          }}>
          <FontAwesomeIcon icon={faUserPlus} />
        </button>
        <button key="2" className="StyledButton"
          onClick={(event) => {
            event.stopPropagation();
            itemC = itemConfig;
            //onRemoveButtonClick(itemConfig);
          }}>
          <FontAwesomeIcon icon={faUserSlash} />
        </button>
      </>
    }),
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
              onChange={(event) => setSearch(event.target.value)}
            />
            <Button
              type="button"
              onClick={SelectNodes}
              variant="outline-success"
            >
              Search
            </Button>
          </Form>
          <Button type="button" onClick={handleShow} variant="success">
            Add
          </Button>
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
                onChange={(event) => setNewNode(event.target.value)}
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
      <Modal show={show} onHide={handleCloseP}>
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
                onChange={(event) => setNewNodeP(event.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseP}>
            Close
          </Button>
          <Button variant="primary" onClick={CreateNewNodeP}>
            Add New Person
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="App">
        <FamDiagram centerOnCursor={true} config={config} />
      </div>
    </div>
  );
}
