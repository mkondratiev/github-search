import { ReactiveVar, makeVar } from "@apollo/client";
import omit from "lodash.omit";
import type { Repository, RepositoryOwner } from "../__generated__/graphql";

export interface GithubRepository
  extends Pick<
    Repository,
    "id" | "name" | "nameWithOwner" | "description" | "url" | "homepageUrl"
  > {
  owner: Pick<RepositoryOwner, "avatarUrl">;
  rating?: number;
}

type FavoriteReposState = Record<string, GithubRepository>;

const getFavoriteRepos: ReactiveVar<FavoriteReposState> =
  makeVar<FavoriteReposState>({});

const isFavorite = (id: string) => {
  const allRepos = getFavoriteRepos();
  return id in allRepos;
};

const addToFavorites = (newRepo: GithubRepository) => {
  const allRepos = getFavoriteRepos();
  getFavoriteRepos({ ...allRepos, [newRepo.id]: newRepo });
};

const toggleFavorite = (repo: GithubRepository) => {
  const allRepos = getFavoriteRepos();
  if (isFavorite(repo.id)) {
    const omited = omit(allRepos, [repo.id]);
    return getFavoriteRepos(omited);
  }

  return getFavoriteRepos({ ...allRepos, [repo.id]: { ...repo, rating: 0 } });
};

const setRating = (id: string, rating: number) => {
  const allRepos = getFavoriteRepos();
  if (isFavorite(id)) {
    return getFavoriteRepos({ ...allRepos, [id]: { ...allRepos[id], rating } });
  }
};

export {
  addToFavorites,
  getFavoriteRepos,
  isFavorite,
  toggleFavorite,
  setRating,
};
