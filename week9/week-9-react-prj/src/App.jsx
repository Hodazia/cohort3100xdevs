import { useState } from "react";


function App(){
  return <div>
    <h1>Welcome to reactjs</h1>
    <Postcomponent />
    <Togglemessage />
    <Togglemessage />
    <Togglemessage />
    </div>
}

const style = {width:200, backgroundColor:"red", }
function Postcomponent(){
  return <div style = { style }>
    This is a new component
    </div>
}

const Togglemessage = () => {
  const [isVisible, setIsVisible] = useState(true);  // defining a new state variable

  function toggle(){
    setIsVisible(!isVisible);  // the setIsVisible()  updates the state variable
  }
  return (
  <div>
            <button onClick={toggle}>
              Toggle the button
            </button>
            {isVisible && <p>This message is conditionally rendered!</p>}
  </div>)

}


export default App;

// variable hosting, Symbols, 