import "./App.css";
import ErrorBoundary from "./components/common/ErrorBoundary";
import Home from "./components/home/Home";
import { MovieProvider } from "./providers/Movie.provider";
import { Provider } from "react-redux";
import store from "./store/configureStore";

function App() {
	return (
		<Provider store={store}>
			<div className="h-screen mx-auto max-w-screen-xl">
				<MovieProvider>
					<ErrorBoundary>
						<Home />
					</ErrorBoundary>
				</MovieProvider>
			</div>
		</Provider>
	);
}

export default App;
