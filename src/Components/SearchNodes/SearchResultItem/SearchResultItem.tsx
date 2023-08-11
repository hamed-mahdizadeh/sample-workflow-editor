import { NodeData } from "../../../types/workflow-types";
import classes from "./SearchResultItem.module.css";

const SearchResultItem = ({nodeData} : {nodeData: NodeData}) => {
    return (
        <div className={classes.optionContainer}>
            { nodeData.type }
        </div>
    );
}

export default SearchResultItem;