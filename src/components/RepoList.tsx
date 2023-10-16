import React from "react";
import List from "@mui/material/List";
import RepoListItem from "./RepoListItem";

import {
  toggleFavorite,
  type GithubRepository,
  rate,
} from "../store/favoriteRepositories";

interface RepoListProps {
  ranking: boolean;
  repos: GithubRepository[];
}

const RepoList: React.FC<RepoListProps> = ({ repos, ranking }) => {
  const handleRatingChange = (repoId: string, rating: number) =>
    rate(repoId, rating);

  const handleToggleFavorite = (repo: GithubRepository) => toggleFavorite(repo);

  return (
    <List
      sx={{
        margin: "20px auto",
        width: "100%",
        bgcolor: "background.paper",
      }}
    >
      {repos?.map((repo) => (
        <RepoListItem
          key={repo.id}
          repo={repo}
          ranking={ranking}
          onRatingChange={handleRatingChange}
          onToggleFavorite={handleToggleFavorite}
        />
      ))}
    </List>
  );
};

export default RepoList;
