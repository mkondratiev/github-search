import Box from "@mui/material/Box";
import GithubSearch from "../GithubSearch";

const SearchPage = () => {
  return (
    <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
      <Box gridColumn="span 2" />
      <Box gridColumn="span 8">
        <GithubSearch />
      </Box>
    </Box>
  );
};

export default SearchPage;
