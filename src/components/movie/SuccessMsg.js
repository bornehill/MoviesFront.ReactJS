import React from "react";

import ModalBackground from "../common/ModalBackground";

import { IconContext } from "react-icons";
import { FaCheckCircle } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";

const SuccessMsg = ({ title, subTitle, onCancel }) => {
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
				<div className="text-center">
					<div className="grid place-items-center">
						<IconContext.Provider
							value={{
								className: "text-movie-red",
								size: "42px",
							}}
						>
							<FaCheckCircle />
						</IconContext.Provider>
					</div>
					<div className="text-3xl font-light my-3">{title}</div>
					<div>{subTitle}</div>
				</div>
			</div>
		</ModalBackground>
	);
};

export default SuccessMsg;
