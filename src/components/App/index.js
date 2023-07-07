import { BrowserRouter, useNavigate } from 'react-router-dom';

import AppRoutes from '../AppRoutes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
