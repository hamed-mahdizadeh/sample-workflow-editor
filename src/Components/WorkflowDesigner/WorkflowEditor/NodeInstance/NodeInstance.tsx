import React from "react";
import { useEffect, useRef, useState } from "react";
import { NodeInstanceData } from "../../../../types/workflow-types";
import classes from "./NodeInstance.module.css";

const NodeInstance = ( {node }: {node: NodeInstanceData}) => {
    const nodeRef = useRef<SVGSVGElement | null>(null);
    const nodeTextRef = useRef<SVGTextElement>(null);
    const [isSelected, setIsSelected] = useState(false);

    useEffect(() => {
        const mouseMoveHandler = (event: globalThis.MouseEvent) => {
            const element = nodeRef.current;
            if(!element) {
                return;
            }
            element.style.top = `${event.screenY - node.height * 1.5}px`;
            element.style.left = `${event.screenX - node.width / 2}px`;
        };
        if(isSelected) {
            window.addEventListener('mousemove', mouseMoveHandler)
        }
        return () => {
            window.removeEventListener('mousemove', mouseMoveHandler);
        }

    }, [isSelected]);

    useEffect(() => {
        if(nodeRef.current && node.coordinates) {
            nodeRef.current.style.top = `${node.coordinates.y}px`;
            nodeRef.current.style.left = `${node.coordinates.x}px`;
        }

    }, [node, nodeRef])

    const handleMouseLeave = () => {
        setIsSelected(false);
    }

    const handleMouseUp = () => {
        setIsSelected(false);
    }

    const mouseDownHandler = () => {
        setIsSelected(true);
    }

    const nodeClasses = isSelected ? `${classes.nodeInstance} ${classes.moving}` : `${classes.nodeInstance}`;

    return (
            <svg ref={nodeRef} className={nodeClasses} width={node.width} height={node.height} onMouseDown={mouseDownHandler} onMouseOut={handleMouseLeave} onMouseUp={handleMouseUp}>
                <rect height={node.height} fill={node.color} width={node.width} enableBackground="true" />
                <text ref={nodeTextRef} y="50%" x="50%" dominantBaseline="middle" textAnchor="middle" pointerEvents="none">
                    {node.type}
                </text>
            </svg>
    );
}

export default NodeInstance;