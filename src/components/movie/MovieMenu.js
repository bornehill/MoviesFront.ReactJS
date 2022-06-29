import React, { useState } from "react";

import { IconContext } from "react-icons";
import { HiDotsVertical } from "react-icons/hi";

const MovieMenu = ({ show, onDelete, onEdit }) => {
	const [showOptions, setShowOptions] = useState(false);

	return (
		<>
			{show && (
				<>
					{!showOptions && (
						<div className="flex flex-row-reverse pr-5">
							<IconContext.Provider
								value={{
									className: "mt-5 text-2xl absolute rounded-full bg-black",
								}}
							>
								<HiDotsVertical onClick={() => setShowOptions(true)} />
							</IconContext.Provider>
						</div>
					)}
					{showOptions && (
						<div className="flex flex-row-reverse pr-5">
							<table className="w-40 absolute mt-5 bg-movie-onyx">
								<thead>
									<tr onClick={() => setShowOptions(false)}>
										<th className="text-right font-light pr-2">X</th>
									</tr>
								</thead>
								<tbody>
									<tr className="hover:bg-movie-red" onClick={onEdit}>
										<td className="pl-2">Edit</td>
									</tr>
									<tr className="hover:bg-movie-red" onClick={onDelete}>
										<td className="pl-2">Delete</td>
									</tr>
								</tbody>
							</table>
						</div>
					)}
				</>
			)}
		</>
	);
};

export default MovieMenu;
