import React from "react";

const ModalBackground = ({ children }) => {
	return (
		<div
			className="fixed inset-0 overflow-y-auto z-50"
			aria-labelledby="modal-title"
			role="dialog"
			aria-modal="true"
		>
			<div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
				<div
					className="fixed inset-0 bg-movie-gray bg-opacity-75 transition-opacity"
					aria-hidden="true"
				></div>
				<span
					className="hidden sm:inline-block sm:align-middle sm:h-screen"
					aria-hidden="true"
				>
					&#8203;
				</span>
				{children}
			</div>
		</div>
	);
};

export default ModalBackground;
