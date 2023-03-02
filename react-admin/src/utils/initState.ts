export const initialStateCategoryForm = {
    name: '',
    description: '',
    active: true,
    image: '',
};

export const initialStateColorForm = {
    title: '',
    code: '',
};

export const initialStateBrandForm = {
    title: '',
};

export const initialStateProductForm = {
    name: '',
    description: '',
    user: '',
    category: '',
    color: [],
    brand: '',
    imageURL: [],
    promotion: 0,
    price: 1,
    quantity: 1,
    active: true,
};

export const initialStateCreateUserForm = {
    fullName: '',
    address: '',
    phoneNumber: '',
    email: '',
    password: '',
    confirm: '',
};

export const initialStateUpdateUserForm = {
    fullName: '',
    avatar: '',
    address: '',
    phoneNumber: '',
    email: '',
    password: '',
    newPass: '',
    confirm: '',
};

export const initialStateLoginForm = {
    email: 'administrator@admin.com',
    password: 'password',
};

export const initialStateRegisterForm = {
    fullName: '',
    email: '',
    password: '',
};

export const initialStateOrderForm = {
    firstName: '',
    name: '',
    city: '',
    address: '',
    phoneNumber: '',
    email: '',
    status: '',
    orderDetails: [],
    createdAt: '',
    updatedAt: '',
};
