import DeveloperRow from "./tableParts/developerRow.jsx";
import GameRow from "./tableParts/gameRow.jsx";

export default function GamesTable({ games }) {
    const rows = [];
    let lastDeveloper = null;

    games.forEach((game) => {
        if (game.developer !== lastDeveloper) {
            rows.push(
                <DeveloperRow
                    developer={game.developer}
                    key={game.developer ?? 'unknown'} />
            );
        }
        rows.push(
            <GameRow
                game={game}
                key={game.id} />
        );
        lastDeveloper = game.developer;
    });

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