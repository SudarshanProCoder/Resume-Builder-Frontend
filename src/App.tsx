import { SnackbarProvider } from './components/Snackbar/SnackbarProvider';
import { AppRoutes } from './routes/AppRoutes';

function App() {
  return (
    <div className="App">
      <SnackbarProvider>
        <AppRoutes />
      </SnackbarProvider>
    </div>
  );
}

export default App;
