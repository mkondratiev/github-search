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

const favoriteRepos: ReactiveVar<FavoriteReposState> =
  makeVar<FavoriteReposState>({});

const isFavorite = (id: string) => {
  const allRepos = favoriteRepos();
  return id in allRepos;
};

const addToFavorites = (newRepo: GithubRepository) => {
  const allRepos = favoriteRepos();
  favoriteRepos({ ...allRepos, [newRepo.id]: newRepo });
};

const toggleFavorite = (repo: GithubRepository) => {
  const allRepos = favoriteRepos();
  if (isFavorite(repo.id)) {
    const omited = omit(allRepos, [repo.id]);
    return favoriteRepos(omited);
  }

  return favoriteRepos({ ...allRepos, [repo.id]: { ...repo, rating: 0 } });
};

const rate = (id: string, rating: number) => {
  const allRepos = favoriteRepos();
  if (isFavorite(id)) {
    return favoriteRepos({ ...allRepos, [id]: { ...allRepos[id], rating } });
  }
};

export { favoriteRepos, addToFavorites, toggleFavorite, rate, isFavorite };
