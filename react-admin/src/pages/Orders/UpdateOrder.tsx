import React from 'react';
import { AxiosError } from 'axios';
import { IError, IOrder } from 'interfaces';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useMutation, useQuery } from '@tanstack/react-query';
import * as Utils from 'utils';
import * as Layouts from 'components/Layouts';
import * as Apis from 'api';
import numeral from 'numeral';

export const UpdateOrder = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = React.useState<IOrder>(Utils.initialStateOrderForm);

    const mutationUpdate = useMutation({
        mutationFn: (body: string) => Apis.updateOrder(id as string, body),
    });

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const status = order.status;
        mutationUpdate.mutate(status, {
            onSuccess: () => {
                toast.success('Update Success');
                navigate('/admin/orders');
            },
            onError(error) {
                const mgs = ((error as AxiosError).response?.data as IError).message ?? 'Something went wrong!';
                toast.error(mgs);
            },
        });
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        event.preventDefault();
        setOrder((prevState) => ({ ...prevState, status: event.target.value }));
    };

    const queryOrder = useQuery({
        queryKey: ['order', id],
        queryFn: () => Apis.getOrderById(id as string),
        enabled: id !== undefined,
        onSuccess: (data) => setOrder((prevState) => ({ ...prevState, ...data.data.contents })),
    });

    let initialValue = 0;
    let sum = order?.orderDetails.reduce(function (total, currentValue) {
        const price = Math.round(currentValue.price - (currentValue.price / 100) * currentValue.promotion);
        const getSum = price * currentValue.quantity;
        return total + getSum;
    }, initialValue);

    if (queryOrder.error) return Layouts.Error((queryOrder.error as AxiosError).message);
    return (
        <div className="flex flex-col h-full gap-10 px-4 pt-12">
            {queryOrder.isLoading || mutationUpdate.isLoading ? <Layouts.Loading /> : null}
            <Layouts.Breadcrumb page="orders" sub="update" />
            {order && (
                <div className="flex flex-col items-center justify-center">
                    <div className="flex md:flex-row flex-col w-full px-4 py-12 mb-12 bg-white rounded-md shadow-md sm:px-6 md:px-8 lg:px-10">
                        <div className="flex w-full justify-between flex-col">
                            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                                <table className="w-full text-left text-gray-500">
                                    <thead className="text-gray-700 uppercase bg-gray-50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3">
                                                <span className="sr-only">Image</span>
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Product
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Qty
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Price
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Promotion
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Total
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {order.orderDetails.map((item, i) => (
                                            <tr key={i} className="bg-white border-b hover:bg-gray-50">
                                                <td className="px-6 py-4 capitalize max-w-[250px]">
                                                    <div className="flex items-center w-full gap-2">
                                                        <div className="h-40 w-[150px]">
                                                            <img
                                                                src={item.image}
                                                                alt=""
                                                                className="w-full h-full rounded-lg"
                                                            />
                                                        </div>
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                                                <td className="px-6 py-4">{item.quantity}</td>
                                                <td className="px-6 py-4">{numeral(item.price).format('0,0')}</td>
                                                <td className="px-6 py-4">{item.promotion}</td>
                                                <td className="px-6 py-4">
                                                    {numeral(item.price - (item.price / 100) * item.promotion).format(
                                                        '0,0'
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="py-4 justify-between flex lg:flex-row flex-col gap-4 mt-2">
                                <div className="border py-2.5 pb-8 px-4">
                                    <div className="px-1 py-4">
                                        Customer Name : {order.firstName} {order.name}
                                    </div>
                                    <div className="px-1 py-4">Phone Number : {order.phoneNumber}</div>
                                    <div className="px-1 py-4">Customer Email : {order.email}</div>
                                    <div className="px-1 py-4">
                                        Address : {order.address}, {order.city}
                                    </div>
                                    <form onSubmit={(event) => handleSubmit(event)} className="flex gap-4">
                                        <select
                                            onChange={(event) => handleChange(event)}
                                            value={order.status}
                                            className="w-44 text-sm text-gray-600 px-4 py-3 border border-gray-300 shadow-sm rounded uppercase focus:outline-none"
                                        >
                                            <option value="waiting">waiting</option>
                                            <option value="delivery">delivery</option>
                                            <option value="complete">complete</option>
                                        </select>
                                        <div className="w-44">
                                            <button className="w-full px-4 py-2.5 bg-green-500 text-white uppercase hover:opacity-75">
                                                Update
                                            </button>
                                        </div>
                                    </form>
                                </div>

                                <div className="text-lg uppercase font-semibold text-red-500">
                                    SUM: {numeral(sum).format('0,0')} VND
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
