"use client"; 
import {Card, CardFooter, Image, CardHeader} from "@nextui-org/react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import { TwitchClip } from "react-twitch-embed";
import { FaCheckCircle } from "react-icons/fa";
import { FaCircleXmark } from "react-icons/fa6";
import { useRouter } from "next/navigation";

export interface Map {
  name: string,
  author: string | null,
  finished?: boolean,
  thumbnail: string | null,
  clip?: string,
  finishes?: object[]
}

export const MapCard = ({map, clip, mapPage, allMaps}: {map: Map, clip: string, mapPage: boolean, allMaps: boolean}) => {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const router = useRouter()
 
  return (
    <Card className={allMaps ? "lg:w-[18%]" : "lg:w-[32%] md:w-[45%] w-[100%]"} isPressable onPress={() => mapPage ? router.push(`/dashboard/map/${map.name}`) : onOpen()}>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Clip for {map.name}</ModalHeader>
              <ModalBody>
                {/* TODO check if it's twitch clip etc */}
                <TwitchClip className="w-[100%] h-[auto] aspect-video" clip={clip.split('/').at(-1) as string} autoplay muted/>
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
      <CardHeader style={{ zIndex: 11 }} className='justify-between before:bg-white/10 bg-black/75 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large top-2 left-1/2 transform -translate-x-1/2 w-max shadow-small ml-1 z-10'>
        <p className="text-medium font-bold">{map.name}</p>
      </CardHeader>
      <Image
        className="object-fit"
        src={map.thumbnail as string}
        sizes="100,100"
        isZoomed
      />
      <CardFooter className="flex items-center justify-between before:bg-black/50 bg-black/30 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 right-1 w-full shadow-small ml-1 z-10">
        <p className="flex items-center text-medium font-bold mr-auto pl-1">
          Completed&nbsp;
          {map.finished && (
            <FaCheckCircle/>
          )}
          {!map.finished && (
            <FaCircleXmark/>
          )}
        </p>
        <p className="text-medium font-bold italic">By {map.author}</p>
      </CardFooter>
    </Card>
  );
};
