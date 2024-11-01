"use client"; 
import {Card, CardFooter, CardHeader} from "@nextui-org/card";
import Image from "next/image";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure} from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { NotFinishedIcon, FinishedIcon } from "./icons";
import { useRouter } from "next/navigation";
import { isMobile } from 'react-device-detect';
import { Clip } from "./clipViewer";
import dynamic from 'next/dynamic'
import Link from "next/link";

const ClipViewer = dynamic(() => import('@/components/clipViewer'), { ssr: true }) as any;

export interface Map {
  name: string,
  author: string | null,
  finished?: boolean,
  thumbnail: string | null,
  clip?: string,
  finishes?: object[]
}

export const MapCard = ({map, clip, mapPage, allMaps, user}: {map: Map, clip: string, mapPage: boolean, allMaps: boolean, user: string}) => {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const router = useRouter()

  const isMapFinished = (map.finishes && map.finishes?.length > 0);

  /* TODO Improve card, show if map has been ever finished, show if it has clip, a la wingo */
  /* TODO open on tm.exchange when image click on map page */
  return (
    /* <Card className={allMaps ? "lg:w-[18%] w-[25%]" : "lg:w-[32%] md:w-[45%] w-[100%]"} isPressable onPress={() => mapPage ? router.push(`/dashboard/map/${map.name}`) : onOpen()}> */
    <Card className={"w-[100%] max-w-[500px]"} isPressable onPress={() => mapPage ? router.push(`/dashboard/map/${map.name}`) : onOpen()}>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="5xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Clip for {map.name}</ModalHeader>
              <ModalBody>                
                <ClipViewer clip={{clip: clip, user: {username: user}} as Clip} />
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <CardHeader
        style={{ zIndex: 20 }}
        className='justify-between before:bg-stone-700/10 overflow-hidden py-1 absolute top-1 left-11 transform -translate-x-1/2 w-max ml-1 z-10'>
        {/* className='justify-between before:bg-white/10 bg-black/75 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large top-2 left-1/2 transform -translate-x-1/2 w-max shadow-small ml-1 z-10'> */}
        <p
          className="text-3xl text-slate-200 font-bold"
          style={{ textShadow: "1px 1px 2px black, 0 0 0.3em black, 0 0 0.3em black" }}
          >
          <Link href={`/dashboard/map/${map.name}`}>
            #{map.name}
          </Link>
        </p>
      </CardHeader>
      <Image
        className={`preload object-fit ${user ? "cardImage" : ""} ${isMobile || !allMaps ? '' : "mapCardImage"}`}
        src={`/images/${parseInt(map.name) - 75}.webp`}
        width="0"
        height="0"
        sizes="100,100"
        style={{ width: '100%', height: '100%' }}
        alt={`Map ${map.name} thumbnail`}
        loading="eager"
        onMouseOver={(e) => {(e.target as any).classList.remove('preload')}}
      />
      <CardFooter className={`justify-between before:bg-black/50 ${allMaps ? (isMapFinished ? "bg-green-600/45" : "bg-red-600/45") : "bg-black/40"} border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-2 ${isMobile ? "right-2 w-[50%]" : "w-[calc(100%_-_8px)]" } shadow-small ml-1 z-10`}>
        <p className="flex items-center text-medium font-bold mr-auto ">
          {isMapFinished || clip != undefined ? (
            <FinishedIcon/>
          ) : <NotFinishedIcon/>}
        </p>
        <p className="text-medium font-bold italic">By {map.author || "unknown"}</p>
      </CardFooter>
    </Card>
  );
};
