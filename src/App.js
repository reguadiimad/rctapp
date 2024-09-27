import PersonsList from "./Components/PersonsList";
import SideMenu from "./Components/SIdeMenu";
import './style.scss'
import './index'
import 'font-awesome/css/font-awesome.min.css';

function App() {
  
  return (
    <div className="w-screen h-screen flex items-center justify-center p-10 overflow-visible">
      <SideMenu/>
      <PersonsList/>
    </div>

  );
}

export default App;
