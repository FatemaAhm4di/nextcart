import AppRoutes from "./routes/AppRoutes";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import SettingsPanel from './components/settings/SettingsPanel'


function App() {
  return (
    <div className="min-h-screen flex flex-col bg-[#D5E7B5] dark:bg-[#1a1a2e]">
      <Navbar />
      <main className="flex-1">
        <AppRoutes />
      </main>
      <Footer />
      <SettingsPanel />
    </div>
    
  );
}

export default App;