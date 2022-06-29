import React from "react";

import ModalBackground from "../common/ModalBackground";

import { IconContext } from "react-icons";
import { AiOutlineClose } from "react-icons/ai";

const DeleteMovie = ({ onCancel, onConfirm }) => {
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
				<h2 className="text-2xl font-light">DELETE MOVIE</h2>
				<p className="text-sm my-3">
					Are you sure you want to delete this movie?
				</p>
				<div className="text-right">
					<button
						className="bg-movie-red p-1 md:w-1/4 md:py-2 rounded"
						onClick={onConfirm}
					>
						CONFIRM
					</button>
				</div>
			</div>
		</ModalBackground>
	);
};

export default DeleteMovie;
