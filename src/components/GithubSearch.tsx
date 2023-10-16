import React, { useCallback, useEffect, useState } from "react";
import { useLazyQuery, useReactiveVar } from "@apollo/client";
import { Link } from "react-router-dom";
import debounce from "lodash.debounce";

import Typography from "@mui/joy/Typography";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Stack from "@mui/material/Stack";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Alert from "@mui/material/Alert";

import { SEARCH_FOR_REPO } from "../queries/repository";
import {
  favoriteRepos,
  toggleFavorite,
  isFavorite,
} from "../store/favoriteRepositories";

const GithubSearch = () => {
  const [query, setQuery] = useState("");
  const [lastQuery, setLastQuery] = useState("");

  const allFavoriteRepos = useReactiveVar(favoriteRepos);
  const favoriteReposCount = Object.keys(allFavoriteRepos).length;

  const [search, { data, loading, error, called }] =
    useLazyQuery(SEARCH_FOR_REPO);
  const hasNoResults =
    called &&
    !loading &&
    !error &&
    query === lastQuery &&
    data?.search?.nodes?.length === 0;

  const fetchRepos = (query: string) => {
    setLastQuery(query);
    search({ variables: { query } });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedfetchRepos = useCallback(debounce(fetchRepos, 400), []);

  useEffect(() => {
    if (!query.length && !called) return;
    debouncedfetchRepos(query);

    return () => {
      debouncedfetchRepos.cancel();
    };
  }, [debouncedfetchRepos, query, called]);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) =>
    setQuery(e.target.value);

  const handleEnterPress: React.KeyboardEventHandler<HTMLInputElement> = (
    e
  ) => {
    if (e.code === "Enter") {
      debouncedfetchRepos.cancel();
      fetchRepos(query);
    }
  };

  return (
    <Stack sx={{ marginTop: "30px" }}>
      <Typography level="h1" textAlign="center">
        Github Repository Search
      </Typography>

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
          onKeyDown={handleEnterPress}
          onChange={handleChange}
        />
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <Link to="/favorite">
          <IconButton
            color="primary"
            sx={{ p: "10px" }}
            aria-label="directions"
          >
            <Badge badgeContent={favoriteReposCount} color="primary">
              <FavoriteIcon color="action" />
            </Badge>
          </IconButton>
        </Link>
      </Paper>

      <List
        sx={{
          margin: "20px auto",
          width: "100%",
          bgcolor: "background.paper",
        }}
      >
        {called && loading && (
          <Alert icon={false} color="info">
            Looking...
          </Alert>
        )}
        {hasNoResults && (
          <Alert icon={false} color="info">
            No results
          </Alert>
        )}

        {error && (
          <Alert severity="error" color="error">
            Something went wrong
          </Alert>
        )}
        {data?.search?.nodes?.map((node) => {
          if (!node || node.__typename !== "Repository") return null;

          return (
            <React.Fragment key={node.id}>
              <ListItem
                alignItems="flex-start"
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="add-to-fav"
                    onClick={() => toggleFavorite(node)}
                  >
                    {isFavorite(node.id) ? (
                      <FavoriteIcon />
                    ) : (
                      <FavoriteBorderIcon />
                    )}
                  </IconButton>
                }
              >
                <ListItemAvatar>
                  <Avatar alt={node.nameWithOwner} src={node.owner.avatarUrl} />
                </ListItemAvatar>
                <ListItemText
                  primary={node.nameWithOwner}
                  secondary={
                    <Typography sx={{ display: "inline" }} component="span">
                      {node?.description}
                    </Typography>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </React.Fragment>
          );
        })}
      </List>
    </Stack>
  );
};

export default GithubSearch;
