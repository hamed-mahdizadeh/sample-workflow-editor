import { Autocomplete, TextField } from "@mui/material";
import classes from "./SearchNodes.module.css";
import { ChangeEvent, useEffect, useState } from "react";
import { NodeData } from "../../../types/workflow-types";
import SearchResultItem from "./SearchResultItem/SearchResultItem";

const SearchNodes = ({ nodes, onChange, debounce = 500 }: { nodes: NodeData[], onChange: Function, debounce: number }) => {
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const timeoutIdentifier = setTimeout(() => {
            onChange(searchTerm);
        }, debounce);
        return () => clearTimeout(timeoutIdentifier);
    }, [searchTerm])

    const changeSearchInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    }
    return (
        <div className={classes.searchNodesContainer}>
            <Autocomplete
                options={nodes}
                getOptionLabel={(option) => option.type}
                filterOptions={(options, state) => options}
                size="small"
                renderInput={
                    (params) =>
                        <TextField
                            onChange={changeSearchInputHandler}
                            {...params} label="Search"
                        />}
                renderOption={(props, option) => <SearchResultItem nodeData={option} key={option.id} />}
            ></Autocomplete>
        </div>
    );
}

export default SearchNodes;