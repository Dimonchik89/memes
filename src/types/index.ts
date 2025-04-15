import { SVGProps } from 'react';

export type IconSvgProps = SVGProps<SVGSVGElement> & {
	size?: number;
};

export interface Meme {
	id: number;
	title: string;
	url: string;
	likes: string;
}

export enum MemeKeys {
	Id = 'id',
	Title = 'title',
	Url = 'url',
	Likes = 'likes',
	Actions = 'Actions',
}

export interface UpdateMeme extends Partial<Omit<Meme, 'id'>> {}
