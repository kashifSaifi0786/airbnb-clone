'use client'
import { useCallback, useState } from 'react'
import Heading from "../Heading";
import Input from "../inputs/Input";
import Model from "./Model";
import { FcGoogle } from 'react-icons/fc'
import { AiFillGithub } from 'react-icons/ai'
import { toast } from 'react-hot-toast';
import useRegisterModel from "@/hooks/useRegisterModel";
import axios from 'axios';
import { signIn } from 'next-auth/react';
import {
    SubmitHandler,
    FieldValues,
    useForm
} from 'react-hook-form';
import Button from '../Button';
import useLoginModel from '@/hooks/useLoginModel';

const RegisterModel = () => {
    const registerModel = useRegisterModel();
    const loginModel = useLoginModel()
    const [loading, setLoading] = useState(false);
    const { register,
        handleSubmit,
        formState: {
            errors
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setLoading(true)
        axios.post('/api/register', data)
            .then(() => {
                toast.success("Success")
                registerModel.onClose()
                loginModel.onOpen()
            })
            .catch((err) => toast.error('Somethig went wrong!'))
            .finally(() => setLoading(false))
    }

    const toggle = useCallback(() => {
        registerModel.onClose();
        loginModel.onOpen()
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
                id="name"
                label="Name"
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
                Already have an account
                <span
                    onClick={toggle}
                    className='text-neutral-800 hover:underline cursor-pointer'>
                    Log in
                </span>
            </p>
        </div>
    )

    return (<Model
        title="Register"
        actionLabel="Continue"
        isOpen={registerModel.isOpen}
        onClose={registerModel.onClose}
        onSubmit={handleSubmit(onSubmit)}
        body={bodyContent}
        footer={footerContent}
        disabled={loading}
    />);
}

export default RegisterModel;