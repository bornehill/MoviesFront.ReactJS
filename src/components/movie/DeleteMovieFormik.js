import React from "react";
import { useFormik } from "formik";

import ModalBackground from "../common/ModalBackground";

import { IconContext } from "react-icons";
import { AiOutlineClose } from "react-icons/ai";

const DeleteMovieFormik = ({ onCancel, onConfirm }) => {
	const formik = useFormik({
		initialValues: {},
		onSubmit: () => {
			onConfirm();
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
				<form onSubmit={formik.handleSubmit}>
					<h2 className="text-2xl font-light">DELETE MOVIE</h2>
					<p className="text-sm my-3">
						Are you sure you want to delete this movie?
					</p>
					<div className="text-right">
						<button
							id="btnSubmit"
							type="submit"
							className="bg-movie-red p-1 md:w-1/4 md:py-2 rounded"
						>
							CONFIRM
						</button>
					</div>
				</form>
			</div>
		</ModalBackground>
	);
};

export default DeleteMovieFormik;
