"use client"; 
import {Card, CardFooter, Image, CardHeader} from "@nextui-org/react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import { NotFinishedIcon, FinishedIcon } from "./icons";
import { useRouter } from "next/navigation";
import { isMobile } from 'react-device-detect';
import { Clip } from "./clipViewer";
import dynamic from 'next/dynamic'

const ClipViewer = dynamic(() => import('@/components/clipViewer'), { ssr: false });

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

  /* TODO Improve card, show if map has been ever finished, show if it has clip, a la wingo */
  /* TODO open on tm.exchange when image click on map page */
  return (
    /* <Card className={allMaps ? "lg:w-[18%] w-[25%]" : "lg:w-[32%] md:w-[45%] w-[100%]"} isPressable onPress={() => mapPage ? router.push(`/dashboard/map/${map.name}`) : onOpen()}> */
    <Card className={"w-[100%] max-w-[500px]"} isPressable onPress={() => mapPage ? router.push(`/dashboard/map/${map.name}`) : onOpen()}>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Clip for {map.name}</ModalHeader>
              <ModalBody>
                {/* TODO check if it's twitch clip etc */}
                
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
        style={{ zIndex: 11 }}
        className='justify-between before:bg-white/10 bg-black/75 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large top-2 left-1/2 transform -translate-x-1/2 w-max shadow-small ml-1 z-10'>
        <p className="text-large font-bold">#{map.name}</p>
      </CardHeader>
      <Image
        className={`object-fit ${isMobile ? '' : "mapCardImage"}`}
        src={map.thumbnail as string}
        sizes="100,100"
        isZoomed
      />
      <CardFooter className="justify-between before:bg-black/50 bg-black/40 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
        <p className="flex items-center text-medium font-bold mr-auto ">
          {(map.finishes && map.finishes?.length > 0) || clip != undefined ? (
            <FinishedIcon/>
          ) : <NotFinishedIcon/>}
        </p>
        <p className="text-medium font-bold italic">By {map.author || "unknown"}</p>
      </CardFooter>
    </Card>
  );
};
