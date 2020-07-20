import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import App from "./routes/App";
import firebaseConfig from "./firebase/index";
import { FirebaseAppProvider } from 'reactfire';
import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.render(
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <Suspense fallback={<h3>Loading...</h3>}>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </Suspense>
    </FirebaseAppProvider>,
    document.getElementById('root')
  );
