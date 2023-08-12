import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import PlaceHolder from "../PlaceHolder/PlaceHolder";
import SearchNodes from "../SearchNodes/SearchNodes";
import WorkflowEditor from "../WorkflowEditor/WorkfloEditor";
import classes from "./WorkflowDesigner.module.css";
import { NodeData } from "../../types/workflow-types";
import { dummyNodeFetch } from "../../utils/dummy-functions";
import { useAppDispatch, useAppSelector } from "../../hooks/hook";
import { workflowActions } from "../../store/workflow-slice";


const isDropLocationValid = (dropArea: HTMLDivElement, placeHolder: SVGSVGElement) => {
    const itemRect = placeHolder.getBoundingClientRect();
    const targetRect = dropArea.getBoundingClientRect();
    return (itemRect.left >= targetRect.left &&
        itemRect.right <= targetRect.right &&
        itemRect.top >= targetRect.top &&
        itemRect.bottom <= targetRect.bottom);
}


const WorkflowDesigner = () => {
    const [nodes, setNodes] = useState<NodeData[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const placeHolderRef = React.createRef<SVGSVGElement>();
    const editorContainerRef = React.createRef<HTMLDivElement>();

    const boundedNode = useAppSelector(state => state.workflow.placeHolderBoundedItem);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const element = placeHolderRef.current;

        const placeHolderMoveHandler = (event: globalThis.MouseEvent) => {
            if (element && boundedNode) {
                element.style.top = `${event.screenY - boundedNode.height * 1.5}px`;
                element.style.left = `${event.screenX - boundedNode.width / 2}px`;
            }
        }
        const mouseupHandler = () => {
            if (!placeHolderRef.current || !editorContainerRef.current) {
                return;
            }
            const isDropValid = isDropLocationValid(
                editorContainerRef.current,
                placeHolderRef.current);
            if (isDropValid) {
                dispatch(workflowActions.addNode(
                    {
                        x: parseInt(element?.style.left ?? '0'),
                        y: parseInt(element?.style.top ?? '0')
                    })
                );
            } else {
                dispatch(workflowActions.unbindPlaceHolder());
            }
        }
        if (boundedNode && element) {
            document.addEventListener('mousemove', placeHolderMoveHandler);
            document.addEventListener('mouseup', mouseupHandler)
        } else {
            if (placeHolderRef.current) {
                placeHolderRef.current.style.top = '';
                placeHolderRef.current.style.left = '';
            }
        }
        return () => {
            window.removeEventListener('mousemove', placeHolderMoveHandler);
            window.removeEventListener('mouseup', mouseupHandler)
        }

    }, [boundedNode, placeHolderRef]);


    const searchTermChangeHandler = (term: string) => {
        setSearchTerm(searchTerm);
    }

    useEffect(() => {
        const loadNodes = async () => {
            const filteredResults = await dummyNodeFetch(searchTerm);
            setNodes(filteredResults);
        }

        loadNodes();

    }, [searchTerm])

    return (
        <div className={classes.pageContainer}>
            <header>
                <h3>Workflow Designer</h3>
            </header>
            {boundedNode && <PlaceHolder ref={placeHolderRef} />}
            <SearchNodes nodes={nodes} onChange={searchTermChangeHandler} debounce={500} />
            <WorkflowEditor ref={editorContainerRef} />
        </div>
    );
}

export default WorkflowDesigner;