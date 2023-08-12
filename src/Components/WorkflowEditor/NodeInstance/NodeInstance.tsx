import { useEffect, useRef } from "react";
import { NodeInstanceData } from "../../../types/workflow-types";
import classes from "./NodeInstance.module.css";

const NodeInstance = ( {node }: {node: NodeInstanceData}) => {
    const nodeRef = useRef<SVGSVGElement | null>(null);
    const nodeTextRef = useRef<SVGTextElement>(null);

    useEffect(() => {
        if(nodeRef.current && node.coordinates) {
            nodeRef.current.style.top = `${node.coordinates.y}px`;
            nodeRef.current.style.left = `${node.coordinates.x}px`;
        }

    }, [node, nodeRef])

    const handleMouseLeave = () => {

    }

    const handleMouseUp = () => {

    }

    return (
            <svg ref={nodeRef} className={classes.nodeInstance} width={node.width} height={node.height} onMouseOut={handleMouseLeave} onMouseUp={handleMouseUp}>
                <rect height={node.height} width={node.width} enableBackground="true" />
                <text ref={nodeTextRef} y="50%" x="50%" dominantBaseline="middle" textAnchor="middle" pointerEvents="none"></text>
            </svg>
    );
}

export default NodeInstance;