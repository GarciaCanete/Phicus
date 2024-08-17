import { BrowserRouter } from 'react-router-dom';
import { RoutesApp } from './routes/RoutesApp';
import './app.css';
const App = () => {
	return (
		<>
			<BrowserRouter>
				<RoutesApp />
			</BrowserRouter>
		</>
	);
};

export default App;
