import React from "react";
import { useEffect, useRef, useState } from "react";
import { NodeInstanceData } from "../../../../types/workflow-types";
import classes from "./NodeInstance.module.css";
import NodeSvgIcon from "../../../NodeSvgIcon/NodeSvgIcon";
import { useAppDispatch } from "../../../../hooks/hook";
import { workflowActions } from "../../../../store/workflow-slice";


const NodeInstance = ({ node }: { node: NodeInstanceData }) => {
    const nodeRef = useRef<SVGSVGElement | null>(null);
    const [isSelected, setIsSelected] = useState(false);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const mouseMoveHandler = (event: globalThis.MouseEvent) => {
            const element = nodeRef.current;
            const { width, height } = element?.getBoundingClientRect() ?? { width: 0, height: 0 };
            if (!element) {
                return;
            }
            element.style.top = `${event.clientY - height / 2}px`;
            element.style.left = `${event.clientX - width / 2}px`;
            const coordinates = element.getBoundingClientRect();
            dispatch(workflowActions.updateNodeCoordinate({ x: coordinates.left, y: coordinates.top, nodeId: node.id }));
        };
        if (isSelected) {
            window.addEventListener('mousemove', mouseMoveHandler)
        }
        return () => {
            window.removeEventListener('mousemove', mouseMoveHandler);
        }

    }, [isSelected]);

    useEffect(() => {
        if (nodeRef.current && node.coordinates) {
            nodeRef.current.style.top = `${node.coordinates.y}px`;
            nodeRef.current.style.left = `${node.coordinates.x}px`;
        }

    }, [node, nodeRef])


    const handleMouseUp = () => {
        setIsSelected(false);
    }

    const mouseDownHandler = () => {
        setIsSelected(true);
    }
    const connectToHandler = (current: NodeInstanceData) => {

    }
    const connectFromHandler = (current: NodeInstanceData) => {

    }

    const nodeClasses = isSelected ? `${classes.nodeInstance} ${classes.moving}` : `${classes.nodeInstance}`;

    return (
        <NodeSvgIcon
            ref={nodeRef}
            node={node}
            className={nodeClasses}
            onMouseDown={mouseDownHandler}
            onMouseUp={handleMouseUp}
            onConnectTo={connectToHandler}
            onConnectFrom={connectFromHandler}
        />
    );
}

export default NodeInstance;