'use client';

import { unstable_SuspenseList } from "react";
import Container from "../Container";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";
import { SafeUser } from "@/types";
import Categories from "./Categories";

interface NavbarProps {
    currentUser?: SafeUser | null;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
    return (<div
        className="fixed w-full bg-white z-10 shadow-sm"
    >
        <div className="py-4 border-b">
            <Container >
                <div className="flex items-center justify-between gap-3 md:gap-0">
                    <Logo />
                    <Search />
                    <UserMenu currentUser={currentUser} />
                </div>
            </Container>
        </div>
        <Categories />
    </div>);
}

export default Navbar;