import Films from './Films';
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query';

import { ReactQueryDevtools } from 'react-query/devtools';

import './App.css';

// Create a client
export const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Films />
      </div>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
