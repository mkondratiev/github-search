import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useLazyQuery, useQuery, useReactiveVar } from "@apollo/client";
import { Link } from "react-router-dom";
import Typography from "@mui/joy/Typography";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import HomeIcon from "@mui/icons-material/Home";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import {
  favoriteRepos,
  toggleFavorite,
  isFavorite,
  setRating,
} from "../store/favoriteRepositories";

const FavoriteReposPage = () => {
  const allFavoriteRepos = useReactiveVar(favoriteRepos);
  const allFavoriteReposAsList = useMemo(
    () => Object.values(allFavoriteRepos),
    [allFavoriteRepos]
  );

  return (
    <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
      <Box gridColumn="span 2" />
      <Box gridColumn="span 8">
        <Stack sx={{ marginTop: "30px" }}>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <Link to="/">
              <IconButton edge="end" aria-label="add-to-fav">
                <HomeIcon />
              </IconButton>
            </Link>
            <Typography level="h1" textAlign="center">
              Favorite Github Repos
            </Typography>
          </Stack>

          <List
            sx={{
              margin: "20px auto",
              width: "100%",
              bgcolor: "background.paper",
            }}
          >
            {allFavoriteReposAsList?.map((node) => {
              return (
                <React.Fragment key={node.id}>
                  <ListItem
                    alignItems="flex-start"
                    secondaryAction={
                      <Stack
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        spacing={2}
                      >
                        <Rating
                          value={node.rating || 0}
                          precision={0.5}
                          onChange={(_, newValue) => {
                            setRating(node.id, newValue || 0);
                          }}
                        />
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
                      </Stack>
                    }
                  >
                    <ListItemAvatar>
                      <Avatar alt={node.name} src={node.owner.avatarUrl} />
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
      </Box>
    </Box>
  );
};

export default FavoriteReposPage;
