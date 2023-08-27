import classes from './ConnectionPlaceHolder.module.css';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hook';
import { useEffect, useRef } from 'react';
import { workflowActions } from '../../../../store/workflow-slice';

const ConnectionPlaceHolder = () => {
    const connectionRef = useRef<SVGLineElement>(null);
    const containerSvgRef = useRef<SVGSVGElement>(null);
    const connectionSource = useAppSelector(state => state.workflow.connectionBoundedSourceItem);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const {x, y } = connectionSource?.coordinates ?? {x: 0, y: 0};
        const mouseMoveHandler =  (event: MouseEvent) => {
            const x2 = event.clientX;
            const y2 = event.clientY;
            // containerSvgRef.current?.setAttribute('width', `100%`);
            // containerSvgRef.current?.setAttribute('height', `100%`);
            connectionRef.current!.setAttribute('x2', `${x2}`);
            connectionRef.current!.setAttribute('y2', `${y2}`);
         }
        const mouseupHandler = () => {
            window.removeEventListener('mousemove', mouseMoveHandler);
            window.removeEventListener('mouseup', mouseupHandler);
            dispatch(workflowActions.unbindConnectionSource());
        }
        if (connectionSource) {      
            connectionRef.current!.setAttribute('x1', `${x + 120}`);
            connectionRef.current!.setAttribute('y1', `${y + 35}`);
            connectionRef.current!.setAttribute('x2', `${x + 120}`);
            connectionRef.current!.setAttribute('y2', `${y + 35}`);
            window.addEventListener('mousemove', mouseMoveHandler);
            window.addEventListener('mouseup', mouseupHandler);
        } else {
            window.removeEventListener('mousemove', mouseMoveHandler);
            window.removeEventListener('mouseup', mouseupHandler);
            connectionRef.current!.setAttribute('x1', `0`);
            connectionRef.current!.setAttribute('x2', `0`);
            connectionRef.current!.setAttribute('y1', `0`);
            connectionRef.current!.setAttribute('y2', `0`);
        }
        return () => {
            window.removeEventListener('mousemove', mouseMoveHandler);
            window.removeEventListener('mouseup', mouseupHandler);
        };

    }, [connectionSource]);
    return (
        <svg width="100%" height="100%" style={{position: 'absolute', top: '0', left: '0'}}  ref={containerSvgRef}  pointerEvents="none" >
            <line style={{position: 'relative' }} ref={connectionRef} x1={0} y1={0} x2={0} y2={0} stroke="black"></line>
        </svg>);
}

export default ConnectionPlaceHolder;