import { Provider } from 'react-redux';
import store from './redux/store';
import Main from './Main';
const error = console.error;
console.error = (...args) => {
	if (/defaultProps/.test(args[0])) return;
	error(...args);
};
export default function App() {
	return (
		<Provider store={store}>
			<Main />
		</Provider>
	);
}

