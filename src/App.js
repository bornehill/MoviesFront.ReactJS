import "./App.css";
import ErrorBoundary from "./components/common/ErrorBoundary";
import Home from "./components/home/Home";
import { MovieProvider } from "./providers/Movie.provider";

function App() {
	return (
		<div className="h-screen mx-auto max-w-screen-xl">
			<MovieProvider>
				<ErrorBoundary>
					<Home />
				</ErrorBoundary>
			</MovieProvider>
		</div>
	);
}

export default App;
