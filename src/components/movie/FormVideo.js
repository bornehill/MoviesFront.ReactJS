import React, { useState } from "react";

import InputControl from "../form-controls/InputControl";
import TextAreaControl from "../form-controls/TextAreaControl";
import MultiSelectControl from "../form-controls/MultiSelectControl";
import ModalBackground from "../common/ModalBackground";
//import { movieEmpty } from "../types/common";

import { IconContext } from "react-icons";
import { AiOutlineClose } from "react-icons/ai";

const FormVideo = ({ movie, onCancel, onEdit }) => {
	const [title, setTitle] = useState(movie.id ? "EDIT" : "ADD");
	const [update, setUpdate] = useState({ ...movie });

	const handleChange = (e) => {
		const newMovie = { ...update };
		newMovie[e.target.name] = e.target.value;

		setUpdate({ ...newMovie });
	};

	const handleReset = () => {
		setUpdate(movie);
	};

	const handleEdit = () => {
		onEdit(update);
	};

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
				<div className="grid grid-cols-2 gap-4">
					<InputControl
						name="title"
						label="TITLE"
						value={update["title"]}
						onChange={handleChange}
					/>
					<InputControl
						name="release_date"
						label="RELEASE DATE"
						value={update["release_date"]}
						type="date"
						onChange={handleChange}
					/>
				</div>
				<div className="grid grid-cols-2 gap-4">
					<InputControl
						name="poster_path"
						label="MOVIE URL"
						value={update["poster_path"]}
						type="url"
						onChange={handleChange}
					/>
					<InputControl
						name="vote_average"
						label="RATING"
						value={update["vote_average"]}
						type="number"
						onChange={handleChange}
					/>
				</div>
				<div className="grid grid-cols-2 gap-4">
					<MultiSelectControl
						name="genres"
						label="GENRE"
						placeHolder="Select Genre"
						origin={update["genres"]}
						onChange={handleChange}
					/>
					<InputControl
						name="runtime"
						label="RUNTIME"
						value={update["runtime"]}
						type="number"
						onChange={handleChange}
					/>
				</div>
				<div className="grid">
					<TextAreaControl
						name="overview"
						label="OVERVIEW"
						value={update["overview"]}
						row="5"
						onChange={handleChange}
					/>
				</div>
				<div className="flex flex-row-reverse mt-2">
					<button
						id="btnSubmit"
						className="text-white bg-movie-red md:w-1/4 p-1 md:py-2 rounded ml-1"
						onClick={handleEdit}
					>
						SUBMIT
					</button>
					<button
						id="btnReset"
						className="text-movie-red border border-movie-red md:w-1/4 p-1 md:py-2 rounded"
						onClick={handleReset}
					>
						RESET
					</button>
				</div>
			</div>
		</ModalBackground>
	);
};

export default FormVideo;
