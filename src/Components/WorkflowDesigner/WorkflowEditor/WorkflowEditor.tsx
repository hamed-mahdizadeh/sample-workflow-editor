import classes from "./WorkflowEditor.module.css";
import { useAppDispatch, useAppSelector } from "../../../hooks/hook";
import NodeInstance from "./NodeInstance/NodeInstance";
import React, { useEffect, useState } from "react";
import Connection from "./Connection/Connection";
import { workflowActions } from "../../../store/workflow-slice";

const WorkflowEditor = React.forwardRef<HTMLDivElement>((props, ref) => {
    const nodes = useAppSelector(state => state.workflow.nodes);
    const connections = useAppSelector(state => state.workflow.connections);
    const placeHolderNode = useAppSelector(state => state.workflow.placeHolderBoundedItem);
    const [isWaiting, setIsWaiting] = useState(false);

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!placeHolderNode) {
            setIsWaiting(false);
        }
    }, [placeHolderNode])

    const editorClasses = isWaiting ? `${classes.editorContainer} ${classes.active}` : `${classes.editorContainer}`;

    const mouseEnterHandler = () => {
        if (placeHolderNode) {
            setIsWaiting(true);
        }
    }

    const mouseLeaveHandler = () => {
        setIsWaiting(false);
    }

    const mouseUpHandler = () => {
        dispatch(workflowActions.unbindConnectionSource());
    }


    return (
        <div ref={ref}
            className={editorClasses}
            onMouseLeave={mouseLeaveHandler}
            onMouseEnter={mouseEnterHandler}
            onMouseUp={mouseUpHandler}>
            {Object.values(nodes).map((node) => {
                return <NodeInstance node={node} key={node.id} />
            })}
            <>
                {Object.values(connections).map((connection) => {
                    return <Connection data={connection} key={connection.id} />
                })}
            </>
        </div>
    );
});

export default WorkflowEditor;