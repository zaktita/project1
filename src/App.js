import { RouterProvider } from 'react-router-dom';
import { ContextProvider } from './Contexts/ContextProvider';
import router from './router.jsx';
function App() {
  return (
    <div className="App">
      <ContextProvider>
      <RouterProvider router={router}/>
      </ContextProvider>
    </div>
  );
}


export default App;
