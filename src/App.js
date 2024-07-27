import logo from "./logo.svg";
import "./App.css";
import Navbar from "./Component/Navbar";
import { MainRoute } from "./Routes/MainRoute";
import { Footer } from "./Component/Footer";

function App() {
  return (
    <div className="App bg-white">
      <Navbar />
      <MainRoute />
      <Footer />
    </div>
  );
}

export default App;
