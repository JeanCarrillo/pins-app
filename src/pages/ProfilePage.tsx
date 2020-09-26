import React, { useContext } from "react";
import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonSpinner,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import useSWR from "swr";
import AuthContext from "../contexts/AuthContext";
import UserDetails from "../components/UserDetails";
import { exit } from "ionicons/icons";
import authAPI from "../services/authAPI";

const ProfilePage: React.FC = () => {
  const { userId, setIsLogged } = useContext(AuthContext);
  const { data: user } = useSWR("/users/" + userId);

  const handleLogout = () => {
    authAPI.logout();
    setIsLogged(false);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Profile</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding ion-text-center">
        <IonButton
          color="danger"
          onClick={handleLogout}
          style={{ position: "absolute", top: 80, right: 10 }}
        >
          <IonIcon slot="icon-only" icon={exit} />
        </IonButton>
        {user ? <UserDetails user={user} /> : <IonSpinner />}
      </IonContent>
    </IonPage>
  );
};

export default ProfilePage;
