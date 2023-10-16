import React from "react";

import Typography from "@mui/joy/Typography";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";

import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import { GithubRepository, isFavorite } from "../store/favoriteRepositories";

interface RepoListItemProps {
  repo: GithubRepository;
  ranking?: boolean;

  onToggleFavorite?: (repo: GithubRepository) => void;
  onRatingChange?: (id: string, rating: number) => void;
}

const RepoListItem: React.FC<RepoListItemProps> = ({
  repo,
  ranking = false,
  onToggleFavorite,
  onRatingChange,
}) => {
  const favorite = isFavorite(repo.id);
  const rating = repo.rating ?? 0;

  return (
    <>
      <ListItem
        alignItems="flex-start"
        secondaryAction={
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            {ranking && (
              <Rating
                value={rating}
                precision={0.5}
                onChange={(_, rating) => onRatingChange?.(repo.id, rating ?? 0)}
              />
            )}
            <IconButton edge="end" onClick={() => onToggleFavorite?.(repo)}>
              {favorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </IconButton>
          </Stack>
        }
      >
        <ListItemAvatar>
          <Avatar alt={repo.name} src={repo.owner.avatarUrl} />
        </ListItemAvatar>
        <ListItemText
          primary={repo.nameWithOwner}
          secondary={
            <Typography sx={{ display: "inline" }} component="span">
              {repo?.description}
            </Typography>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  );
};

export default RepoListItem;
