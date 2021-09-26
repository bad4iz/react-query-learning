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
import { Todos } from './Todos';
import { Todo } from './Todo';

import './mocks';

// Create a client
export const queryClient = new QueryClient();

function App() {
  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <div className="App">
          <Switch>
            <Route path={'/todo/:id'}>
              <Todo />
            </Route>
            <Route path={'/'} exact>
              <Todos />
            </Route>
          </Switch>
        </div>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </Router>
  );
}

export default App;
