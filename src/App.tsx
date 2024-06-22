import ChatbotFlow from "./components/ChatbotFlow"
import Navbar from "./components/Navbar"
import NodePanel from "./components/NodePanel"

const App = () => {
  return (
    <div>
      <Navbar />
      <div className={`w-full h-[calc(100vh-48px)] flex`}>
        <ChatbotFlow />
        <NodePanel />
      </div>
    </div>
  )
}

export default App