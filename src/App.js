import Films from './Films';
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query';

import { ReactQueryDevtools } from 'react-query/devtools';

import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import FilmPage from './FilmPage';

// Create a client
export const queryClient = new QueryClient();

function App() {
  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <div className="App">
          <Switch>
            <Route path={'/:filmId'}>
              <FilmPage />
            </Route>
            <Route path={'/'}>
              <Films />
            </Route>
          </Switch>
        </div>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </Router>
  );
}

export default App;
