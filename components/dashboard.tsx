"use client";
import { AwaitedReactNode, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useEffect, useMemo, useRef, useState } from "react";
import { MapCard } from "./mapCard";
import {
    Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    TableCell
  } from "@nextui-org/table";
import {DateValue, today, getLocalTimeZone} from "@internationalized/date";
import {Input} from "@nextui-org/input";
import {DatePicker} from "@nextui-org/date-picker";
import {
    Modal, 
    ModalContent, 
    ModalHeader, 
    ModalBody, 
    ModalFooter,
    useDisclosure
} from "@nextui-org/modal";
import {Button} from "@nextui-org/button";
import {Snippet} from "@nextui-org/snippet";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem} from "@nextui-org/dropdown";
import { useRouter } from "next/navigation";
import { isMobile } from 'react-device-detect';


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

const requestDeleteFinish = async (deleteData: any) => {
    const response = await fetch('/api/finish', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(deleteData)
    });
    return response.json();
}

const Dashboard = ({maps, user, all=false}: {maps: any, user?: string, all?: boolean}) => {
    const [editMode, setEditMode] = useState(false);
    const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();
    const mapInput = useRef<HTMLInputElement>(null);
    const clipInput = useRef<HTMLInputElement>(null);
    const passwordInput = useRef<HTMLInputElement>(null);
    const [dateInput, setDateInput] = useState<DateValue>(today(getLocalTimeZone()));
    const [showWarning, setShowWarning] = useState(false);
    const [warningMessage, setWarningMessage] = useState('');
    const router = useRouter();
    const [modalMode, setModalMode] = useState("add");
    const [deleteMapInfo, setDeleteMapInfo] = useState<any>({});
    const [selectedKeys, setSelectedKeys] = useState<any>(new Set(["All Maps"]));
    const [filteredMaps, setFilteredMaps] = useState<any>(maps);
    const [filterColor, setFilterColor] = useState<"default" | "danger" | "primary" | "secondary" | "success" | "warning" | undefined>("default");

    const selectedValue = useMemo(
        () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
        [selectedKeys]
    );

    useEffect(() => {
        console.log(selectedValue)
        if (selectedValue == "All Maps") {
            setFilteredMaps(maps);
            setFilterColor("default")
        } else if (selectedValue == "Finished Maps") {
            setFilteredMaps(maps.filter((map: any) => map.finishes.length > 0));
            setFilterColor("success")
        } else if (selectedValue == "Unfinished Maps") {
            setFilteredMaps(maps.filter((map: any) => map.finishes.length == 0));
            setFilterColor("warning")
        }
    }, [selectedValue])

    const submitNewclip = async () => {
        let newClip = {
            map: mapInput.current?.value,
            clip: clipInput.current?.value,
            password: passwordInput.current?.value,
            date: `${dateInput?.year}-${dateInput?.month}-${dateInput?.day}`,
            username: user
        }
        if (!newClip.map || !newClip.clip || !newClip.password) {
            setShowWarning(true);
            setWarningMessage('All fields are required');
            return;
        } else {
            // TODO call api to add new clip
            let response = await requestInsertFinish(newClip);
            if (response.error) {
                setShowWarning(true);
                setWarningMessage(response.error);
            } else {
                onClose();
                router.refresh()
            }
        }
    }

    const deleteClip = async () => {
        // TODO call api to delete clip
        let deleteInfo = {
            map: deleteMapInfo.map.name,
            clip: deleteMapInfo.clip,
            password: passwordInput.current?.value,
            username: user
        }
        if (!deleteInfo.password) {
            setShowWarning(true);
            setWarningMessage('All fields are required');
            return;
        } else {
            // TODO call api to add new clip
            let response = await requestDeleteFinish(deleteInfo);
            if (response.error) {
                setShowWarning(true);
                setWarningMessage(response.error);
            } else {
                onClose();
                router.refresh()
            }
        }
    }

    function titleCase(word: string) {
        return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
     }


    return (
        <>
            {(isMobile || user) &&
                <h2 className={`text-center text-gray-900 text-3xl font-extrabold md:text-5xl lg:text-6xl ${isMobile ? 'pt-3' : 'pt-0'} w-full`}>
                    <span className={`text-transparent bg-clip-text bg-gradient-to-r ${user ? "to-stone-400 from-neutral-500" : "to-indigo-600 from-violet-400"}`}>Maps {user ? ` finished by ${titleCase(user)}` : ""}</span>
                </h2>
            }
            {!all ? 
                (<Button 
                    className="absolute top-3 right-3 z-50"
                    onPress={() => setEditMode(prev => !prev)}>Edit</Button>) :
                (<Dropdown>
                    <DropdownTrigger>
                        <Button 
                            variant="bordered"
                            color={filterColor}
                            className="absolute top-4 right-4 z-40"
                        >
                            {selectedValue}
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                        aria-label="Static Actions"
                        selectionMode="single"
                        selectedKeys={selectedKeys}
                        onSelectionChange={setSelectedKeys}
                    >
                        <DropdownItem key="All Maps">All Maps</DropdownItem>
                        <DropdownItem key="Finished Maps">Finished Maps</DropdownItem>
                        <DropdownItem key="Unfinished Maps">Unfinished Maps</DropdownItem>
                    </DropdownMenu>
                </Dropdown>)
            }
            {editMode && (
                <Button onPress={() => {
                    setModalMode("add");
                    setShowWarning(false);
                    onOpen();
                }}>Add finish</Button>
            )}
            {!editMode && (
                /* <div className="flex flex-wrap inline gap-4 justify-center pt-6"> */
                <>
                    {filteredMaps.length == 0 && user && (
                        <h1 className="text-2xl font-bold text-center w-full">No maps finished by {titleCase(user as string)}</h1>
                    )}
                    <div className={`grid ${isMobile ? "min-w-[100%]" : "min-w-[50%]"} grid-cols-1 ${all ? "sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5" : (isMobile ? "grid-cols-1" : (maps.length == 1 ? "grid-cols-1" : maps.length % 2 == 0 ? "grid-cols-2" : "grid-cols-3"))} gap-5 justify-center pt-6 px-5 pb-20`}>
                        {filteredMaps?.map(async (map: any) => (
                            <MapCard mapPage={user ? false : true} allMaps={all} key={map.map ? map.map.name : map.name} map={map.map ? map.map : map} clip={map.clip} user={user || ''}/>
                        ))}
                    </div>
                </>
            )}
            {editMode && (
                // TODO move to own table component
                <Table>
                    <TableHeader>
                        <TableColumn>Map</TableColumn>
                        <TableColumn>Author</TableColumn>
                        <TableColumn>Clip</TableColumn>
                        <TableColumn>{""}</TableColumn>
                    </TableHeader>
                    <TableBody>
                        {maps?.map((map: { map: { name: boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | Promise<AwaitedReactNode> | Key | null | undefined; author: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; }; clip: string | undefined; }, index: number) => (
                            <TableRow key={index}>
                                <TableCell>{map.map.name}</TableCell>
                                <TableCell>{map.map.author}</TableCell>
                                <TableCell><a href={map.clip} target="_blank" style={{ textDecoration: "underline" }}>Go to clip</a></TableCell>
                                <TableCell><Button onPress={() => {
                                    setModalMode("delete");
                                    setDeleteMapInfo(map);
                                    setShowWarning(false);
                                    onOpen();
                                }}>Remove</Button></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
            
            {/* TODO move to own component bla */}
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true}>
                <ModalContent>
                {(onClose) => (
                    modalMode == "delete" ? (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Delete Finish</ModalHeader>
                            <ModalBody>
                                <p>Are you sure you want to delete this finish?</p>
                                <Input type="password" ref={passwordInput} label="Password" placeholder="Enter edit password" />
                                { showWarning && (
                                    <Snippet symbol="" hideCopyButton color="danger" variant="solid">
                                        {warningMessage}
                                    </Snippet>
                                )}
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Cancel
                                </Button>
                                <Button color="primary" onPress={deleteClip}>
                                    Confirm
                                </Button>
                            </ModalFooter>
                        </>
                    ) :
                    <>
                        <ModalHeader className="flex flex-col gap-1">Add New Finish</ModalHeader>
                        <ModalBody>
                            <Input ref={mapInput} label="Map" placeholder="Enter map number" />
                            <Input ref={clipInput} label="Clip" placeholder="Enter clip URL" />
                            <DatePicker defaultValue={today(getLocalTimeZone())} value={dateInput as any} onChange={setDateInput as any} label="Clip date" className="max-w-[284px]" />
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

export default Dashboard;