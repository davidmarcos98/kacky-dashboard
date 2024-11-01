"use client"; 
import {Card, CardFooter, CardHeader} from "@nextui-org/card";
import {Image} from "@nextui-org/image";
import { Listbox, ListboxItem } from "@nextui-org/listbox";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure} from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { useState } from "react";
import { isMobile } from 'react-device-detect';
import dynamic from 'next/dynamic'

const ClipViewer = dynamic(() => import('@/components/clipViewer'), { ssr: true }) as any;

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

const MapView = ({map, clips, mapPage=false}: {map: Map, clips: Clip[], mapPage: boolean}) => {
  const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();
  const [currentclip, setCurrentClip] = useState<Clip | null>(null);

  return (
    <div className="flex-inline">
      <h2 className="text-center text-gray-900 text-3xl font-extrabold md:text-5xl lg:text-6xl pt-0">
        <span className="text-transparent bg-clip-text bg-gradient-to-r to-neutral-600 from-stone-400">#{map.name} - by {map.author || "unknown"}</span>
      </h2>
      <div className={`${isMobile ? 'flex-inline' : 'flex'} w-full p-10`}>
        <Card className={`${isMobile ? 'w-[100%]' : 'w-[50%]'}`} isPressable onPress={() => !mapPage ? onOpen() : console.log()}>
          <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="5xl">
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">#{map.name} finish by {currentclip?.user.username}</ModalHeader>
                  <ModalBody>
                    <ClipViewer clip={currentclip as Clip} />
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
            className='justify-between before:bg-stone-700/10 overflow-hidden py-1 absolute top-1 left-11 transform -translate-x-1/2 w-max ml-1 z-10'>
            <p
              className="text-5xl text-slate-200 font-bold leading-snug pl-10"
              style={{ textShadow: "1px 1px 2px black, 0 0 0.3em black, 0 0 0.3em black" }}
              >
              #{map.name}
            </p>
          </CardHeader>
          <Image
            className="object-fit mapImage"
            src={`/images/noimagae.jpg`}
            sizes="100,100"
            isZoomed
          />
          <CardFooter className="flex items-center justify-between before:bg-black/50 bg-black/30 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 right-1 w-fit shadow-small ml-1 z-10">
            <p className="text-medium font-bold italic">By {map.author || "unknown"}</p>
          </CardFooter>
        </Card>
        <div id="clips-list" className={`${isMobile ? 'w-[100%] pt-4' : 'w-[50%] px-3'}`}>
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
              }}>
                {index + 1}. {clip.user.username} ({clip.date}) - <a className="underline" onClick={onClose} href={clip.clip} target="_blank">Go to clip</a>&nbsp;<svg style={{display: "inline"}} width="16" height="16" fill="#eee" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M320 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l82.7 0L201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L448 109.3l0 82.7c0 17.7 14.3 32 32 32s32-14.3 32-32l0-160c0-17.7-14.3-32-32-32L320 0zM80 32C35.8 32 0 67.8 0 112L0 432c0 44.2 35.8 80 80 80l320 0c44.2 0 80-35.8 80-80l0-112c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 112c0 8.8-7.2 16-16 16L80 448c-8.8 0-16-7.2-16-16l0-320c0-8.8 7.2-16 16-16l112 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L80 32z"/></svg>
              </ListboxItem>
            ))}
          </Listbox>
        </div>
      </div>
    </div>
  );
};

export default MapView;