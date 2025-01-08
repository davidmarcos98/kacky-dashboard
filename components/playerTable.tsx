"use client"
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell} from "@nextui-org/table";
import {Image} from "@nextui-org/image";

const medal = (medal: string, skipType: string) => {
    if (medal == "at"){
      return (
        <Image
          className="font-bold w-fit"
          src="/at.png"
          width={20}
        />
      )
    } else if (medal == "gold"){
        return (
            <Image
            className="font-bold w-fit"
            src="/gold.png"
            width={20}
            />
        )
    } else if (medal == "skip"){
        if (skipType == "brokenskip"){
            return (
                <p className="font-bold w-fit">BROKEN</p>
            )
        } else if (skipType == "freeskip"){
            return (
                <p className="font-bold w-fit">SKIP</p>
            )
        }
    }
}
function formatTime(milliseconds: number): string {
    if (milliseconds < 60000) {
      return `${(milliseconds / 1000)}s`;
    } else {
      const totalSeconds = milliseconds / 1000;
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = (totalSeconds % 60);
      return `${minutes}m${seconds.toString().padStart(2, '0')}s`;
    }
  }
function formatTimeSimple(milliseconds: number): string {
    if (milliseconds < 60000) {
      return `${Math.round(milliseconds / 1000)}s`;
    } else {
      const totalSeconds = milliseconds / 1000;
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = Math.round(totalSeconds % 60);
      return `${minutes}m${seconds.toString().padStart(2, '0')}s`;
    }
  }
export default function PlayerTable({data, player}: {data: any, player: string}) {
    return (
        <Table isStriped>
            <TableHeader className="text-xl">
                <TableColumn className="text-sm"> </TableColumn>
                <TableColumn className="text-sm">Map</TableColumn>
                <TableColumn className="text-sm">Author</TableColumn>
                <TableColumn className="text-sm">Final PB</TableColumn>
                <TableColumn className="text-sm">Time Spent</TableColumn>
                <TableColumn className="text-sm text-center">Medal</TableColumn>
            </TableHeader>
            <TableBody>
                <TableRow key={99999}>
                    <TableCell className="font-bold text-xl absolute left-1/2 transform -translate-x-1/2">DAY 1</TableCell>
                    <TableCell className="font-bold text-xl">‎‎</TableCell>
                    <TableCell className="font-bold text-xl">‎‎</TableCell>
                    <TableCell className="font-bold text-xl">‎‎</TableCell>
                    <TableCell className="font-bold text-xl">‎‎</TableCell>
                    <TableCell className="font-bold text-xl">‎‎</TableCell>
                </TableRow>
                {data
                    .filter((item: { player: string; }) => item.player === player)
                    .map((item: any, index: number) => (
                        <TableRow key={index}>
                            <TableCell className="font-bold">{index + 1}</TableCell>
                            <TableCell className="font-bold underline"><a href={`https://trackmania.exchange/maps/${item.mapId}`} target="_blank">{item.mapTitle.substring(0, 100)}{item.mapTitle.length > 100 ? '...' : ''}&nbsp;</a></TableCell>
                            <TableCell>{item.mapper}</TableCell>
                            <TableCell> <span className="font-mono">{item.finalTime > 0 ? formatTime(item.finalTime) : ''}</span></TableCell>
                            <TableCell> <span className="font-mono">{formatTimeSimple(item.timeSpent)}</span></TableCell>
                            <TableCell className="flex justify-center">{medal(item.medal, item.skipType)}</TableCell>
                        </TableRow>
                ))}
            </TableBody>
      </Table>
  );
}