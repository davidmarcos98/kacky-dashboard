"use client"; 
import {Card, CardFooter, Image, CardHeader} from "@nextui-org/react";
import {Listbox, ListboxItem, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import { useState } from "react";
import { isMobile } from 'react-device-detect';
import dynamic from 'next/dynamic'

const ClipViewer = dynamic(() => import('@/components/clipViewer'), { ssr: false }) as any;

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
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [currentclip, setCurrentClip] = useState<Clip | null>(null);

  return (
    <div className="flex-inline">
      <h2 className="text-center text-gray-900 text-3xl font-extrabold md:text-5xl lg:text-6xl pt-0">
        <span className="text-transparent bg-clip-text bg-gradient-to-r to-neutral-600 from-stone-400">Map #{map.name} - by {map.author || "unknown"}</span>
      </h2>
      <div className={`${isMobile ? 'flex-inline' : 'flex'} w-full p-10`}>
        <Card className={`${isMobile ? 'w-[100%]' : 'w-[50%]'}`} isPressable onPress={() => !mapPage ? onOpen() : console.log()}>
          <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="xl">
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
              }}>{index + 1}. {clip.user.username} ({clip.date})</ListboxItem>
            ))}
          </Listbox>
        </div>
      </div>
    </div>
  );
};

export default MapView;