"use client"
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell} from "@nextui-org/table";
import { Snippet } from "@nextui-org/snippet";
import {useAsyncList} from "@react-stately/data";
import { useEffect, useMemo, useState } from "react";
import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownSection,
    DropdownItem
  } from "@nextui-org/dropdown";
import { Button } from "@nextui-org/button";
import { IconSvgProps } from "@/types";
import React from "react";
import { Selection } from "@nextui-org/react";
  
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
export const medalOptions = [
    {name: "AT", uid: "at"},
    {name: "Gold", uid: "gold"},
    {name: "Skip", uid: "skip"},
];
export const ChevronDownIcon = ({strokeWidth = 1.5, ...otherProps}: IconSvgProps) => {
    return (
    <svg
        aria-hidden="true"
        fill="none"
        focusable="false"
        height="1em"
        role="presentation"
        viewBox="0 0 24 24"
        width="1em"
        {...otherProps}
    >
        <path
        d="m19.92 8.95-6.52 6.52c-.77.77-2.03.77-2.8 0L4.08 8.95"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={strokeWidth}
        />
    </svg>
    );
};
export default function PlayerTable({data, player, full=true}: {data: any, player: string, full: boolean}) {
    const [medalFilter, setMedalFilter] = useState<Selection>("all");
    const [dateFilter, setDateFilter] = useState<any>([formatDate(new Date())]);
    const [dateOptions, setDateOptions] = useState<any[]>([]);
    const playerUsedSkips = (player: string) => {
        return data.filter((item: { player: string; }) => item.player === player).at(-1)?.freeSkipCount || 0;
    }
    const dayRow = (day: string) => {
        return (
            <TableRow key={99999} className="">
                <TableCell className="font-bold text-xl w-[100%] pl-6 pr-5 absolute left-1/2 transform -translate-x-1/2 -mt-[3px] flex justify-between"><span className="pt-1">DAY 1</span> <Snippet hideCopyButton color="secondary" variant="flat" symbol="" style={{ backgroundColor: "rgba(159, 90, 253, 0.1)", border: "1px solid rgba(159, 90, 253, 1)"}}>{`${4 - playerUsedSkips(player)} Free Skips Used`}</Snippet></TableCell>
                <TableCell className="font-bold text-xl">‎‎</TableCell>
                <TableCell className="font-bold text-xl">‎‎</TableCell>
                {/* <TableCell className="font-bold text-xl">‎‎</TableCell> */}
                <TableCell className="font-bold text-xl">‎‎</TableCell>
                <TableCell className="font-bold text-xl">‎‎</TableCell>
            </TableRow>
        )
    }
    function formatDate(date: any) {
        const overnight = date.getHours() < 5;
        const year = date.getFullYear();
        const month = String((overnight && date.getDate() == 1) ? date.getMonth() : date.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
        const day = String(overnight ? date.getDate() - 1 : date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
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
                    let cmp = (/^\d+$/.test(first) ? parseInt(first) : first.replace(" ", '')) < (/^\d+$/.test(first) ? parseInt(second) : second.replace(" ", '')) ? -1 : 1;
            
                    if (sortDescriptor.direction === "descending") {
                        cmp *= -1;
                    }
    
                    return cmp;
                }),
        };
        },
    });


    const filteredItems = useMemo(() => {
        let filteredData = [...list.items];

        if (medalFilter !== "all" && Array.from(medalFilter).length !== medalOptions.length) {
            filteredData = filteredData.filter((item: any) =>
                Array.from(medalFilter).includes(item.medal),
            );
        }
        if (dateFilter.length > 0 && dateFilter.length !== dateOptions.length) {
            filteredData = filteredData.filter((item: any) =>
                dateFilter.includes(formatDate(item.datetime)),
            );
        } else if (dateFilter.length == 0) {
            filteredData = filteredData.filter((item: any) =>
                dateFilter.includes(formatDate(new Date())),
            );
        }

        return filteredData;
    }, [list, list.items, medalFilter, dateFilter]);
      
    useEffect(() => {
        let dates = new Set();
        data.forEach((item: any) => {
            dates.add(formatDate(item.datetime))
        });
        setDateOptions(Array.from(dates).map((date) => ({name: date, uid: date})));
    }, [list.items])
    
    return (
        <>
            <div className="flex justify-center">
                <Dropdown>
                    <DropdownTrigger className="hidden sm:flex">
                        <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat" className="font-thin">
                            Medal
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                        disallowEmptySelection
                        aria-label="Table Columns"
                        closeOnSelect={false}
                        selectedKeys={medalFilter}
                        selectionMode="multiple"
                        onSelectionChange={setMedalFilter}
                    >
                        {medalOptions.map((medal) => (
                            <DropdownItem key={medal.uid} className="capitalize">
                                {medal.name}
                            </DropdownItem>
                        ))}
                    </DropdownMenu>
                </Dropdown>
                &nbsp;
                <Dropdown>
                    <DropdownTrigger className="hidden sm:flex">
                        <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat" className="font-thin">
                            {dateFilter.length > 1 ? "Date" : (formatDate(new Date()) == dateFilter[0] ? "Today" : dateFilter[0])}
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                        disallowEmptySelection
                        aria-label="Table Columns"
                        closeOnSelect={false}
                        selectedKeys={dateFilter}
                        selectionMode="multiple"
                        onSelectionChange={(selection) => {
                            setDateFilter(Array.from(selection));
                        }}
                    >
                        {dateOptions.map((date) => (
                            <DropdownItem key={date.uid} className="capitalize">
                                {date.name}
                            </DropdownItem>
                        ))}
                    </DropdownMenu>
                </Dropdown>
            </div>
            <Table isStriped 
                sortDescriptor={list.sortDescriptor}
                onSortChange={list.sort}>
                    <TableHeader className="text-xl">
                        <TableColumn key="id" allowsSorting className="text-sm text-center">Id</TableColumn>
                        <TableColumn key="medal" allowsSorting className="text-sm text-center">Medal</TableColumn>
                        <TableColumn key="mapTitle" allowsSorting className="text-sm">Map</TableColumn>
                        <TableColumn key="styles" allowsSorting className="text-sm">Styles</TableColumn>
                        <TableColumn key="mapper" allowsSorting className="text-sm">Author</TableColumn>
                        {/* <TableColumn className="text-sm">Final PB</TableColumn> */}
                        <TableColumn key="timeSpent" allowsSorting className="text-sm">Time Spent</TableColumn>
                    </TableHeader>
                    <TableBody items={filteredItems}>
                        {(item: any) => (
                            <TableRow key={item.mapId}>
                                <TableCell>{list.items.indexOf(item) + 1}</TableCell>
                                <TableCell>{medal(item.medal, item.skipType)}</TableCell>
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
        </>
    );
}
