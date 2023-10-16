import React from "react";
import { Link } from "react-router-dom";

import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";

interface SearchInputProps {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onKeyDown: React.KeyboardEventHandler<HTMLInputElement>;
  badgeCount: number;
}

const SearchInput: React.FC<SearchInputProps> = ({
  onChange,
  onKeyDown,
  badgeCount,
}) => {
  return (
    <Paper
      elevation={3}
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        marginTop: "10px",
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search"
        type="search"
        onKeyDown={onKeyDown}
        onChange={onChange}
      />
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <Link to="/favorite">
        <IconButton color="primary" sx={{ p: "10px" }}>
          <Badge badgeContent={badgeCount} color="primary">
            <FavoriteIcon color="action" />
          </Badge>
        </IconButton>
      </Link>
    </Paper>
  );
};

export default SearchInput;
