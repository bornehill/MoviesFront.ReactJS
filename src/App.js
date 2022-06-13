import "./App.css";
import Header from "./components/common/Header";
import MoviesView from "./components/movie/MoviesView";
import ErrorBoundary from "./components/common/ErrorBoundary";

function App() {
	return (
		<div className="h-screen mx-auto max-w-screen-xl">
			<ErrorBoundary>
				<Header />
				<MoviesView />
			</ErrorBoundary>
		</div>
	);
}

export default App;
