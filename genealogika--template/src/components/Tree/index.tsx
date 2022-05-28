import { api } from "../../services/api";
import { useState, FormEvent, useEffect, useRef } from "react";
import Button from "react-bootstrap/button";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Navbar from "react-bootstrap/Navbar";
import Popover from "@mui/material/Popover";
import { Box, Stack } from "@chakra-ui/layout";
import dynamic from "next/dynamic";

/*type Node = {
  id: string;
  content: string;
  father: {
    id: string;
  };
  mother: {
    id: string;
  };
  //childrens???
  children: Node[];
};

const Tree = dynamic(() => import("react-d3-tree"), {
  ssr: false,
});

export function bfs(id: string, tree: Node | Node[], node: Node) {
  const queue: Node[] = [];

  queue.unshift(tree as Node);

  while (queue.length > 0) {
    const curNode = queue.pop();

    if (curNode.id === id) {
      curNode.children.push(node);

      return { ...tree };
    }

    const len = curNode.children.length;

    for (let i = 0; i < len; i++) {
      queue.unshift(curNode.children[i]);
    }
  }
}
function MyForm() {
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
}

export default function Home() {
  const [pop, setPop] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setPop(event.currentTarget);
  };
  const handleClose = () => {
    setPop(null);
  };

  const [tree, setTree] = useState<Node | Node[]>([]);
  const [node, setNode] = useState<Node | undefined>();

  const close = () => setNode(undefined);

  /*const popover = (
        <Popover id="popover-basic">
          <Popover.Header as="h3">Popover right</Popover.Header>
          <Popover.Body>
            And here's some <strong>amazing</strong> content. It's very engaging.
            right?
          </Popover.Body>
        </Popover>
    );

  const handleSubmit = (familyMemberName: string) => {
    /*const newTree = bfs(node.content, tree, {
        name: familyMemberName,
        attributes: {
          id: v4(),
        },
        children: [],
      });
  
      if (newTree) {
        setTree(newTree);
      }
  
      setNode(undefined);
    //usar api.get ||
  };

  const open = Boolean(pop);
  const id = open ? "simple-popover" : undefined;
  const renderNewNode = (click: (datum: Node) => void) => {
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
  );
}
*/
export function TreeHome() {
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
    </div>
  );
}
