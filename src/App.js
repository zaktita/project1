import { RouterProvider } from 'react-router-dom';
import { ContextProvider } from './Contexts/ContextProvider';
import router from './router.jsx';
import { NotificationProvider } from './Contexts/NotificationContext';
import { FetchProvider } from './Contexts/FetchContext';
function App() {
  return (
    <div className="App">
      <ContextProvider>
      <NotificationProvider>
        <FetchProvider>
      <RouterProvider router={router}/>
        </FetchProvider>
      </NotificationProvider>
      </ContextProvider>
    </div>
  );
}


export default App;
