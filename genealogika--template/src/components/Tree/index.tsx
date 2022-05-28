import { api } from "../../services/api";
import { useState, FormEvent, useEffect,useRef } from "react";
import Button from "react-bootstrap/button";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Navbar from "react-bootstrap/Navbar";
import logo from "../../assets/Genealogika_logo.png";
import styles from "./styles.module.scss";
import Popover from 'react-bootstrap/Popover';
import { Box, Stack } from "@chakra-ui/layout";
import dynamic from "next/dynamic";
import NodeModal from "../components/NodeModal";
import Overlay from 'react-bootstrap/Overlay'
import { api } from "../../services/api";


type Node = {
    id: string;
    content: string;
    father: {
      id: string;
    };
    mother: {
        id: string;
    };
    //childrens???
    children: Node[]
};

const Tree = dynamic(() => import("react-d3-tree"), {
  ssr: false,
});
  
export function bfs(id: string,tree: Node | Node[],node: Node) {
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
  
export default function Home() {
      
    const [show, setShow] = useState(false);
    const [target, setTarget] = useState(null);
    const ref = useRef(null);

    const [tree, setTree] = useState<Node | Node[]>([]);
    const [node, setNode] = useState<Node | undefined>();
  
    const close = () => setNode(undefined);
  
    const handleNodeClick = (event) => {
        setShow(!show);
        setTarget(event.target);
    };
  
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
  
      setNode(undefined);*/
      //usar api.get ||
    };
    const popover = (
        <Popover id="popover-basic">
          <Popover.Header as="h3">Popover right</Popover.Header>
          <Popover.Body>
            And here's some <strong>amazing</strong> content. It's very engaging.
            right?
          </Popover.Body>
        </Popover>
      );
  
    const renderNewNode = ( click: (datum: Node) => void ) => {
      return (
        <g>
            <circle r="15" fill={"#777"} onClick={() => click()} />
            <Overlay show={show} target={target} placement="bottom" container={ref} containerPadding={20}>
                <Popover id="popover-contained">
                    <Popover.Header as="h3">Popover bottom</Popover.Header>
                    <Popover.Body>
                        <strong>Holy guacamole!</strong> Check this info.
                    </Popover.Body>
                </Popover>
            </Overlay>
          
        </g>
      );
    };
    
    return (
      <Stack direction="row" spacing="md">
        <Box w="100%" h="100vh">
          <Tree
            data={tree}
            zoomable={true}
            onNodeClick={handleNodeClick}
            translate={{
              x: 200,
              y: 200,
            }}
            renderCustomNodeElement={(nodeInfo) =>
              renderRectSvgNode(nodeInfo, handleNodeClick)
            }
          />
          <NodeModal
            onSubmit={(familyMemberName) => handleSubmit(familyMemberName)}
            onClose={close}
            isOpen={Boolean(node)}
          />
        </Box>
      </Stack>
    );
}
  

  export function TreeHome() {
  
    return (
        <div>
            <Navbar bg="light" expand="lg" sticky = "top">
                <Navbar.Brand href="/">
                    Home
                </Navbar.Brand>
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
          </Navbar>
        </div>
    );
  }
      