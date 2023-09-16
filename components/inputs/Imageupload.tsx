'use client';
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useCallback } from "react";
import { TbPhotoPlus } from "react-icons/tb";

interface ImageUploadProps {
    value: string;
    onChange: (value: string) => void;
}

const preset = 'zumse8uh'

const ImageUpload: React.FC<ImageUploadProps> = ({
    value,
    onChange
}) => {

    const handleUpload = useCallback((result: any) => {
        onChange(result.info.secure_url);
    }, [onChange]);

    return (<CldUploadWidget
        onUpload={handleUpload}
        uploadPreset={preset}
        options={{
            maxFiles: 1
        }}
    >
        {
            ({ open }) => {
                return <div
                    onClick={() => open?.()}
                    className="
                relative
                p-20
                border-2
                border-dashed
                border-neutral-300
                flex
                flex-col
                items-center
                justify-center
                gap-4
                text-neutral-600
                cursor-pointer
                hover:opacity-70
                transition
                "
                >
                    <TbPhotoPlus size={50} />
                    <div className="font-semibold text-lg">
                        Click to upload
                    </div>
                    {
                        value && (
                            <div
                                className="
                            absolute
                            inset-0
                            h-full
                            w-full
                            "
                            >
                                <Image
                                    src={value}
                                    alt="House"
                                    fill
                                    style={{ objectFit: 'contain' }}
                                />
                            </div>
                        )
                    }
                </div>
            }
        }
    </CldUploadWidget>);
}

export default ImageUpload;