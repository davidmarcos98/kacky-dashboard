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
    <>
      {isMobile &&
        <h2 className="text-center text-gray-900 text-3xl font-extrabold md:text-5xl lg:text-6xl pt-8">
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-indigo-600 from-violet-400">
            Leaderboard
          </span>
        </h2>
      }
      <Table className={isMobile ? "w-[90%] pt-3" : "w-fit pt-6"}>
        <TableHeader>
          <TableColumn className="px-5">Ranking</TableColumn>
          <TableColumn className="px-5">Player</TableColumn>
          <TableColumn className="px-5">Fins</TableColumn>
          <TableColumn className="px-5">Avg</TableColumn>
        </TableHeader>
        <TableBody>
          {data?.map((player: any, index: number) => (
            <TableRow key={index}>
              <TableCell className="w-fit px-5">{parseInt(player.index)}</TableCell>
              <TableCell className="text-md font-bold max-w-[200px]">{parse(player.nick)}</TableCell>
              <TableCell className="w-fit px-5">{player.fins}</TableCell>
              <TableCell className="w-fit px-5">{player.avg}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default Leaderboard;