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
      return `${milliseconds / 1000}`;
    } else {
      const totalSeconds = milliseconds / 1000;
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;
      return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }
  }
export default function PlayerTable({data, player}: {data: any, player: string}) {
{/* <li key={event.id} className='flex justify-left'>
                {medal(event.medal as string, event.skipType as string)}
                &nbsp;
                <a
                  href={`https://trackmania.exchange/maps/${event.mapId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className='underline font-bold'
                >
                  {event.mapTitle || "Unknown Map"}
                </a>{" "}
                -
                {event.finalTime && event.finalTime > 0 ? event.finalTime : ""}
              </li> */}
    return (
        <Table aria-label="Example static collection table">
            <TableHeader>
            <TableColumn>Map</TableColumn>
            <TableColumn>Final PB</TableColumn>
            <TableColumn className="text-center">Medal</TableColumn>
            </TableHeader>
            <TableBody>
            {data
                .filter((item: { player: string; }) => item.player === player)
                .map((item: any, index: number) => (
                    <TableRow key={index}>
                        <TableCell>{item.mapTitle}</TableCell>
                        <TableCell>{item.finalTime > 0 ? formatTime(item.finalTime) : ''}</TableCell>
                        <TableCell className="flex justify-center">{medal(item.medal, item.skipType)}</TableCell>
                    </TableRow>
                          
            ))}
            </TableBody>
      </Table>
  );
}