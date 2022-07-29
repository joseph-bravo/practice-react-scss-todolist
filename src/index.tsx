import ReactDOM from 'react-dom/client';
import { App } from './App';
import './styles/app.scss';

const app = document.querySelector('#app');
const root = ReactDOM.createRoot(app);
root.render(<App />);
