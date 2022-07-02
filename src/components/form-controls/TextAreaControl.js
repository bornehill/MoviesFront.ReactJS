import React from "react";

const TextAreaControl = ({ name, label, error, ...rest }) => {
	const hasError = error ? " has-error" : "";
	return (
		<div className={"input-control" + hasError}>
			<label htmlFor={name}>{label}</label>
			<textarea
				className="bg-movie-gray h-32"
				name={name}
				id={name}
				{...rest}
			/>
			{error && <p className="text-sm text-red-700">{error}</p>}
		</div>
	);
};

export default TextAreaControl;
