import { BrowserRouter } from 'react-router-dom';

import AppRoutes from '../AppRoutes';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
