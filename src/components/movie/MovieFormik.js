import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import InputControl from "../form-controls/InputControl";
import ModalBackground from "../common/ModalBackground";
import TextAreaControl from "../form-controls/TextAreaControl";
import MultiSelectControl from "../form-controls/MultiSelectControl";

import { IconContext } from "react-icons";
import { AiOutlineClose } from "react-icons/ai";

const MovieFormik = ({ movie, onCancel, onEdit }) => {
	const title = movie.id ? "EDIT" : "ADD";

	const formik = useFormik({
		initialValues: {
			title: movie.title ?? "",
			release_date: movie.release_date ?? "",
			poster_path: movie.poster_path ?? "",
			vote_average: movie.vote_average ?? "",
			genres: movie.genres ?? [],
			runtime: movie.runtime ?? 0,
			overview: movie.overview ?? 0,
		},
		validationSchema: Yup.object({
			title: Yup.string().required("Required"),
			poster_path: Yup.string().url().required("Requiered"),
			vote_average: Yup.number().min(0).max(100).required("Required"),
			genres: Yup.array().of(Yup.string().required("Required")),
			runtime: Yup.number().integer().min(0).required("Required"),
			overview: Yup.string().required("Required"),
		}),
		onSubmit: (values) => {
			onEdit({ ...movie, ...values });
		},
	});

	return (
		<ModalBackground>
			<div className="inline-block text-white text-left bg-movie-black overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full px-10 py-5">
				<div className="grid justify-end">
					<IconContext.Provider
						value={{
							className: "text-2xl",
						}}
					>
						<AiOutlineClose onClick={onCancel} />
					</IconContext.Provider>
				</div>
				<h2 className="text-2xl font-light">{title} MOVIE</h2>
				<form onSubmit={formik.handleSubmit}>
					<div className="grid grid-cols-2 gap-4">
						<div>
							<InputControl
								name="title"
								label="TITLE"
								value={formik.values.title}
								onChange={formik.handleChange}
							/>
							{formik.touched.title && formik.errors.title ? (
								<div className="text-movie-red font-thin">
									{formik.errors.title}
								</div>
							) : null}
						</div>
						<InputControl
							name="release_date"
							label="RELEASE DATE"
							value={formik.values.release_date}
							type="date"
							onChange={formik.handleChange}
						/>
					</div>
					<div className="grid grid-cols-2 gap-4">
						<div>
							<InputControl
								name="poster_path"
								label="MOVIE URL"
								value={formik.values.poster_path}
								type="url"
								onChange={formik.handleChange}
							/>
							{formik.touched.poster_path && formik.errors.poster_path ? (
								<div className="text-movie-red font-thin">
									{formik.errors.poster_path}
								</div>
							) : null}
						</div>
						<div>
							<InputControl
								name="vote_average"
								label="RATING"
								value={formik.values.vote_average}
								type="number"
								onChange={formik.handleChange}
							/>
							{formik.touched.vote_average && formik.errors.vote_average ? (
								<div className="text-movie-red font-thin">
									{formik.errors.vote_average}
								</div>
							) : null}
						</div>
					</div>
					<div className="grid grid-cols-2 gap-4">
						<div>
							<MultiSelectControl
								name="genres"
								label="GENRES"
								placeHolder="Select Genre"
								origin={formik.values.genres}
								onChange={formik.handleChange}
							/>
							{formik.touched.genres && formik.errors.genres ? (
								<div className="text-movie-red font-thin">
									{formik.errors.genres}
								</div>
							) : null}
						</div>
						<div>
							<InputControl
								name="runtime"
								label="RUNTIME"
								value={formik.values.runtime}
								type="number"
								onChange={formik.handleChange}
							/>
							{formik.touched.runtime && formik.errors.runtime ? (
								<div className="text-movie-red font-thin">
									{formik.errors.runtime}
								</div>
							) : null}
						</div>
					</div>
					<div className="grid">
						<TextAreaControl
							name="overview"
							label="OVERVIEW"
							value={formik.values.overview}
							row="5"
							onChange={formik.handleChange}
						/>
						{formik.touched.overview && formik.errors.overview ? (
							<div className="text-movie-red font-thin">
								{formik.errors.overview}
							</div>
						) : null}
					</div>
					<div className="flex flex-row-reverse mt-2">
						<button
							id="btnSubmit"
							type="submit"
							className="text-white bg-movie-red md:w-1/4 p-1 md:py-2 rounded ml-1"
						>
							SUBMIT
						</button>
						<button
							id="btnReset"
							className="text-movie-red border border-movie-red md:w-1/4 p-1 md:py-2 rounded"
							type="reset"
							onClick={() => formik.resetForm({ values: { ...movie } })}
						>
							RESET
						</button>
					</div>
				</form>
			</div>
		</ModalBackground>
	);
};

export default MovieFormik;
