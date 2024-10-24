"use client"
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, NavbarMenuToggle, NavbarMenu, NavbarMenuItem} from "@nextui-org/react";
import { redirect, usePathname } from "next/navigation";
import { useState } from "react";


export default function Header({isMobile}: {isMobile: boolean}) {
    /* TODO add sign up or contact button? */
    /* TODO add search map? */
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();
    
    return (
        <Navbar
            suppressHydrationWarning
            classNames={{
                item: [
                    "flex",
                    "relative",
                    "h-full",
                    "justify-between",
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
                <NavbarItem isActive={pathname == "/About"}>
                    <Link href="/About" color={pathname == "/About" ? "primary" : "foreground"}>
                        About
                    </Link>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end">
                {/* <NavbarItem className="hidden lg:flex">
                <Link href="#">Login</Link>
                </NavbarItem>
                <NavbarItem>
                <Button as={Link} color="primary" href="#" variant="flat">
                    Sign Up
                </Button>
                </NavbarItem> */}
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
                </NavbarMenu>
            }
        </Navbar>
  );
}