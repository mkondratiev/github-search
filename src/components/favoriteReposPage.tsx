import { useMemo } from "react";
import { useReactiveVar } from "@apollo/client";
import { Link } from "react-router-dom";

import Typography from "@mui/joy/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import HomeIcon from "@mui/icons-material/Home";

import RepoList from "./RepoList";
import { favoriteRepos } from "../store/favoriteRepositories";

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
              <IconButton edge="end">
                <HomeIcon />
              </IconButton>
            </Link>

            <Typography level="h1" textAlign="center">
              Favorite Github Repos
            </Typography>
          </Stack>

          <RepoList repos={allFavoriteReposAsList} ranking />
        </Stack>
      </Box>
    </Box>
  );
};

export default FavoriteReposPage;
