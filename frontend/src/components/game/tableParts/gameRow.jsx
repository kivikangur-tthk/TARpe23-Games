export default function GameRow({game}) {
    return (
      <tr>
          <td>{game.name}</td>
          <td>{game.price}</td>
          <td></td>
      </tr>
    );
}