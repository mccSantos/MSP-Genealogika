import { Dispatch, FunctionComponent, SetStateAction } from "react";
import {
  PersonNodeWrapper,
  PersonNodeInner,
  PersonNodeSubtreeBttn
} from "./PersonNode.components";
import { Gender } from "relatives-tree/lib/types";

interface Props {
  id: string;
  node: any;
  style: object;
  gender: Gender;
  onSubClick: Dispatch<SetStateAction<string>>;
}

const PersonNode: FunctionComponent<Props> = ({
  id,
  node,
  style,
  gender,
  onSubClick
}) => {
  return (
    <PersonNodeWrapper style={style}>
      <PersonNodeInner>
        {id}, {gender}
      </PersonNodeInner>
      {node.hasSubTree && (
        <PersonNodeSubtreeBttn onClick={() => onSubClick(node.id)} />
      )}
    </PersonNodeWrapper>
  );
};

export default PersonNode;
