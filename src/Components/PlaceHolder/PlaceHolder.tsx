
import classes from "./PlaceHolder.module.css"
import React, { MouseEvent, useEffect, useRef } from "react";
import { RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { workflowActions } from "../../store/workflow-slice";


const PlaceHolder = () => {
    const dispatch = useDispatch();
    const placeHolderRef = useRef<SVGSVGElement | null>(null);
    const textNodeRef = useRef<SVGTextElement>(null);


    const nodeData = useSelector((store: RootState) => store.workflow.placeHolderBoundedItem);

    useEffect(() => {
        const element = placeHolderRef.current;

        const placeHolderMoveHandler = (event: globalThis.MouseEvent) => {
            if (element && nodeData) {
                element.style.top = `${event.screenY - nodeData.height * 1.5}px`;
                element.style.left = `${event.screenX - nodeData.width / 2}px`;
                const textNode = textNodeRef.current;
                if (textNode) {
                    textNode.textContent = nodeData?.type ?? '';
                }
            }
        }
        if (nodeData && element) {
            window.addEventListener('mousemove', placeHolderMoveHandler)
        }
        return () => window.removeEventListener('mousemove', placeHolderMoveHandler)

    }, [nodeData, placeHolderRef]);

    const handleMouseLeave = () => {
        if (placeHolderRef.current) {
            placeHolderRef.current.style.top = '';
            placeHolderRef.current.style.left = '';
        }
        dispatch(workflowActions.unbindPlaceHolder());
    }

    const handleMouseUp = (event: MouseEvent<SVGSVGElement>) => {
        if (placeHolderRef.current) {
            placeHolderRef.current.style.top = '';
            placeHolderRef.current.style.left = '';
        }
        dispatch(workflowActions.unbindPlaceHolder());
    }

    const placeHolderClasses = nodeData ?
        `${classes.placeHolder}` : `${classes.invisible} ${classes.placeHolder}`;


    const { width, height  } = nodeData ?? { width: 0, height: 0};
    return (
        <svg ref={placeHolderRef} className={placeHolderClasses}  width={width} height={height}  onMouseOut={handleMouseLeave} onMouseUp={handleMouseUp}>
            <rect height={height} width={width}  enableBackground="true" />
            <text ref={textNodeRef}  y="50%" x="50%" dominantBaseline="middle" textAnchor="middle" pointerEvents="none"></text>
        </svg>
    );
};

export default PlaceHolder;