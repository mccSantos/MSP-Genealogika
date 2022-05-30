import { api } from "../../services/api";
import { useState, FormEvent, useEffect, useRef } from "react";
import Button from "react-bootstrap/button";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Navbar from "react-bootstrap/Navbar";
import Popover from "@mui/material/Popover";
import { Box, Stack } from "@chakra-ui/layout";
import dynamic from "next/dynamic";
import React from 'react';
import Tree from 'react-tree-graph';
import 'react-tree-graph/dist/style.css';
import ReactFamilyTree from "react-family-tree";
import PersonNode from "./PersonNode";
import "./index.css";

const WIDTH = 280;
const HEIGHT = 125;


type Node = {
  id: string;
  name: string;
  parents: Node[];
  children: Node[];
};
let people =[];

/*function MyForm() {
  const [content, setContent] = useState("");
  return (
    <form>
      <label>
        Enter your Name:
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </label>
      <label>
        Enter your father:
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </label>
      <label>
        Enter your father:
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </label>
    </form>
  );
}*/



export default function processNodes() {
  //const [pop, setPop] = useState<HTMLButtonElement | null>(null);

 /* const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setPop(event.currentTarget);
  };
  const handleClose = () => {
    setPop(null);
  };*/

  const [tree, setTree] = useState<Node[]>([]);
  
  useEffect(() => {
    api.get<Node[]>("Node")
    .then((response) => {
        setTree(response.data);
    }).catch((error) => {
      console.log(error.response.status);
      if (error.response.status == 401) {
        alert("Sem cookie");
      }
    });
  });

  function buildTreeNode(idNode: String,nameNode: String){
    var node = {
      id: idNode,
      name: nameNode,
      childrens: []
    };
    return node;
  }

  for(var i = 0; i < tree.length; i++){
    if(tree[i].parents == []){
      var newNode = buildTreeNode(tree[i].id,tree[i].name);
      people.push(newNode);
    }
  }



  


  /*const open = Boolean(pop);
  const id = open ? "simple-popover" : undefined;
  /*const renderNewNode = (click: (datum: Node) => void) => {
    return (
      <g>
        <circle
          aria-describedby={id}
          r="15"
          fill={"#777"}
          onClick={() => handleClick}
        />
        <Popover
          id={id}
          open={open}
          anchorEl={pop}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <Button size="sm"> </Button>
        </Popover>
      </g>
    );
  };

  return (
    <Stack direction="row" spacing="md">
      <Box w="100%" h="100vh">
        <Tree
          data={tree}
          zoomable={true}
          onNodeClick={handleClick}
          translate={{
            x: 200,
            y: 200,
          }}
          renderCustomNodeElement={(nodeInfo) => renderNewNode(nodeInfo)}
        />
      </Box>
    </Stack>
  );*/
}

export function TreeHome() {
  const [rootId, setRootId] = useState(people[0].id);
  return (
    <div>
      <Navbar bg="light" expand="lg" sticky="top">
        <Navbar.Brand href="/">Home</Navbar.Brand>
        <Form className="d-flex">
          <FormControl
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
          />
          <Button type="submit" variant="outline-success">
            Search
          </Button>
        </Form>
        <Button type="button" value="Add Person" />
      </Navbar>
      <div>
        <ReactFamilyTree
          nodes={people}
          rootId={rootId}
          width={WIDTH}
          height={HEIGHT}
          renderNode={(node) => (
            <PersonNode
              key={node.id}
              id={node.id}
              gender={node.gender}
              node={node}
              onSubClick={setRootId}
              style={{
                width: WIDTH,
                height: HEIGHT,
                // padding: HEIGHT * 0.1,
                transform: `translate(${node.left * (WIDTH / 2)}px, ${
                  node.top * (HEIGHT / 2)
                }px)`
              }}
            />
          )}
        />
      </div>
  
    </div>
   
    
  );
}
