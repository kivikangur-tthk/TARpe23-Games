import SearchBar from "../common/searchBar.jsx";
import GamesTable from "./gamesTable.jsx";

export default function FilterableGamesTable({ games }) {
    return (
        <div>
            <SearchBar />
            <GamesTable games={games} />
        </div>
    );
}