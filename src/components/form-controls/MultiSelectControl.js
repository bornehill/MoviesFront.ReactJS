import React, { useState, useEffect } from "react";

import { IconContext } from "react-icons";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";

import { mapEnumToDropdown, mapEnumToObject } from "../common/mapEnum";
import { Genres } from "../types/common";

const MultiSelectControl = ({ name, label, placeHolder, origin, onChange }) => {
	const initialize = () => {
		const mapped = mapEnumToObject(Genres);

		origin.forEach((o) => {
			mapped[o] = !mapped[o];
		});

		return mapped;
	};

	useEffect(() => {
		setData(initialize);
	}, [origin]);

	const [open, setOpen] = useState(false);
	const [data, setData] = useState(initialize);

	const handleChange = (e) => {
		const newData = { ...data };
		newData[e.target.name] = !data[e.target.name];

		setData({ ...newData });

		const selected = Object.keys(newData)
			.map((a) => {
				if (newData[a]) return a;
			})
			.filter((g) => g);

		onChange({ target: { value: selected, name } });
	};

	return (
		<div className={"input-control"}>
			<label htmlFor={name}>{label}</label>
			<div id={name}>
				<div
					className="bg-movie-gray h-12 p-3 flex justify-between"
					onClick={() => setOpen(!open)}
				>
					<span>{placeHolder}</span>
					<IconContext.Provider
						value={{
							className: "text-movie-red text-2xl",
						}}
					>
						{!open && <IoMdArrowDropdown />}
						{open && <IoMdArrowDropup />}
					</IconContext.Provider>
				</div>
				{open && (
					<div className="bg-movie-gray pl-3 pb-3">
						{mapEnumToDropdown(Genres).map((g) => (
							<div key={g.value}>
								<input
									className="checkbox-movie"
									type="checkbox"
									name={g.value}
									defaultChecked={data[g.value]}
									onChange={handleChange}
								/>
								{g.text}
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default MultiSelectControl;
