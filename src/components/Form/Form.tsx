import React, { useEffect } from 'react';
import { Button } from '@heroui/button';
import { Meme } from '../../types';
import { Input } from '@heroui/input';
import { Formik } from 'formik';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateMeme } from '../../services/httpServices';
import { addToast } from '@heroui/toast';

interface Props {
	currentMeme: Meme;
	onClose: () => void;
}

const Form: React.FC<Props> = ({ currentMeme, onClose }) => {
	const queryClient = useQueryClient();
	const { mutate, isPending, isError, error, data } = useMutation({
		mutationFn: updateMeme,
		onSuccess: (data) => {
			queryClient.setQueryData(['memes'], (oldData: Array<any>) => {
				return oldData.map((item) => {
					if (String(item.id) !== String(data.id)) {
						return item;
					} else {
						return data;
					}
				});
			});
		},
	});

	useEffect(() => {
		if (isError) {
			addToast({
				title: error.message,
				color: 'danger',
				timeout: 1000,
			});
		}

		if (data) {
			addToast({
				title: 'Success',
				color: 'success',
				timeout: 1000,
			});
		}
	}, [isError, data]);

	return (
		<>
			<Formik
				initialValues={{ title: currentMeme.title, url: currentMeme.url, likes: currentMeme.likes }}
				validate={(values) => {
					const errors: any = {};
					if (!values.title) {
						errors.title = 'Required';
					} else if (values.title.length < 3 || values.title.length > 100) {
						errors.title = 'The length cannot be less than 3 or more than 100 characters.';
					}

					if (!values.url) {
						errors.url = 'Required';
					} else if (!/^https?:\/\/[^\s]+\.jpg(?:\?.*)?$/i.test(values.url)) {
						errors.url = 'Invalid URL';
					}

					if (!values.likes) {
						errors.likes = 'Required';
					} else if (+values.likes < 0 || +values.likes > 99) {
						errors.likes = 'Incorrect likes value';
					} else if (Number.isNaN(+values.likes)) {
						errors.likes = 'There must be a number';
					}
					return errors;
				}}
				onSubmit={async (values, { setSubmitting }) => {
					await mutate({ id: String(currentMeme.id), body: values });
					onClose();
					setSubmitting(false);
				}}
			>
				{({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
					<form onSubmit={handleSubmit}>
						<div className="mb-3">
							<Input defaultValue={values.title} name="title" label="Title" type="text" onChange={handleChange} onBlur={handleBlur} />
							<p className="text-sm text-rose-600 pt-1">{errors.title && touched.title && errors.title}</p>
						</div>
						<div className="mb-3">
							<Input defaultValue={values.url} name="url" label="Url" type="text" onChange={handleChange} onBlur={handleBlur} />
							<p className="text-sm text-rose-600 pt-1">{errors.url && touched.url && errors.url}</p>
						</div>

						<div className="mb-3">
							<Input defaultValue={values.likes} name="likes" label="Likes" type="text" onChange={handleChange} onBlur={handleBlur} />
							<p className="text-sm text-rose-600 pt-1">{errors.likes && touched.likes && errors.likes}</p>
						</div>

						<Button color="primary" type="submit" disabled={isSubmitting || isPending}>
							Submit
						</Button>
					</form>
				)}
			</Formik>
		</>
	);
};

export default Form;
