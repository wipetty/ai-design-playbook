import { IMSProvider } from "./contexts/IMSProvider";
import { Provider } from "@react-spectrum/s2";

function App() {
  return (
    <Provider>
      <IMSProvider>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            width: "100vw",
          }}
        >
          <div>
            Your app is now running. Describe the kind of application you want
            to make piece by piece to the agent.
          </div>
        </div>
      </IMSProvider>
    </Provider>
  );
}

export default App;
