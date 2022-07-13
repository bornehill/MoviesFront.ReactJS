import React from "react";

const Filter = ({ sortBy, onSort, onFilter }) => {
	return (
		<div className="flex justify-between bg-movie-gray mt-5">
			<nav className="cursor-pointer px-5 pt-2">
				<ul className="flex text-white gap-5">
					<li onClick={() => onFilter("")}>ALL</li>
					<li onClick={() => onFilter("documentary")}>DOCUMENTARY</li>
					<li onClick={() => onFilter("comedy")}>COMEDY</li>
					<li onClick={() => onFilter("horror")}>HORROR</li>
					<li onClick={() => onFilter("crime")}>CRIME</li>
				</ul>
			</nav>
			<div className="pr-5 pt-2">
				<span className="text-movie-onyx mr-3">SORT BY</span>
				<select
					className="bg-movie-gray text-white"
					value={sortBy}
					onChange={(e) => onSort(e.target.value)}
				>
					<option value="release_date">RELEASE DATE</option>
					<option value="genres">GENRE</option>
					<option value="vote_average">RATING</option>
				</select>
			</div>
		</div>
	);
};

export default Filter;
