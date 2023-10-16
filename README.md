# How to start

1. Install [fnm](https://github.com/Schniz/fnm) or [nvm](https://github.com/nvm-sh/nvm).
2. Run `fnm use` or `nvm use` to install node version from `.nvmrc`
3. Add `.env.local` file to root folder
4. Add env variables `VITE_GITHUB_URI=https://api.github.com/graphql`
`VITE_GITHUB_KEY=<YOUR_KEY>` ([how to generate token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens))
3. Run `corepack enable`
4. Run `yarn`
5. To run dev build `yarn dev`
