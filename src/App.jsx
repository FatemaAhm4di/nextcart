import AppRoutes from "./routes/AppRoutes";
import Navbar from "./components/layout/Navbar";

function App() {
  return (
    <div className="min-h-screen bg-background text-text">
      <Navbar />
      <AppRoutes />
    </div>
  );
}

export default App;