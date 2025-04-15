import DefaultLayout from '@/layouts/default';
import { useQuery } from '@tanstack/react-query';
import { getData } from '../services/httpServices';
import { Image } from '@heroui/image';
import { Card, CardBody, CardFooter } from '@heroui/card';
import SpinnerComponent from '../components/SpinnerComponent/SpinnerComponent';
import Error from '../components/Error/Error';
import { AxiosError } from 'axios';

export default function ColumnsPage() {
	const { data, isLoading, isError, error } = useQuery({ queryKey: ['memes'], queryFn: getData });

	console.log(data);

	return (
		<DefaultLayout>
			<section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
				{isLoading ? <SpinnerComponent /> : null}
				{isError ? <Error message={(error as AxiosError)?.message} /> : null}
				{!isLoading && !isError && data ? (
					<div className="inline-block max-w-3xl text-center justify-center">
						<div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
							{data?.map((item, index) => (
								<Card key={index} isPressable shadow="sm" onPress={() => console.log('item pressed')}>
									<CardBody className="overflow-visible p-0">
										<Image alt={item.title} className="w-full object-cover h-[200px]" radius="lg" shadow="sm" src={item.url} width="100%" />
									</CardBody>
									<CardFooter className="text-small justify-between flex flex-col">
										<b>{item.title}</b>
										<p className="text-default-500">likes: {item.likes}</p>
										<a href={item.url} target="_blank">
											{item.title} link
										</a>
									</CardFooter>
								</Card>
							))}
						</div>
					</div>
				) : null}
			</section>
		</DefaultLayout>
	);
}
