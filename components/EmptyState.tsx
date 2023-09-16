'use client'
import Button from "./Button";
import Heading from "./Heading";
import { useRouter } from "next/navigation";

interface EmptyStateProps {
    title?: string;
    subtitle?: string;
    showReset?: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({
    title = 'No exact matches',
    subtitle = 'Try changing or removing some of your filters',
    showReset
}) => {
    const router = useRouter()
    return (<div className="
    h-[60vh]
    flex
    flex-col
    items-center
    justify-center
    gap-2
    ">
        <Heading
            title={title}
            subtitle={subtitle}
            center
        />
        <div className="w-48 mt-4">

            {
                showReset && (
                    <Button
                        label="Remove all filters"
                        onClick={() => router.push('/')}
                        outlined
                    />
                )
            }
        </div>
    </div>);
}

export default EmptyState;