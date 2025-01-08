"use client";
import { Card, CardHeader, CardBody } from "@nextui-org/card";
import {Progress} from "@nextui-org/progress";
import { useState } from "react";

async function isStreamerLive(channel: string): Promise<boolean> {
  const response = await fetch(`https://static-cdn.jtvnw.net/previews-ttv/live_user_${channel}-320x180.jpg`);
  return (!response.url.includes("404"))
}

export default function PlayerHeader({data, player}: {data: any, player: string}) {
  const [scrapieLive, setScrapieLive] = useState(false);
  const [larsLive, setLarsLive] = useState(false);
  
  isStreamerLive("scrapie").then((isLive) => {
    setScrapieLive(isLive)
  })
  isStreamerLive("lars_tm").then((isLive) => {
    setLarsLive(isLive)
  })

  const playerCurrentCount = (player: string) => {
    return data.filter((item: { player: string; }) => item.player === player).at(-1)?.currentMedalCount || 0;
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

  return (
    <CardHeader className='flex inline-block'>
      <h4 className="text-4xl font-bold text-center">{player == "Larstm" ? "Lars" : "Scrapie"}{player == "Larstm" ? (larsLive ? liveIndicator("lars_tm") : '') : (scrapieLive ? liveIndicator("scrapie") : '')}</h4> 
      <h3 className='text-l font-bold text-center mt-[4%]'>{playerCurrentCount(player)}/1000</h3>
      <Progress size="lg" className="ml-[10%] mt-[2%] max-w-[80%]" color='success' value={playerCurrentCount(player)*100/1000} />
    </CardHeader>
  )
}