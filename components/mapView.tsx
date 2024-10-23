"use client"; 
import {Card, CardFooter, Image, CardHeader} from "@nextui-org/react";
import {Listbox, ListboxItem, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import { TwitchClip } from "react-twitch-embed";
import { FaCheckCircle } from "react-icons/fa";
import { FaCircleXmark } from "react-icons/fa6";
import { useState } from "react";
import ReactPlayer from "react-player";

export interface Map {
  name: string,
  author: string | null,
  finished?: boolean,
  thumbnail: string | null,
  clip?: string,
  finishes?: object[]
}
export interface Clip {
  clip: string,
  date: string,
  user: {
    username: string
  }
}

export const MapView = ({map, clips}: {map: Map, clips: Clip[]}) => {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [currentclip, setCurrentClip] = useState<Clip | null>(null);

  console.log(clips)

  return (
    <div className="flex-inline">

      <h2 className="text-center text-gray-900 text-3xl font-extrabold md:text-5xl lg:text-6xl pt-0">
        <span className="text-transparent bg-clip-text bg-gradient-to-r to-neutral-600 from-stone-400">Map #{map.name} - by {map.author}</span>
      </h2>
      <div className="flex w-full p-10">
        <Card className="w-[50%]" isPressable onPress={onOpen}>
          <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="xl">
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">#{map.name} finish by {currentclip?.user.username}</ModalHeader>
                  <ModalBody>
                    {/* find embed for streamable/etc */}
                    {
                      (currentclip?.clip.includes('twitch.tv/'))
                      ? <TwitchClip className="w-[100%] h-[auto] aspect-video" clip={currentclip?.clip.split('/').at(-1) as string} autoplay muted/>
                      : <ReactPlayer className="w-[100%] h-[auto] aspect-video" width='100%' height='auto' url={currentclip?.clip} controls autoplay muted/>
                    }
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
          <CardFooter className="flex items-center justify-between before:bg-black/50 bg-black/30 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 right-1 w-fit shadow-small ml-1 z-10">
            <p className="text-medium font-bold italic">By {map.author}</p>
          </CardFooter>
        </Card>
        <div id="clips-list" className="w-[50%] px-3">
          <h2 className="text-center text-gray-900 text-2xl font-extrabold md:text-3xl lg:text-4xl">
            <span className="text-transparent bg-clip-text bg-gradient-to-r to-stone-500 from-stone-400">Clips</span>
          </h2>
          <Listbox
            aria-label="Actions"
          >
            {clips?.map((clip: Clip, index: number) => (
              <ListboxItem key={index} onPress={() => {
                setCurrentClip(clip);
                onOpen();
              }}>{index + 1}. {clip.user.username} ({clip.date})</ListboxItem>
            ))}
          </Listbox>
        </div>
      </div>
    </div>
  );
};
