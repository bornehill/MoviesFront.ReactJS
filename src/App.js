import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ErrorBoundary from "./components/common/ErrorBoundary";
import Home from "./components/home/Home";
import NotFound from "./components/common/NotFound";
import { MovieProvider } from "./providers/Movie.provider";
import { Provider } from "react-redux";
import store from "./store/configureStore";

function App() {
	return (
		<BrowserRouter>
			<Provider store={store}>
				<div className="h-screen mx-auto max-w-screen-xl">
					<MovieProvider>
						<ErrorBoundary>
							<Routes>
								<Route path="/search/:searchQuery" element={<Home />} />
								<Route path="/search" element={<Home />} />
								<Route
									path="/"
									exact={true}
									element={<Navigate to={{ pathname: "/search" }} />}
								/>
								<Route path="*" element={<NotFound />} />
							</Routes>
						</ErrorBoundary>
					</MovieProvider>
				</div>
			</Provider>
		</BrowserRouter>
	);
}

export default App;
