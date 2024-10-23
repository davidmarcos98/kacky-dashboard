"use client";
import { AwaitedReactNode, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useEffect, useRef, useState } from "react";
import { Map, MapCard } from "./mapCard";
import {
    Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    TableCell
  } from "@nextui-org/table";
import {DateValue, today, getLocalTimeZone} from "@internationalized/date";
import {DatePicker, Input, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Snippet} from "@nextui-org/react";
import { useRouter } from "next/navigation";


const requestInsertFinish = async (finishData: any) => {
    const response = await fetch('/api/finish', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(finishData)
    });
    return response.json();
}

export const Dashboard = ({maps, user}: {maps: any, user: string}) => {
    const [editMode, setEditMode] = useState(false);
    const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();
    const mapInput = useRef<HTMLInputElement>(null);
    const clipInput = useRef<HTMLInputElement>(null);
    const passwordInput = useRef<HTMLInputElement>(null);
    const [dateInput, setDateInput] = useState<DateValue>();
    const [showWarning, setShowWarning] = useState(false);
    const [warningMessage, setWarningMessage] = useState('');
    const router = useRouter();

    const submitNewclip = async () => {
        let newClip = {
            map: mapInput.current?.value,
            clip: clipInput.current?.value,
            password: passwordInput.current?.value,
            date: `${dateInput?.year}-${dateInput?.month}-${dateInput?.day}`,
            username: user
        }
        console.log(dateInput)
        if (!newClip.map || !newClip.clip || !newClip.password) {
            setShowWarning(true);
            setWarningMessage('All fields are required');
            return;
        } else {
            // TODO call api to add new clip
            console.log(newClip)
            let response = await requestInsertFinish(newClip);
            console.log(response)
            if (response.error) {
                setShowWarning(true);
                setWarningMessage(response.error);
            } else {
                onClose();
                router.refresh()
            }
        }
        console.log(newClip)
    }

    console.log(maps)
    return (
        <>
            <Button onPress={() => setEditMode(prev => !prev)}>Edit</Button>
            {editMode && (
                <Button onPress={onOpen}>Add finish</Button>
            )}
            {!editMode && (
                <div className="flex flex-wrap inline gap-4 justify-center pt-6">
                    {maps?.map((map: { map: Map; }) => (
                        <MapCard mapPage={user ? false : true} allMaps key={map.map ? map.map.name : map.name} map={map.map ? map.map : map} clip={map.clip}/>
                    ))}
                </div>
            )}
            {editMode && (
                // TODO move to own table component
                <Table>
                    <TableHeader>
                        <TableColumn>Map</TableColumn>
                        <TableColumn>Author</TableColumn>
                        <TableColumn>Clip</TableColumn>
                    </TableHeader>
                    <TableBody>
                        {maps?.map((map: { map: { name: boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | Promise<AwaitedReactNode> | Key | null | undefined; author: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; }; clip: string | undefined; }) => (
                            <TableRow key={map.map.name}>
                                <TableCell>{map.map.name}</TableCell>
                                <TableCell>{map.map.author}</TableCell>
                                <TableCell><a href={map.clip} target="_blank" style={{ textDecoration: "underline" }}>Go to clip</a></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
            {/* TODO move to own component bla */}
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true}>
                <ModalContent>
                {(onClose) => (
                    <>
                    <ModalHeader className="flex flex-col gap-1">Add New Finish</ModalHeader>
                    <ModalBody>
                        <Input ref={mapInput} label="Map" placeholder="Enter map number" />
                        <Input ref={clipInput} label="Clip" placeholder="Enter clip URL" />
                        <DatePicker defaultValue={today(getLocalTimeZone())} value={dateInput} onChange={setDateInput} label="Clip date" className="max-w-[284px]" />
                        { showWarning && (
                            <Snippet symbol="" hideCopyButton color="danger" variant="solid">
                                {warningMessage}
                            </Snippet>
                        )}
                        <Input type="password" ref={passwordInput} label="Password" placeholder="Enter edit password" />
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" variant="light" onPress={onClose}>
                            Close
                        </Button>
                        <Button color="primary" onPress={submitNewclip}>
                            Submit
                        </Button>
                    </ModalFooter>
                    </>
                )}
                </ModalContent>
            </Modal>
        </>
        );
};
