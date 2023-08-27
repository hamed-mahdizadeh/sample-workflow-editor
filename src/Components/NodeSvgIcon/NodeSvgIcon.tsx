import React from "react";

import { ReactComponent as TypeASvgIcon } from "../../svg/type-a.svg";
import { ReactComponent as TypeBSvgIcon } from "../../svg/type-b.svg";
import { ReactComponent as TypeCSvgIcon } from "../../svg/type-c.svg";
import { NodeInstanceData } from "../../types/workflow-types";
import { useAppDispatch, useAppSelector } from "../../hooks/hook";
import { workflowActions } from "../../store/workflow-slice";

const SVGIconMap = {
    'TYPE_A': TypeASvgIcon,
    'TYPE_B': TypeBSvgIcon,
    'TYPE_C': TypeCSvgIcon,
}

type PropsType = {
    node: NodeInstanceData,
    onConnectFrom?: (source: NodeInstanceData) => void,
    onConnectTo?: (target: NodeInstanceData) => void,
    className?: string
} & React.SVGAttributes<SVGSVGElement>

const NodeSvgIcon = React.forwardRef(
    (
        props: PropsType,
        ref: React.ForwardedRef<SVGSVGElement>
    ) => {
        const { node, className, onConnectFrom, onConnectTo, ...restProps } = props;
        const SVGIcon = SVGIconMap[node.type];
        const sourceId = useAppSelector(state => state.workflow.connectionBoundedSourceItem?.id);
        const dispatch = useAppDispatch();


        //Handle starting to draw new connection from current node
        //Mousedown on front part of current node picture
        const mouseDownHandler = (event: React.MouseEvent) => {
            dispatch(workflowActions.bindConnectionSource(node));
            event.stopPropagation();
        }
        //Handle finishing the draw connection by connecting connection
        //to current node by mouse up on back of current node
        const mouseUpHandler = (event: React.MouseEvent) => {
            if(sourceId) {
                dispatch(workflowActions.addConnection(node.id))
            }
            event.stopPropagation();
            
        }
        return (
            <svg ref={ref} style={{position: 'absolute'}} {...restProps} className={className} height={170} width={170}>
                <text fill="#000" y="10" x="50" fontSize="14" fontWeight="800" textAnchor="middle">
                    {node.title}
                </text>
                    <SVGIcon pointerEvents="none" />
                <text fill="#000" y="165" x="50" fontSize="14" textAnchor="middle">
                    {node.text}
                </text>
                <rect onMouseDownCapture={mouseDownHandler} y="20" x="100" fillOpacity="0" width="20" height="100" />
                <rect onMouseUpCapture={mouseUpHandler} y="20" x="0" fillOpacity="0" width="20" height="100" />
                <rect width="100" height="24" fill="#aaa" x="0" y="125" />
                <circle r="10" fill="#72ed6e" cx="15" cy="137" />
                <circle r="10" fill="#fff" cx="50" cy="137" />
                <circle r="10" fill="#fff" cx="85" cy="137" />
            </svg>

        )
    });

export default NodeSvgIcon;