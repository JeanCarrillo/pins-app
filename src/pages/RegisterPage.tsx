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

interface RegisterProps {
  setRegister: Function;
}

const RegisterPage = ({ setRegister }: RegisterProps) => {
  const history = useHistory();
  const { setIsLogged } = useContext(AuthContext);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<{
    message: string;
    showErrorToast: boolean;
  }>({ message: "", showErrorToast: false });

  const handleRegister = async () => {
    try {
      await authAPI.register(username, password);
      await authAPI.login(username, password);
      setIsLogged(true);
      history.replace("/map");
    } catch (error) {
      setError({ showErrorToast: true, message: "Invalid request" });
    }
  };

  const goBackToLogin = () => {
    setRegister(false);
    history.replace("/login");
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="light">
          <IonTitle>Register</IonTitle>
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
          <IonButton
            expand="full"
            style={{ margin: 14 }}
            onClick={handleRegister}
          >
            Create Account
          </IonButton>
          <IonButton
            expand="full"
            style={{ margin: 14 }}
            onClick={goBackToLogin}
          >
            Back to login
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

export default RegisterPage;
