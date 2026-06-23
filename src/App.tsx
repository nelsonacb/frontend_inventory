import { RouterProvider } from 'react-router';
import { ToastContainer } from 'react-toastify';
import { router } from './routes';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <ToastContainer
        position='top-right'
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
      />
      <RouterProvider router={router} />;
    </>
  );
}

export default App;
