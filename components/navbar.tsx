import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link} from "@nextui-org/react";
import { usePathname } from "next/navigation";

export default function Header() {
    /* TODO add sign up or contact button? */
    /* TODO add search map? */
    const pathname = usePathname();

    return (
        <Navbar
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
                ]
            }}>
            <NavbarBrand>
                <p className="font-bold text-inherit">Kacky Dashboard</p>
            </NavbarBrand>
            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem isActive={pathname == "/leaderboard"}>
                    <Link href="/leaderboard" color={pathname == "/leaderboard" ? "primary" : "foreground"}>
                        Leaderboard
                    </Link>
                </NavbarItem>
                <NavbarItem isActive={pathname == "/dashboard/maps"}>
                    <Link href="/dashboard/maps" color={pathname == "/dashboard/maps" ? "primary" : "foreground"}>
                        Maps
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
        </Navbar>
  );
}