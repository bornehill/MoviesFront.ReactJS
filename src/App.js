import "./App.css";
import Header from "./components/common/Header";
import MoviesView from "./components/movie/MoviesView";

function App() {
	return (
		<div className="h-screen mx-auto max-w-screen-xl">
			<Header />
			<MoviesView />
		</div>
	);
}

export default App;
