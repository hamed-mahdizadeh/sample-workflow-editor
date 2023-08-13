
import classes from "./PlaceHolder.module.css"
import React, { useRef } from "react";
import { RootState } from "../../../store";
import { useSelector } from "react-redux";


const PlaceHolder = React.forwardRef<SVGSVGElement>((props, ref) => {
    const textNodeRef = useRef<SVGTextElement>(null);


    const nodeData = useSelector((store: RootState) => store.workflow.placeHolderBoundedItem);

    const placeHolderClasses = nodeData ?
        `${classes.placeHolder}` : `${classes.invisible} ${classes.placeHolder}`;


    const { width, height } = nodeData ?? { width: 0, height: 0 };
    return (
        <svg ref={ref}  className={placeHolderClasses} width={width} height={height} pointerEvents="none">
            <rect height={height} width={width} fill={nodeData?.color} />
            <text ref={textNodeRef} y="50%" x="50%" dominantBaseline="middle" textAnchor="middle" pointerEvents="none">
                {nodeData?.type}
            </text>
        </svg>
    );
});

export default PlaceHolder;