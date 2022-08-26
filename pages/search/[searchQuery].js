import React from "react";
import ErrorBoundary from "../../src/components/common/ErrorBoundary";
import HomeNext from "../../src/components/home/HomeNext";
import { MovieProvider } from "../../src/providers/Movie.provider";
import { Provider } from "react-redux";
import store from "../../src/store/configureStore";

function SearchPage() {
	return (
		<Provider store={store}>
			<div className="h-screen mx-auto max-w-screen-xl bg-movie-onyx">
				<MovieProvider>
					<ErrorBoundary>
						<HomeNext />
					</ErrorBoundary>
				</MovieProvider>
			</div>
		</Provider>
	);
}

export default SearchPage;
