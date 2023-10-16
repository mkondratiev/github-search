import React, { useCallback } from "react";
import { useLazyQuery, useReactiveVar } from "@apollo/client";
import debounce from "lodash.debounce";

import Typography from "@mui/joy/Typography";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";

import SearchInput from "./SearchInput";
import RepoList from "./RepoList";
import {
  type GithubRepository,
  favoriteRepos,
} from "../store/favoriteRepositories";
import { SEARCH_FOR_REPO } from "../queries/repository";

const GithubSearch = () => {
  const allFavoriteRepos = useReactiveVar(favoriteRepos);
  const badgeCount = Object.keys(allFavoriteRepos).length;
  const [search, { data, loading, error, called }] =
    useLazyQuery(SEARCH_FOR_REPO);

  const noResults =
    called && !loading && !error && data?.search?.nodes?.length === 0;

  const fetchRepos = useCallback(
    (query: string) => search({ variables: { query } }),
    [search]
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedfetchRepos = useCallback(debounce(fetchRepos, 400), []);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => debouncedfetchRepos(e.target.value),
    [debouncedfetchRepos]
  );

  const handleEnterPress: React.KeyboardEventHandler<HTMLInputElement> =
    useCallback(
      (e) => {
        if (e.code === "Enter") {
          debouncedfetchRepos.cancel();
          fetchRepos(e.currentTarget.value);
        }
      },
      [fetchRepos, debouncedfetchRepos]
    );

  return (
    <Stack sx={{ marginTop: "30px" }}>
      <Typography level="h1" textAlign="center">
        Github Repository Search
      </Typography>

      <SearchInput
        onChange={handleChange}
        onKeyDown={handleEnterPress}
        badgeCount={badgeCount}
      />

      {called && loading && (
        <Alert icon={false} color="info" sx={{ marginTop: "20px" }}>
          Looking...
        </Alert>
      )}

      {noResults && (
        <Alert icon={false} color="info" sx={{ marginTop: "20px" }}>
          No results
        </Alert>
      )}

      {error && (
        <Alert severity="error" color="error" sx={{ marginTop: "20px" }}>
          Something went wrong
        </Alert>
      )}

      <RepoList
        repos={data?.search?.nodes as GithubRepository[]}
        ranking={false}
      />
    </Stack>
  );
};

export default GithubSearch;
