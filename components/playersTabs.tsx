"use client";

import { Card, CardHeader, CardBody } from "@nextui-org/card";
import PlayerTable from "@/components/playerTable";
import PlayerHeader from "@/components/playerHeader";
import {Tabs, Tab} from "@nextui-org/tabs";
import { useRef, useState } from "react";
import {Checkbox} from "@nextui-org/checkbox";

async function isStreamerLive(channel: string): Promise<boolean> {
  const response = await fetch(`https://static-cdn.jtvnw.net/previews-ttv/live_user_${channel}-320x180.jpg`);
  return (!response.url.includes("404"))
}

export default function PlayerTabs({data}: {data: any}) {
  const [showGraphs, setShowGraphs] = useState(false);
  const [selectedKey, setSelectedKey] = useState('vs');
  /* isStreamerLive("lars_tm").then((isLive) => {
    if (isLive && selectedKey == '') {
      setSelectedKey("lars")
    }
  })
  isStreamerLive("scrapie").then((isLive) => {
    if (isLive && selectedKey == '') {
      setSelectedKey("scrapie")
    }
  }) */


  return (
    <div className="justify-center">
      <div className="flex justify-center mb-2">
        <Checkbox isSelected={showGraphs} onValueChange={setShowGraphs} color="secondary">
          Nerdge mode
        </Checkbox>
      </div>
      <div>
        <Tabs aria-label="Options" className="relative left-1/2 transform -translate-x-1/2" selectedKey={selectedKey || "vs"} onSelectionChange={(key) => setSelectedKey(key as string)}>
          <Tab key="scrapie" title="Scrapie" className="flex justify-center">
            <Card className="w-[80%]">
              <PlayerHeader data={data} player="Scrapie98" showGraphs={showGraphs}/>
              <CardBody>
                <PlayerTable data={data} player="Scrapie98" full={true}/>
              </CardBody>
            </Card>
          </Tab>
          <Tab key="lars" title="Lars" className="flex justify-center">
            <Card className="w-[80%]">
              <PlayerHeader data={data} player="Larstm" showGraphs={showGraphs}/>
              <CardBody>
                <PlayerTable data={data} player="Larstm" full={true}/>
              </CardBody>
            </Card>
          </Tab>
          <Tab key="vs" title="VS">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mx-4 mb-16"> 
              <div>
                <Card>
                  <PlayerHeader data={data} player="Scrapie98" showGraphs={showGraphs}/>
                  <CardBody>
                    <PlayerTable data={data} player="Scrapie98" full={false}/>
                  </CardBody>
                </Card>
              </div>
              <div>
                <Card>
                  <PlayerHeader data={data} player="Larstm" showGraphs={showGraphs}/>
                  <CardBody>
                    <PlayerTable data={data} player="Larstm" full={false}/>
                  </CardBody>
                </Card>
              </div>
            </div>
          </Tab>
        </Tabs>
      </div>
    </div>
  )
}