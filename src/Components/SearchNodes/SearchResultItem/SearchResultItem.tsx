import { useDispatch, useSelector } from "react-redux";
import { NodeData } from "../../../types/workflow-types";
import classes from "./SearchResultItem.module.css";
import { workflowActions } from "../../../store/workflow-slice";


const SearchResultItem = ({nodeData} : {nodeData: NodeData}) => {
    const dispatch = useDispatch();


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