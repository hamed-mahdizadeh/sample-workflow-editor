import classes from "./WorkflowEditor.module.css";
import { useAppSelector } from "../../../hooks/hook";
import NodeInstance from "./NodeInstance/NodeInstance";
import React, { useEffect, useState } from "react";

const WorkflowEditor = React.forwardRef<HTMLDivElement>((props, ref) => {
    const nodes = useAppSelector(state => state.workflow.nodes);
    const placeHolderNode = useAppSelector(state => state.workflow.placeHolderBoundedItem);
    const [isWaiting, setIsWaiting] = useState(false);

    useEffect(() => {
        if (!placeHolderNode) {
            setIsWaiting(false);
        }
    }, [placeHolderNode])

    const editorClasses = isWaiting ? `${classes.editorContainer} ${classes.active}` : `${classes.editorContainer}`;
    console.log(editorClasses);

    const mouseEnterHandler = () => {
        if (placeHolderNode) {
            setIsWaiting(true);
        }
    }

    const mouseLeaveHandler = () => {
        setIsWaiting(false);
    }


    return (
        <div ref={ref}
            className={editorClasses}
            onMouseLeave={mouseLeaveHandler}
            onMouseEnter={mouseEnterHandler}>
            {nodes.map((node) => {
                return <NodeInstance node={node} key={node.id} />
            })}
        </div>
    );
});

export default WorkflowEditor;