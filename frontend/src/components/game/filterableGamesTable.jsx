import SearchBar from "../common/searchBar.jsx";
import GamesTable from "./gamesTable.jsx";

export default function FilterableGamesTable() {
    return (
        <div>
            <SearchBar />
            <GamesTable />
        </div>
    );
}