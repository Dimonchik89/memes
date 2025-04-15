import axios from 'axios';
import { Meme, UpdateMeme } from '../types';

export const getData = async (): Promise<Meme[]> => {
	const { data } = await axios(import.meta.env.VITE_BASE_URL);
	return data;
};

export const updateMeme = async ({ id, body }: { id: string; body: UpdateMeme }) => {
	const { data } = await axios({
		url: `${import.meta.env.VITE_BASE_URL}/${id}`,
		method: 'PATCH',
		data: body,
	});
	return data;
};
