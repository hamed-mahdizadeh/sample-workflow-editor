import classes from "./WorkflowEditor.module.css";
import { useAppDispatch, useAppSelector } from "../../hooks/hook";
import NodeInstance from "./NodeInstance/NodeInstance";
import React, { MouseEvent} from "react";
import { workflowActions } from "../../store/workflow-slice";

const WorkflowEditor = React.forwardRef<HTMLDivElement>((props, ref) => {
    const nodes = useAppSelector(state => state.workflow.nodes);
    const dispatch = useAppDispatch();

    const boundedNode = useAppSelector(state => state.workflow.placeHolderBoundedItem)

    const handleMouseUp = (event: MouseEvent<HTMLDivElement>) => {
        if (boundedNode) {
            const x = event.screenX;
            const y = event.screenY;
            dispatch(workflowActions.addNode({x, y}))
        }
    }


    return ( 
        <div ref={ref} className={classes.editorContainer} onMouseUp={handleMouseUp}>
            {nodes.map((node) => {
                return <NodeInstance node={node} key={node.id} />
            })}
        </div>
    );
});

export default WorkflowEditor;