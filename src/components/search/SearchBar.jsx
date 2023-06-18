import React from 'react';
import _ from 'lodash';
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";

const SearchBar = ({setSearchQuery, isSearchable, label}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSearchable) {
      const query = e.target.elements.search.value;
      const queryParams = new URLSearchParams({ query });
      const url = `search?${queryParams.toString()}`;
      window.location.href = url;
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <TextField
        id="search-bar"
        className="text"
        name="search"
        onInput={
          _.debounce((e) => {
            setSearchQuery(e.target.value);
          }, 300)
        }
        InputProps={{endAdornment: (<IconButton type="submit">
        <SearchIcon sx={{color:'#29335C'}} />
        </IconButton>)}}
        label={label}
        placeholder="Search..."
        size="medium"
        fullWidth
        style={{backgroundColor: "white"}}
        autoCorrect='true'
        variant="outlined"
      />
    </form>
  )};

export default SearchBar;
