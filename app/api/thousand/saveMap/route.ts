// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextResponse, NextRequest } from 'next/server';

import 'dotenv/config';
import { randomMapsTable } from "../../../../db/schema";
import { db } from "../../../../db/client";

const tags = ['Race', 'FullSpeed', 'Tech', 'RPG', 'LOL', 'Press Forward', 'SpeedTech', 'MultiLap', 'Offroad', 'Trial', 'ZrT', 'SpeedFun', 'Competitive', 'Ice', 'Dirt', 'Stunt', 'Reactor', 'Platform', 'Slow Motion', 'Bumper', 'Fragile', 'Scenery', 'Kacky', 'Endurance', 'Mini', 'Remake', 'Mixed', 'Nascar', 'SpeedDrift', 'Minigame', 'Obstacle', 'Transitional', 'Grass', 'Backwards', 'EngineOff', 'Signature', 'Royal', 'Water', 'Plastic', 'Arena', 'Freestyle', 'Educational', 'Sausage', 'Bobsleigh', 'Pathfinding', 'FlagRush', 'Puzzle', 'Freeblocking', 'Altered Nadeo', 'SnowCar', 'Wood', 'Underwater', 'Turtle', 'RallyCar', 'MixedCar', 'Bugslide', 'Mudslide', 'Moving Items', 'DesertCar', 'SpeedMapping', 'NoBrake', 'CruiseControl', 'NoSteer', 'RPG-Immersive', 'Pipes', 'Magnet', 'NoGrip'];

export async function POST(req: NextRequest){
    const body = await req.json();
    let medal = "";
    if (body.GotGoalMedalOnCurrentMap) {
        medal = "at"
    } else if (body.GotBelowMedalOnCurrentMap) {
        medal = "gold"
    } else {
        medal = "skip"
    }
    let receivedStyles = body.map.Tags.split(",");
    let styles = ""
    receivedStyles.forEach((element: string) => {
        styles += tags[parseInt(element) - 1] + ","
    });
    const response = await fetch(
        `https://trackmania.exchange/api/maps/get_map_info/id/${body.map.TrackID}`
    );
    const mapData = await response.json();
    console.log(mapData)
    console.log(mapData.name)
    let mapInfo = {
        mapId: body.map.TrackID,
        player: body.player,
        medal: medal,
        timeSpent: body.TimeOnMap,
        mapper: body.map.Username,
        styles: styles,
        skipType: medal == "skip" ? (body.previousFreeSkips != body.freeSkipsLeft ? "freeskip" : (body.forceSwitch ? "forceSwitch" : "brokenskip")) : "noskip",
        atTime: body.map.AuthorTime,
        finalTime: body.CurrentTimeOnMap,
        currentMedalCount: body.currentGoalMedals,
        pbBeforeFin: body.PreviousPB,
        freeSkipCount: body.freeSkipsLeft,
        mapTitle: mapData.name,
    }
    await db.insert(randomMapsTable).values(mapInfo);
    return NextResponse.json({})
}

