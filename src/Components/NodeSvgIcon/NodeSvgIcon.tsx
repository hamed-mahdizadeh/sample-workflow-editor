import React, { useEffect, useState } from "react";

import { ReactComponent as TypeASvgIcon } from "../../svg/type-a.svg";
import { ReactComponent as TypeBSvgIcon } from "../../svg/type-b.svg";
import { ReactComponent as TypeCSvgIcon } from "../../svg/type-c.svg";
import { NodeInstanceData } from "../../types/workflow-types";

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
        const [mode, setMode] = useState<'from' | 'to' | null>(null);
        useEffect(() => {
            if (mode === 'from' && onConnectFrom) {
                onConnectFrom(node);
            }
            if (mode === 'to' && onConnectTo) {
                onConnectTo(node);
            }
        }, [mode]);
        const mouseDownHandler = () => {
            setMode('from');
        }
        const mouseUpHandler = () => {
            setMode('to');
        }
        return (
            <svg ref={ref} {...restProps} className={className} height={170} width={170}>
                <text fill="#000" y="10" x="50" font-size="14" font-weight="800" text-anchor="middle">
                    {node.title}
                </text>
                    <SVGIcon pointerEvents="none" />
                <text fill="#000" y="165" x="50" font-size="14" text-anchor="middle">
                    {node.text}
                </text>
                <rect onMouseDown={mouseDownHandler} y="20" x="100" fill-opacity="0" width="20" height="100" />
                <rect onMouseUp={mouseUpHandler} y="20" x="100" fill-opacity="0" width="20" height="100" />
                <rect width="100" height="24" fill="#aaa" x="0" y="125" />
                <circle r="10" fill="#72ed6e" cx="15" cy="137" />
                <circle r="10" fill="#fff" cx="50" cy="137" />
                <circle r="10" fill="#fff" cx="85" cy="137" />
            </svg>

        )
    });

export default NodeSvgIcon;