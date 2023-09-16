'use client'
import { useMemo, useState } from "react";
import Model from "./Model";
import useRentModel from "@/hooks/useRentModel";
import Heading from "../Heading";
import { categories } from "../Navbar/Categories";
import CategoryInput from "../inputs/CategoryInput";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import CountrySelect from "../inputs/CountrySelect";
import Counter from "../inputs/Counter";
import ImageUpload from "../inputs/Imageupload";
import Input from "../inputs/Input";
import dynamic from "next/dynamic";
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from "react-hot-toast";

enum STEPS {
    CATEGORY = 0,
    LOCATION = 1,
    INFO = 2,
    IMAGES = 3,
    DESCRIPTION = 4,
    PRICE = 5
}

const RentModel = () => {
    const router = useRouter();
    const rentModel = useRentModel();
    const [loading, setLoading] = useState(false)
    const [steps, setSteps] = useState(STEPS.CATEGORY);
    const {
        register,
        handleSubmit,
        setValue,
        reset,
        watch,
        formState: {
            errors
        }
    } = useForm<FieldValues>({
        defaultValues: {
            category: '',
            location: null,
            guestCount: 1,
            roomCount: 1,
            bathroomCount: 1,
            imageSrc: '',
            price: 1,
            title: '',
            description: ''
        }
    })

    const category = watch('category');
    const location = watch('location');
    const guestCount = watch('guestCount');
    const roomCount = watch('roomCount');
    const bathroomCount = watch('bathroomCount');
    const imageSrc = watch('imageSrc');

    const Map = useMemo(() => dynamic(() => import('../Map'), {
        ssr: false
    }), [location])

    const setCustomValues = (id: string, value: any) => {
        setValue(id, value, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true
        })
    }

    const onBack = () => {
        setSteps(value => value - 1)
    }

    const onNext = () => {
        setSteps(value => value + 1)
    }

    const actionLabel = useMemo(() => {
        if (steps === STEPS.PRICE) {
            return 'Create'
        }

        return 'Next'
    }, [steps])

    const secondaryActionLabel = useMemo(() => {
        if (steps === STEPS.CATEGORY) {
            return undefined;
        }

        return 'Back'
    }, [steps])

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        if (steps !== STEPS.PRICE) {
            return onNext();
        }

        setLoading(true);
        axios.post('/api/listings', data)
            .then(() => {
                toast.success('Listing created')
                router.refresh()
                reset()
                setSteps(STEPS.CATEGORY);
                rentModel.onClose();
            })
            .catch(err => {
                toast.error('Something went wrong.')
            })
    }

    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading
                title="Which of these best describe your place?"
                subtitle="Pick a category"
            />
            <div className="
            grid
            grid-cols-1
            md:grid-cols-2
            max-h-[50vh]
            gap-3
            overflow-x-auto
            ">
                {
                    categories.map(item => (
                        <div key={item.label} className="col-span-1">
                            <CategoryInput
                                label={item.label}
                                icon={item.icon}
                                selected={item.label === category}
                                onClick={(value) => setCustomValues('category', value)}
                            />
                        </div>
                    ))
                }
            </div>
        </div>
    )

    if (steps === STEPS.LOCATION) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Where is your place located?"
                    subtitle="Help guests find you!"
                />
                <CountrySelect
                    value={location}
                    onChange={(value) => setCustomValues('location', value)}
                />
                <Map
                    center={location?.latlng}
                />
            </div>
        )
    }

    if (steps === STEPS.INFO) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Share some basics about your place"
                    subtitle="What amenities do you have?"
                />
                <Counter
                    title="Guests"
                    subtitle="How many guests do you allow?"
                    value={guestCount}
                    onChange={(value) => setCustomValues('guestCount', value)}
                />
                <hr />
                <Counter
                    title="Rooms"
                    subtitle="How many rooms do you have?"
                    value={roomCount}
                    onChange={(value) => setCustomValues('roomCount', value)}
                />
                <hr />
                <Counter
                    title="Bathrooms"
                    subtitle="How many bathrooms do you have?"
                    value={bathroomCount}
                    onChange={(value) => setCustomValues('bathroomCount', value)}
                />
            </div>
        )
    }

    if (steps === STEPS.IMAGES) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Add a photo of your place"
                    subtitle="Share guests what your place looks like!"
                />
                <ImageUpload
                    value={imageSrc}
                    onChange={(value) => setCustomValues('imageSrc', value)}
                />
            </div>
        )
    }

    if (steps === STEPS.DESCRIPTION) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="How would you describe your place?"
                    subtitle="Short and sweet works best!"
                />
                <Input
                    id="title"
                    label="Title"
                    register={register}
                    errors={errors}
                    required
                />
                <hr />
                <Input
                    id="description"
                    label="Description"
                    register={register}
                    errors={errors}
                    required
                />
            </div>
        )
    }

    if (steps === STEPS.PRICE) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Now, set your price"
                    subtitle="How much do you charge per night?"
                />
                <Input
                    id="price"
                    label="Price"
                    disabled={loading}
                    formatPrice
                    type="number"
                    register={register}
                    errors={errors}
                    required
                />
            </div>
        )
    }

    return (<Model
        title="Airbnb your home!"
        actionLabel={actionLabel}
        secondaryActionLabel={secondaryActionLabel}
        secondaryAction={onBack}
        isOpen={rentModel.isOpen}
        onClose={rentModel.onClose}
        onSubmit={handleSubmit(onSubmit)}
        body={bodyContent}
    />);
}

export default RentModel;