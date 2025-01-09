"use client"
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell} from "@nextui-org/table";
import { Snippet } from "@nextui-org/snippet";
import {useAsyncList} from "@react-stately/data";

const stylesColors: any = {'Race': '', 'FullSpeed': '', 'Tech': '', 'RPG': '', 'LOL': '', 'Press Forward': '', 'SpeedTech': '', 'MultiLap': '', 'Offroad': '705100', 'Trial': '', 'ZrT': '1a6300', 'SpeedFun': '', 'Competitive': '', 'Ice': '05767d', 'Dirt': '5e2d09', 'Stunt': '', 'Reactor': 'd04500', 'Platform': '', 'Slow Motion': '004388', 'Bumper': 'aa0000', 'Fragile': '993366', 'Scenery': '', 'Kacky': '', 'Endurance': '', 'Mini': '', 'Remake': '', 'Mixed': '', 'Nascar': '', 'SpeedDrift': '', 'Minigame': '7e0e69', 'Obstacle': '', 'Transitional': '', 'Grass': '06a805', 'Backwards': '83aa00', 'EngineOff': 'f2384e', 'Signature': 'f1c438', 'Royal': 'ff0010', 'Water': '69dbff', 'Plastic': 'fffc00', 'Arena': '', 'Freestyle': '', 'Educational': '', 'Sausage': '', 'Bobsleigh': '', 'Pathfinding': '', 'FlagRush': '7a0000', 'Puzzle': '459873', 'Freeblocking': 'ffffff', 'Altered Nadeo': '3a3a3a', 'SnowCar': 'de4949', 'Wood': '814b00', 'Underwater': '03afff', 'Turtle': '6bb74e', 'RallyCar': 'ff8c00', 'MixedCar': '000000', 'Bugslide': '4b7933', 'Mudslide': '855925', 'Moving Items': 'e0dc82', 'DesertCar': 'f6ca4a', 'SpeedMapping': 'bd46b0', 'NoBrake': '', 'CruiseControl': '', 'NoSteer': '', 'RPG-Immersive': '', 'Pipes': '', 'Magnet': '', 'NoGrip': ''}
const medal = (medal: string, skipType: string) => {
    if (medal == "at"){
      return (
        <img
          className="font-bold w-[20px] medal"
          src="/at.png"
        />
      )
    } else if (medal == "gold"){
        return (
            <img
            className="font-bold w-[20px] medal"
            src="/gold.png"
            />
        )
    } else if (medal == "skip"){
        if (skipType == "brokenskip"){
            return (
                <p className="font-bold w-[100%] text-center">BROKEN</p>
            )
        } else if (skipType == "freeskip"){
            return (
                <p className="font-bold w-[100%] text-center">SKIP</p>
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
      return `${minutes}m${(Math.round(seconds * 1000)/1000).toString().padStart(2, '0')}s`;
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

  function getStyleColor(style: string | number) {
    return stylesColors[style] || '4f4f4f';
  }
  
  export default function PlayerTable({data, player, full=true}: {data: any, player: string, full: boolean}) {
    const playerUsedSkips = (player: string) => {
        return data.filter((item: { player: string; }) => item.player === player).at(-1)?.freeSkipCount || 0;
    }
    let list = useAsyncList({
        async load({signal}) {
          return {
            items: data.filter((item: { player: string; }) => item.player === player)
          };
        },
        async sort({items, sortDescriptor}) {
          return {
                items: items.sort((a: any, b: any) => {
                    let first = a[sortDescriptor.column];
                    let second = b[sortDescriptor.column];
                    console.log(first, second)
                    let cmp = (/^\d+$/.test(first) ? parseInt(first) : first) < (/^\d+$/.test(first) ? parseInt(second) : second) ? -1 : 1;
            
                    if (sortDescriptor.direction === "descending") {
                        cmp *= -1;
                    }
    
                    return cmp;
                }),
          };
        },
      });
    
    return (
        <Table isStriped 
        sortDescriptor={list.sortDescriptor}
        onSortChange={list.sort}>
            <TableHeader className="text-xl">
                <TableColumn key="medal" allowsSorting className="text-sm text-center">Medal</TableColumn>
                <TableColumn key="mapTitle" allowsSorting className="text-sm">Map</TableColumn>
                <TableColumn key="styles" allowsSorting className="text-sm">Styles</TableColumn>
                <TableColumn key="mapper" allowsSorting className="text-sm">Author</TableColumn>
                {/* <TableColumn className="text-sm">Final PB</TableColumn> */}
                <TableColumn key="timeSpent" allowsSorting className="text-sm">Time Spent</TableColumn>
            </TableHeader>
            <TableBody items={list.items}>
                {(item: any) => (
                    <TableRow key={item.mapId}>
                        <TableCell className="">{medal(item.medal, item.skipType)}</TableCell>
                        <TableCell className="font-bold underline"><a href={`https://trackmania.exchange/maps/${item.mapId}`} target="_blank">{item.mapTitle.substring(0, 100)}{item.mapTitle.length > 100 ? '...' : ''}&nbsp;</a></TableCell>
                        <TableCell>
                            {full &&
                                item.styles.split(',').filter((style: string) => style != '').map((style: string, index: number) => (
                                    <Snippet hideCopyButton variant="flat" symbol="" className="text-xs mr-2" style={{ backgroundColor: `#${getStyleColor(style)}50`, border: `1px solid #${getStyleColor(style)}`}}>{style}</Snippet>
                                ))
                            }
                            {!full &&
                                <Snippet hideCopyButton variant="flat" symbol="" className="text-xs" style={{ backgroundColor: `#${getStyleColor(item.styles.split(',')[0])}50`, border: `1px solid #${getStyleColor(item.styles.split(',')[0])}`}}>{item.styles.split(',')[0]}</Snippet>
                            }
                        </TableCell>
                        <TableCell>{item.mapper}</TableCell>
                        {/* <TableCell> <span className="font-mono">{item.finalTime > 0 ? formatTime(item.finalTime) : ''}</span></TableCell> */}
                        <TableCell> <span className="font-mono">{formatTimeSimple(item.timeSpent)}</span></TableCell>
                    </TableRow>
                )}
                
            </TableBody>
      </Table>
  );
}