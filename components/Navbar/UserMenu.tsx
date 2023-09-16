'use client'
import { AiOutlineMenu } from 'react-icons/ai';
import Avatar from '../Avatar';
import { useCallback, useState } from 'react';
import MenuItem from './MenuItem';
import useRegisterModel from '@/hooks/useRegisterModel';
import useLoginModel from '@/hooks/useLoginModel';
import { SafeUser } from '@/types';
import { signOut } from 'next-auth/react';
import useRentModel from '@/hooks/useRentModel';
import { useRouter } from 'next/navigation';

interface UserMenuProps {
    currentUser?: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
    const router = useRouter();
    const registerModel = useRegisterModel();
    const loginModel = useLoginModel();
    const rentModel = useRentModel();
    const [isOpen, setIsOpen] = useState<Boolean>(false);

    const handleToggle = useCallback(() => {
        setIsOpen(state => !state);
    }, [])

    const onRent = useCallback(() => {
        if (!currentUser) {
            return loginModel.onOpen()
        }

        rentModel.onOpen();
    }, [loginModel, rentModel, currentUser])

    return <div className="relative">
        <div className='flex items-center gap-3'>
            <div
                onClick={onRent}
                className='
                hidden
                md:block
                text-sm
                font-semibold
                py-3 
                px-4 
                rounded-full 
                hover:bg-neutral-100 
                transition 
                cursor-pointer
            
            '>
                Airbnb your home
            </div>
            <div
                onClick={handleToggle}
                className='
            p-4
            md:py-1
            md:px-2
            border
            border-neutral-200
            rounded-full
            flex
            items-center
            gap-3          
            hover:shadow-md
            transition
            cursor-pointer  
            '
            >
                <AiOutlineMenu />
                <div className='hidden md:block'>
                    <Avatar src={currentUser?.image} />
                </div>
            </div>
        </div>
        {
            isOpen && (
                <div
                    className='
                absolute
                right-0
                top-12
                bg-white
                shadow-md
                w-[40vw]
                md:w-3/4
                rounded-xl
                overflow-hidden
                text-sm
                '
                >
                    <div className='flex flex-col cursor-pointer'>
                        {
                            currentUser ?
                                (
                                    <>
                                        <MenuItem
                                            onClick={() => router.push('/trips')}
                                            label='My trips'
                                        />
                                        <MenuItem
                                            onClick={() => router.push('/favourites')}
                                            label='My favourites'
                                        />
                                        <MenuItem
                                            onClick={() => router.push('/reservations')}
                                            label='My reservations'
                                        />
                                        <MenuItem
                                            onClick={() => router.push('/properties')}
                                            label='My properties'
                                        />
                                        <MenuItem
                                            onClick={rentModel.onOpen}
                                            label='Airbnb your home'
                                        />
                                        <MenuItem
                                            onClick={() => signOut()}
                                            label='Logout'
                                        />
                                    </>
                                ) :
                                (
                                    <>
                                        <MenuItem
                                            onClick={loginModel.onOpen}
                                            label='Log in'
                                        />
                                        <MenuItem
                                            onClick={registerModel.onOpen}
                                            label='Sign up'
                                        />
                                    </>
                                )
                        }
                    </div>
                </div>
            )
        }
    </div>
}

export default UserMenu;