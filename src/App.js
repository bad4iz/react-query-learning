import {
  QueryClient,
  QueryClientProvider,
} from 'react-query';

import { ReactQueryDevtools } from 'react-query/devtools';

import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { Todos } from './Todos';

// Create a client
export const queryClient = new QueryClient();

function App() {
  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <div className="App">
          <Todos />
        </div>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </Router>
  );
}

export default App;
