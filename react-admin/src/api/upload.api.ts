import { axiosClient } from 'libraries/axiosClient';

const urlUpload = '/api/upload';
const headers = { 'Content-type': 'multipart/form-data' };

export const upload = async (link: string, formData: FormData) =>
    await axiosClient.post(`${urlUpload}/${link}`, formData, { headers });
