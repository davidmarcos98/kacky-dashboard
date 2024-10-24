import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell
} from "@nextui-org/table";
import parse from 'html-react-parser';
import { isMobile } from 'react-device-detect';

const Leaderboard = ({data}: {data?: any}) => {
  return (
    <Table className={isMobile ? "w-[90%]" : "w-[70%]"}>
      <TableHeader>
        <TableColumn>Player</TableColumn>
        <TableColumn>Fins</TableColumn>
        <TableColumn>Avg</TableColumn>
      </TableHeader>
      <TableBody>
        {data?.map((player: any, index: number) => (
          <TableRow key={index}>
            <TableCell className="text-md">{parse(player.nick)}</TableCell>
            <TableCell>{player.fins}</TableCell>
            <TableCell>{player.avg}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default Leaderboard;