import React, { useEffect, useState } from 'react';

import classes from './Connection.module.css';
import { ConnectionData } from '../../../../types/workflow-types';
import { useAppSelector } from '../../../../hooks/hook';

const Connection = ({ data }: { data: ConnectionData }) => {
    const target = useAppSelector(
        state => state.workflow.nodes[
            state.workflow.connections[data.id]
                .targetId
        ]);
    const source = useAppSelector(
        state => state.workflow.nodes[
            state.workflow.connections[data.id]
                .sourceId
        ]);

    const [coordinate, setCoordinate] = useState({
        //line coordinates
        x1: 0,
        y1: 0,
        x2: 0,
        y2: 0,
        //svg width, height
        x: 0,
        y: 0,
        w: 0,
        h: 0
    });


    useEffect(() => {
        const newCoordinate = {
            x1:  source.coordinates.x + 115,
            y1: source.coordinates.y + 35,
            x2: target.coordinates.x,
            y2: target.coordinates.y + 50,
            x: coordinate.x2 > coordinate.x1 ? coordinate.x2 : coordinate.x1,
            y: coordinate.y2 > coordinate.y1 ? coordinate.y2 : coordinate.y1,
            w: Math.abs(coordinate.x2 - coordinate.x1),
            h: Math.abs(coordinate.y2 - coordinate.y1)
        };
        setCoordinate(newCoordinate);
    }, [target, source]);


    return (
        <svg
            style={{ position: 'absolute', left: 0, top: 0 }}
            // width={coordinate.w}
            // height={coordinate.h}
            // x={coordinate.x}
            // y={coordinate.y}
            pointerEvents="none"
            width="100%"
            height="100%"
            className={classes.Connection}>
            <line
                style={{ position: 'relative' }}
                stroke="black"
                x1={coordinate.x1}
                y1={coordinate.y1}
                x2={coordinate.x2}
                y2={coordinate.y2} />
        </svg>
    );
};

export default Connection;


