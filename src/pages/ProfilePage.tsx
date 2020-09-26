import React, { useContext } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonSpinner,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import useSWR from "swr";
import AuthContext from "../contexts/AuthContext";
import UserDetails from "../components/UserDetails";

const ProfilePage: React.FC = () => {
  const { userId } = useContext(AuthContext);
  const { data: user } = useSWR("/users/" + userId);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Profile</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding ion-text-center">
        {user ? <UserDetails user={user} /> : <IonSpinner />}
      </IonContent>
    </IonPage>
  );
};

export default ProfilePage;
