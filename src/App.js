import React, { StrictMode } from 'react';
import './FontAwsomeIcons';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import AppRouter from './routers/AppRouter';
import Preloader from './components/ui/Preloader';
//import { signUp } from './redux/actions/authActions';

const App = ({ store, persistor }) => (	
	<StrictMode>
		<Provider store={store}>
			<PersistGate loading={<Preloader/>} persistor={persistor}>
				<div>          								
					<AppRouter/>
        		</div>
			</PersistGate>
		</Provider>
	</StrictMode>
);

export default App;
