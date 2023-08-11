import { useDispatch, useSelector } from "react-redux";
import { NodeData } from "../../../types/workflow-types";
import classes from "./SearchResultItem.module.css";
import { workflowActions } from "../../../store/workflow-slice";
import { RootState } from "../../../store";
import { useEffect } from "react";

const SearchResultItem = ({nodeData} : {nodeData: NodeData}) => {
    const dispatch = useDispatch();

    const boundedItem = useSelector((state: RootState) => state.workflow.placeHolderBoundedItem);

    //Temporary for test
    useEffect(()=> {
        console.log({boundedItem});
    }, [boundedItem])



    const bindPlaceHolderHandler = () => {
        dispatch(workflowActions.bindPlaceHolder(nodeData));
    }

    const unbindPlaceHolderHandler = () => {
        dispatch(workflowActions.unbindPlaceHolder());
    }

    return (
        <div className={classes.optionContainer} onMouseDown={bindPlaceHolderHandler} onMouseUp={unbindPlaceHolderHandler}>
            { nodeData.type }
        </div>
    );
}

export default SearchResultItem;