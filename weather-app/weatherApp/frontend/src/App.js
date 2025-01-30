import './App.css';
import Card from './components/Card';
import Sidebar from './components/Sidebar';
function App() {
  return (
    <div className="App flex justify-start items-start">
      <Sidebar />
      <Card />
    </div>
  );
}

export default App;
