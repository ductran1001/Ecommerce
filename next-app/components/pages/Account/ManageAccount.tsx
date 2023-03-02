import React from 'react';

type Props = {};

export const ManageAccount = (props: Props) => {
    return (
        <div className="col-span-9 grid md:grid-cols-3 gap-4 mt-6 lg:mt-0">
            {/* single card */}
            <div className="shadow rounded bg-white px-4 pt-6 pb-8">
                <div className="flex justify-between items center mb-4">
                    <h3 className="font-medium capitalize text-gray-800 text-lg">personal profile</h3>
                    <a href="#" className="">
                        Edit
                    </a>
                </div>
                <div className="space-y-1">
                    <h4 className="text-gray-700 font-medium">Russell Ahmed</h4>
                    <p className="text-gray-800">example@mail.com</p>
                    <p className="text-gray-800">(123) 456-789</p>
                </div>
            </div>
            {/* single card end */}
            {/* single card */}
            <div className="shadow rounded bg-white px-4 pt-6 pb-8">
                <div className="flex justify-between items center mb-4">
                    <h3 className="font-medium capitalize text-gray-800 text-lg">Shipping Address</h3>
                    <a href="#" className="">
                        Edit
                    </a>
                </div>
                <div className="space-y-1">
                    <h4 className="text-gray-700 font-medium">Russell Ahmed</h4>
                    <p className="text-gray-800">3891 Ranchview Dr.</p>
                    <p className="text-gray-800">Richardson, Califora</p>
                    <p className="text-gray-800">(123) 456-789</p>
                </div>
            </div>
            {/* single card end */}
            {/* single card */}
            <div className="shadow rounded bg-white px-4 pt-6 pb-8">
                <div className="flex justify-between items center mb-4">
                    <h3 className="font-medium capitalize text-gray-800 text-lg">Billing Address</h3>
                    <a href="#" className="">
                        Edit
                    </a>
                </div>
                <div className="space-y-1">
                    <h4 className="text-gray-700 font-medium">Russell Ahmed</h4>
                    <p className="text-gray-800">3891 Ranchview Dr.</p>
                    <p className="text-gray-800">Richardson, Califora</p>
                    <p className="text-gray-800">(123) 456-789</p>
                </div>
            </div>
            {/* single card end */}
        </div>
    );
};
