import { Range } from 'react-date-range'
import Calender from '../inputs/Calender';
import Button from '../Button';

interface ListingReservationProps {
    price: number;
    totalPrice: number;
    disabled?: boolean;
    dateRenge: Range;
    onChangeDate: (value: Range) => void;
    onSubmit: () => void;
    disabledDates: Date[]
}

const ListingReservation: React.FC<ListingReservationProps> = ({
    price,
    totalPrice,
    dateRenge,
    onChangeDate,
    disabled,
    onSubmit,
    disabledDates
}) => {
    return (<div className='
    flex
    flex-col
    border
    border-neutral-200
    rounded-xl
    overflow-hidden
    '>

        <div
            className='flex items-center gap-1 p-4'
        >
            <div className='text-2xl font-semibold'>$ {price}</div>
            <div className='text-neutral-500'>night</div>
        </div>
        <hr />

        <Calender
            value={dateRenge}
            onChange={(value) => onChangeDate(value.selection)}
            disabledDates={disabledDates}
        />
        <hr />

        <div className='p-4'>
            <Button
                label='Reserve'
                onClick={onSubmit}
                disabled={disabled}
            />
        </div>
        <hr />
        <div className='p-4 flex items-center justify-between text-lg font-semibold'>
            <div>Total</div>
            <div>$ {totalPrice}</div>
        </div>
    </div>);
}

export default ListingReservation;