"use client"
import {User, Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Dropdown, DropdownTrigger, Button, DropdownMenu, DropdownItem, DropdownSection} from "@nextui-org/react";
import { redirect, usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronDown } from "./icons";

export async function isStreamerLive(channel: string): Promise<boolean> {
    const response = await fetch(`/api/streamerLive?user=${channel}`);
    return (await response.json()).isLive;
}

export default function Header({isMobile, players}: {isMobile: boolean, players: any[]}) {
    /* TODO add search map? */
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();
    const streamersLiveStatus: any = {}
    const [streamers, setStreamers] = useState<any>({})

    useEffect(() => {
        for (const player of players) {
            isStreamerLive(player.twitch).then((isLive) => {
                streamersLiveStatus[player.username] = isLive;
                if (players.indexOf(player) == players.length - 1) {
                    setStreamers(streamersLiveStatus)
                }
            })
        }
    }, [])

    const liveElement = () => {
        return <div className="live-indicator-block">
            <span className="live-indicator">
                <i className="fa fa-circle blink" aria-hidden="true"></i>Live
            </span>
        </div>
    }

    return (
        <Navbar
            suppressHydrationWarning
            classNames={{
                item: [
                    "flex",
                    "relative",
                    "h-full",
                    "justify-between",
                    "items-center",
                    "pl-0",
                    "pr-0",
                    "data-[active=true]:after:content-['']",
                    "data-[active=true]:after:absolute",
                    "data-[active=true]:after:bottom-3",
                    "data-[active=true]:after:left-0",
                    "data-[active=true]:after:right-0",
                    "data-[active=true]:after:h-[2px]",
                    "data-[active=true]:after:rounded-[2px]",
                    "data-[active=true]:after:bg-primary", 
                    "font-semibold"         
                ]
            }}
            onMenuOpenChange={setIsMenuOpen}>
            {isMobile &&
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="sm:hidden"
                />
            }
            <NavbarBrand onClick={() => {redirect('/dashboard/maps')}}>
                <Link href="/dashboard/maps" color="foreground" className="font-bold">
                    Kacky Dashboard
                </Link>
            </NavbarBrand>
            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem isActive={pathname == "/dashboard/maps"}>
                    <Link href="/dashboard/maps" color={pathname == "/dashboard/maps" ? "primary" : "foreground"}>
                        Maps
                    </Link>
                </NavbarItem>
                <NavbarItem isActive={pathname == "/leaderboard"}>
                    <Link href="/leaderboard" color={pathname == "/leaderboard" ? "primary" : "foreground"}>
                        Leaderboard
                    </Link>
                </NavbarItem>
                <Dropdown>
                    <NavbarItem>
                        <DropdownTrigger>
                        <Button
                            disableRipple
                            className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                            endContent={<ChevronDown fill="currentColor" size={16} />}
                            radius="sm"
                            variant="light"
                        >
                            Players
                        </Button>
                        </DropdownTrigger>
                    </NavbarItem>
                    <DropdownMenu
                        aria-label="ACME features"
                        className="w-[340px]"
                        itemClasses={{
                        base: "gap-4",
                        }}
                    >
                        <DropdownSection>
                            { players.map((player, index) => (
                                <DropdownItem className="playerRow" key={index} onClick={() => router.push(`/dashboard/maps/${player.username}`)}>
                                   
                                    <User
                                        name={player.username}
                                        className="capitalize"
                                        avatarProps={{
                                            src: `/${player.username}.png`,
                                            size: "sm"
                                        }}
                                    />
                                     {streamers[player.username] &&
                                        liveElement()
                                    }
                                </DropdownItem>
                            ))}
                        </DropdownSection>
                    </DropdownMenu>
                </Dropdown>
                <NavbarItem isActive={pathname == "/About"}>
                    <Link href="/About" color={pathname == "/About" ? "primary" : "foreground"}>
                        About
                    </Link>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end">
            </NavbarContent>
            {isMobile &&
                <NavbarMenu>
                    <NavbarMenuItem key={1}>
                        <Link href="/dashboard/maps" color={pathname == "/dashboard/maps" ? "primary" : "foreground"}>
                            Maps
                        </Link>
                    </NavbarMenuItem>
                    <NavbarMenuItem key={2}>
                        <Link href="/leaderboard" color={pathname == "/leaderboard" ? "primary" : "foreground"}>
                            Leaderboard
                        </Link>
                    </NavbarMenuItem>
                    <NavbarMenuItem key={3}>
                        <Link href="/about" color={pathname == "/about" ? "primary" : "foreground"}>
                            About
                        </Link>
                    </NavbarMenuItem>
                </NavbarMenu>
            }
        </Navbar>
  );
}