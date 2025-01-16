"use client";
import { CardHeader } from "@nextui-org/card";
import {Progress} from "@nextui-org/progress";
import { useState } from "react";
import {Image} from "@nextui-org/image";
import { LineChart } from '@mui/x-charts/LineChart';
import { PieChart } from '@mui/x-charts/PieChart';

async function isStreamerLive(channel: string): Promise<boolean> {
  const response = await fetch(`https://static-cdn.jtvnw.net/previews-ttv/live_user_${channel}-320x180.jpg`);
  return (!response.url.includes("404"))
}
const stylesColors: any = {'Race': '', 'FullSpeed': '', 'Tech': '', 'RPG': '', 'LOL': '', 'Press Forward': '', 'SpeedTech': '', 'MultiLap': '', 'Offroad': '705100', 'Trial': '', 'ZrT': '1a6300', 'SpeedFun': '', 'Competitive': '', 'Ice': '05767d', 'Dirt': '5e2d09', 'Stunt': '', 'Reactor': 'd04500', 'Platform': '', 'Slow Motion': '004388', 'Bumper': 'aa0000', 'Fragile': '993366', 'Scenery': '', 'Kacky': '', 'Endurance': '', 'Mini': '', 'Remake': '', 'Mixed': '', 'Nascar': '', 'SpeedDrift': '', 'Minigame': '7e0e69', 'Obstacle': '', 'Transitional': '', 'Grass': '06a805', 'Backwards': '83aa00', 'EngineOff': 'f2384e', 'Signature': 'f1c438', 'Royal': 'ff0010', 'Water': '69dbff', 'Plastic': 'fffc00', 'Arena': '', 'Freestyle': '', 'Educational': '', 'Sausage': '', 'Bobsleigh': '', 'Pathfinding': '', 'FlagRush': '7a0000', 'Puzzle': '459873', 'Freeblocking': 'ffffff', 'Altered Nadeo': '3a3a3a', 'SnowCar': 'de4949', 'Wood': '814b00', 'Underwater': '03afff', 'Turtle': '6bb74e', 'RallyCar': 'ff8c00', 'MixedCar': '000000', 'Bugslide': '4b7933', 'Mudslide': '855925', 'Moving Items': 'e0dc82', 'DesertCar': 'f6ca4a', 'SpeedMapping': 'bd46b0', 'NoBrake': '', 'CruiseControl': '', 'NoSteer': '', 'RPG-Immersive': '', 'Pipes': '', 'Magnet': '', 'NoGrip': ''}
const otherColors: any = ['ED6A5A', 'F4F1BB', 'C8D9BC', '77A689', '5E978F', '5D576B', '5E7048']
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
export default function PlayerHeader({data, player, showGraphs}: {data: any, player: string, showGraphs: boolean}) {
  const [scrapieLive, setScrapieLive] = useState(false);
  const [larsLive, setLarsLive] = useState(false);
  
  isStreamerLive("scrapie").then((isLive) => {
    setScrapieLive(isLive)
  })
  isStreamerLive("lars_tm").then((isLive) => {
    setLarsLive(isLive)
  })

  const playerAts = (player: string) => {
    let items = data.filter((item: {medal: string; player: string; }) => item.player === player && item.medal === "at").sort((a: { datetime: number; }, b: { datetime: number; }) => a.datetime - b.datetime);
    items.forEach((element: { totalTime: any; timeSpent: any; }, index: number) => {
      if (index == 0){
        element.totalTime = element.timeSpent;
      } else {
        element.totalTime = element.timeSpent + items[index - 1].totalTime;
      }
    });
    return items
  }

  const playerCurrentCount = (player: string) => {
    return data.filter((item: { player: string; }) => item.player === player).at(-1)?.currentMedalCount || 0;
  }
  const playerCurrentGoldCount = (player: string) => {
    return data.filter((item: { player: string; }) => item.player === player).at(-1)?.currentGoldCount || 0;
  }

  const playerStyleStats = (player: string) => {
    let maps = data.filter((item: { player: string; }) => item.player === player);
    let styles: any = {};
    maps.forEach((element: { styles: string; }) => {
      let mapStyles = element.styles.split(",")[0];
      if (mapStyles) {
        if (Object.keys(styles).includes(mapStyles)){
          styles[mapStyles] += 1;
        } else {
          styles[mapStyles] = 1;
        }
      }
    });
    const sortable = [];
    for (let style in styles) {
      sortable.push([style, styles[style]]);
    }

    let sortedStyles = sortable.sort((a: any, b: any) => b[1] - a[1]);
    let other = sortedStyles.slice(6).reduce((acc: number, item: any) => acc + item[1], 0);
    return [...sortedStyles.slice(0, 6), ["Other", other]];
  }

  const liveIndicator = (player: string) => {
    return (
      <>
        &nbsp;
        <span className="live-indicator">
            <svg style={{display: "inline"}} width="12" height="12" fill="#eee" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z"/></svg>
            &nbsp;
            <a className="z-50 underline" href={`https://twitch.tv/${player}`} target="_blank">Live</a>
        </span>
      </>
    )
  }
  let playerStylesForGraph = playerStyleStats(player);
  let playerItemsForGraph = playerAts(player);
  return (
    <CardHeader className='flex inline-block'>
      <h4 className="text-4xl mt-[1%] font-bold text-center">{player == "Larstm" ? "Lars" : "Scrapie"}{player == "Larstm" ? (larsLive ? liveIndicator("lars_tm") : '') : (scrapieLive ? liveIndicator("scrapie") : '')}</h4> 
      <h3 className='text-xl font-bold text-center mt-[2%] flex inline items-center justify-center'>{medal("at", '')}&nbsp;{playerCurrentCount(player)}/1000&nbsp;&nbsp;{medal("gold", '')}&nbsp;{playerCurrentGoldCount(player)}</h3>
      <Progress size="lg" className="ml-[10%] mt-[2%] max-w-[80%]" color='success' value={playerCurrentCount(player)*100/1000} />
      { showGraphs && 
        <div className="flex flex-col items-center">
          <h2 className="text-center mt-5 -mb-6 text-lg font-bold">AT Progression</h2>
          <div style={{ height: "400px", width: "100%" }} className="justify-center -mb-3">
            <LineChart
              className="mt-0"
              xAxis={[
                { data: playerItemsForGraph.map((item: { totalTime: number; }) => item.totalTime/1000/60).filter((_: any,i: number) => i % 1 == 0 )  },
              ]}
              series={[
                {
                  data: playerItemsForGraph.map((item: { currentMedalCount: number; }) => item.currentMedalCount).filter((_: any,i: number) => i % 1 == 0 ) ,
                  showMark: ({ index }) => index % 5 === 0,
                },
              ]}
              grid={{ vertical: true, horizontal: true }}
            />
          </div>
          <h2 className="text-center my-5 text-lg font-bold">Styles share</h2>
          <div style={{ height: "250px", width: "60%", maxWidth: "30vw" }} className="flex justify-center mb-3">
            <PieChart
              series={[
                {
                  data: playerStylesForGraph.map((item: any, index: number) => ({ id: index, value: item[1], label: item[0], color: "#" + (stylesColors[item[0]] || otherColors[index]) })),
                },
              ]}
            />
          </div>
        </div>
      }
    </CardHeader>
  )
}