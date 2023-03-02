import React from 'react';

type Props = {};

export const ManageAddress = (props: Props) => {
    return (
        <div className="col-span-9 shadow rounded px-6 pt-5 pb-7 mt-6 lg:mt-0">
            <form>
                <h3 className="text-lg font-medium capitalize mb-4">Manage Address</h3>
                <div className="space-y-4">
                    {/* Form row */}
                    <div className="grid sm:grid-cols-2 gap-4">
                        {/* Single input */}
                        <div>
                            <label className="text-gray-600 mb-2 block">Full Name</label>
                            <input type="text" className="input-box" defaultValue="John" />
                        </div>
                        {/* single input end */}
                        {/* single input */}
                        <div>
                            <label className="text-gray-600 mb-2 block">Phone Number</label>
                            <input type="text" className="input-box" defaultValue="+123 456 789" />
                        </div>
                        {/* Single input end */}
                    </div>
                    {/* Form row end */}
                    <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                            <label className="text-gray-600 mb-2 block">Country</label>
                            <select className="input-box">
                                <option>Bangladesh</option>
                                <option>Bidesh</option>
                            </select>
                        </div>
                        <div>
                            <label className="text-gray-600 mb-2 block">Region</label>
                            <select className="input-box">
                                <option>Dhaka</option>
                                <option>Noakhali</option>
                            </select>
                        </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                            <label className="text-gray-600 mb-2 block">City</label>
                            <select className="input-box">
                                <option>Dhaka-North</option>
                                <option>Dhaka-South</option>
                            </select>
                        </div>
                        <div>
                            <label className="text-gray-600 mb-2 block">Area</label>
                            <select className="input-box">
                                <option>Notun Bazar</option>
                                <option>Gulshan</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="text-gray-600 mb-2 block">Address</label>
                        <input type="text" className="input-box" defaultValue="Badda Notun Bazar" />
                    </div>
                </div>
                <div className="mt-6">
                    <button
                        type="submit"
                        className="px-6 py-2 text-center text-white bg-primary border border-primary rounded hover:bg-transparent hover: transition uppercase font-roboto font-medium"
                    >
                        Save change
                    </button>
                </div>
            </form>
        </div>
    );
};
