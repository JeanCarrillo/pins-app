import React, { useState } from "react";
import { Route } from "react-router-dom";
import { IonApp } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { SWRConfig } from "swr";
import { fetcher } from "./config/swr";
import AuthAPI from "./services/authAPI";
import AuthContext from "./contexts/AuthContext";
import LoginPage from "./pages/LoginPage";
import MainTabs from "./components/MainTabs";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

AuthAPI.init();

const App: React.FC = () => {
  const [isLogged, setIsLogged] = useState(AuthAPI.isLogged());

  const authContextValue = {
    isLogged,
    setIsLogged,
    userId: AuthAPI.getUserId(),
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      <SWRConfig value={{ fetcher }}>
        <IonApp>
          <IonReactRouter>
            <Route path="/login" component={LoginPage} exact={true} />
            <Route path="/" component={isLogged ? MainTabs : LoginPage} />
          </IonReactRouter>
        </IonApp>
      </SWRConfig>
    </AuthContext.Provider>
  );
};

export default App;
