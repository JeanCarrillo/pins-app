import React, { useContext, useState } from "react";
import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonTitle,
  IonToast,
  IonToolbar,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import authAPI from "../services/authAPI";
import AuthContext from "../contexts/AuthContext";

const LoginPage: React.FC = () => {
  const history = useHistory();
  const { setIsLogged } = useContext(AuthContext);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<{
    message: string;
    showErrorToast: boolean;
  }>({ message: "", showErrorToast: false });

  const handleRegister = () => {
    history.push("/register");
  };

  const handleLogin = async () => {
    try {
      await authAPI.login(username, password);
      setIsLogged(true);
      history.replace("/map");
    } catch (error) {
      setError({ showErrorToast: true, message: "Invalid credentials" });
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="light">
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonItem>
          <IonLabel position="floating">Username</IonLabel>
          <IonInput
            type="text"
            onIonChange={(e) => {
              setUsername(e.detail.value!);
            }}
            name="username"
            value={username}
          />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Password</IonLabel>
          <IonInput
            type="password"
            onIonChange={(e) => {
              setPassword(e.detail.value!);
            }}
            name="password"
            value={password}
          />
        </IonItem>
        <div style={{ padding: 10, paddingTop: 20 }}>
          <IonButton expand="full" style={{ margin: 14 }} onClick={handleLogin}>
            Login
          </IonButton>
          <IonButton
            expand="full"
            style={{ margin: 14 }}
            onClick={handleRegister}
          >
            Create Account
          </IonButton>
        </div>
        <IonToast
          color="danger"
          isOpen={error.showErrorToast}
          onDidDismiss={() => setError({ showErrorToast: false, message: "" })}
          message={error.message}
          duration={2000}
        />
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
