/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import { axiosClient } from '@/lib/getStaticProps';
import { RootState } from '../../../redux/store';
import { resetCart } from '@/redux/slice/cartSlice';

export interface IForm {
    firstName: string;
    name: string;
    city: string;
    address: string;
    phoneNumber: number | string;
    email: string;
}
export const createBrandSchema = Yup.object().shape({
    firstName: Yup.string().required('Họ là trường bắt buộc'),
    name: Yup.string().required('Tên là trường bắt buộc'),
    city: Yup.string().required('Thành Phố/Tỉnh Thành là trường bắt buộc'),
    address: Yup.string().required('Địa Chỉ là trường bắt buộc'),
    phoneNumber: Yup.string().matches(/^\d{3}\d{3}\d{4}$/, 'Số điện thoại không hợp lệ'),
    email: Yup.string().required('Email là trường bắt buộc').email('Email không hợp lệ'),
});

export const CheckoutForm = () => {
    const cart = useSelector((state: RootState) => state.cart);

    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isValid },
    } = useForm<IForm>({
        resolver: yupResolver(createBrandSchema),
        mode: 'onChange',
    });

    const onSubmit = async (data: IForm) => {
        const newData = { ...data, orderDetails: cart };
        try {
            const response = await axiosClient.post('/api/order', newData);

            if (response.data.status === 'success') {
                toast.success('Success');
                dispatch(resetCart());
                reset();
            }
        } catch (error) {
            toast.error('Some thing went wrong ! please try again');
        }
    };
    return (
        <div className="lg:col-span-8 border border-gray-200 px-4 py-4 rounded">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="text-lg font-medium flex uppercase justify-center items-center gap-4 flex-col my-8">
                    <img src="/images/checkout.png" alt="" className="w-20 h-20" />
                </div>
                <div className="space-y-4 md:px-8 pb-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                            <label className="text-gray-600 mb-2 block">
                                Họ <span className="">*</span>
                            </label>
                            <input {...register('firstName')} className="pl-2" name="firstName" type="text" />
                            {errors?.firstName && <ErrMess message={errors.firstName.message as string} />}
                        </div>
                        <div>
                            <label className="text-gray-600 mb-2 block">
                                Tên <span className="">*</span>
                            </label>
                            <input {...register('name')} className="pl-2" name="name" type="text" />
                            {errors?.name && <ErrMess message={errors.name.message as string} />}
                        </div>
                    </div>

                    <div>
                        <label className="text-gray-600 mb-2 block">
                            Thành Phố/Tỉnh Thành <span className="">*</span>
                        </label>
                        <input {...register('city')} className="pl-2" name="city" type="text" />
                        {errors?.city && <ErrMess message={errors.city.message as string} />}
                    </div>
                    <div>
                        <label className="text-gray-600 mb-2 block">
                            Địa Chỉ <span className="">*</span>
                        </label>
                        <input {...register('address')} className="pl-2" name="address" type="text" />
                        {errors?.address && <ErrMess message={errors.address.message as string} />}
                    </div>

                    <div>
                        <label className="text-gray-600 mb-2 block">
                            Số Điện Thoại <span className="">*</span>
                        </label>
                        <input {...register('phoneNumber')} className="pl-2" name="phoneNumber" type="text" />
                        {errors?.phoneNumber && <ErrMess message={errors.phoneNumber.message as string} />}
                    </div>
                    <div>
                        <label className="text-gray-600 mb-2 block">
                            Địa Chỉ Email <span className="">*</span>
                        </label>
                        <input {...register('email')} className="pl-2" name="email" type="text" />
                        {errors?.email && <ErrMess message={errors.email.message as string} />}
                    </div>

                    <button
                        disabled={!isValid}
                        // href="/order-complete"
                        className={`${
                            !isValid ? 'cursor-not-allowed' : 'cursor-pointer'
                        } bg-primary text-white px-4 py-3 font-medium rounded-md uppercase hover:opacity-75 text-sm w-full block text-center`}
                    >
                        ĐẶT HÀNG
                    </button>
                </div>
            </form>
        </div>
    );
};

const ErrMess = ({ message }: { message: string }) => (
    <p className="mt-2 text-sm italic w-full text-red-600 capitalize">{message}</p>
);
