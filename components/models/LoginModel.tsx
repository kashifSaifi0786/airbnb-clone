'use client'
import { useCallback, useState } from 'react'
import Heading from "../Heading";
import Input from "../inputs/Input";
import Model from "./Model";
import Button from '../Button';

import useRegisterModel from "@/hooks/useRegisterModel";
import useLoginModel from '@/hooks/useLoginModel';

import { FcGoogle } from 'react-icons/fc'
import { AiFillGithub } from 'react-icons/ai'
import { toast } from 'react-hot-toast';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import {
    SubmitHandler,
    FieldValues,
    useForm
} from 'react-hook-form';

const LoginModel = () => {
    const router = useRouter();
    const registerModel = useRegisterModel();
    const loginModel = useLoginModel();
    const [loading, setLoading] = useState(false);
    const { register,
        handleSubmit,
        formState: {
            errors
        }
    } = useForm<FieldValues>({
        defaultValues: {
            email: '',
            password: ''
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setLoading(true)
        signIn('credentials', {
            ...data,
            redirect: false
        }).then(callback => {
            setLoading(false);

            if (callback?.ok) {
                toast.success("Logged in")
                router.refresh();
                loginModel.onClose();
            }
            if (callback?.error) {
                toast.error(callback.error);
            }
        })
    }

    const toggle = useCallback(() => {
        loginModel.onClose();
        registerModel.onOpen()
    }, [loginModel, registerModel])

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading
                title="Welcome to Airbnb"
                subtitle="create an account!"
            />
            <Input
                id="email"
                label="Email"
                disabled={loading}
                register={register}
                errors={errors}
                required
            />
            <Input
                id="password"
                label="Password"
                type='password'
                disabled={loading}
                register={register}
                errors={errors}
                required
            />
        </div>
    )

    const footerContent = (
        <div className='flex flex-col mt-3 gap-4'>
            <hr />
            <Button
                label='Continue with Google'
                onClick={() => signIn('google')}
                icon={FcGoogle}
                outlined
            />
            <Button
                label='Continue with Github'
                onClick={() => signIn('github')}
                icon={AiFillGithub}
                outlined
            />
            <p className='text-center text-neutral-500 font-light mt-4'>
                First time using Airbnb?
                <span
                    onClick={toggle}
                    className='text-neutral-800 hover:underline cursor-pointer'>
                    Create an account
                </span>
            </p>
        </div>
    )

    return (<Model
        title="Login"
        actionLabel="Continue"
        isOpen={loginModel.isOpen}
        onClose={loginModel.onClose}
        onSubmit={handleSubmit(onSubmit)}
        body={bodyContent}
        footer={footerContent}
        disabled={loading}
    />);
}

export default LoginModel;