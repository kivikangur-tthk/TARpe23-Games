import DeveloperRow from "./tableParts/developerRow.jsx";
import GameRow from "./tableParts/gameRow.jsx";
import {useEffect, useState} from "react";
import axios from "axios";

export default function GamesTable() {
    const [rows, setRows] = useState([]);

    useEffect(() => {
        let games = []
        const categorizeGames = () => {  
            const rows = [];
            let lastDeveloper = null;
            games.forEach((game) => {
                if (game.developer !== lastDeveloper) {
                    rows.push(
                        <DeveloperRow
                            developer={game.developer}
                            key={game.developer ?? 'unknown'}/>
                    );
                }
                rows.push(
                    <GameRow
                        game={game}
                        key={game.id}/>
                );
                lastDeveloper = game.developer;
            });
            setRows(rows);
        }
        const fetchGames = async () => {
            try {
                const response = await axios.get(import.meta.env.VITE_BACKEND_URL + "/api/v1/games");
                games = response.data;
                categorizeGames();
            } catch (error) {
                console.log("Failed to fetch Games:", error);
            }
        }
        fetchGames().then(() => console.log("Success fetching Games"));
    }, []);

    return (
        <table>
            <thead>
            <tr>
                <th>Name</th>
                <th>Price</th>
                <th></th>
            </tr>
            </thead>
            <tbody>{rows}</tbody>
        </table>
    );
}