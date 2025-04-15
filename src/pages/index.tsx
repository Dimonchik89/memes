import DefaultLayout from '@/layouts/default';
import { useQuery } from '@tanstack/react-query';
import { getData } from '../services/httpServices';
import SpinnerComponent from '../components/SpinnerComponent/SpinnerComponent';
import Error from '../components/Error/Error';
import { AxiosError } from 'axios';
import TableComponent from '../components/TableComponent/TableComponent';
import { ToastProvider } from '@heroui/toast';

export default function IndexPage() {
	const { data, isLoading, isError, error } = useQuery({ queryKey: ['memes'], queryFn: getData });

	return (
		<DefaultLayout>
			<section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
				{isLoading ? <SpinnerComponent /> : null}
				{isError ? <Error message={(error as AxiosError)?.message} /> : null}
				{!isLoading && !isError && data ? <TableComponent data={data} /> : null}
			</section>
			<ToastProvider />
		</DefaultLayout>
	);
}
