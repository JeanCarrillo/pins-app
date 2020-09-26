import React from "react";
import {
  IonButton,
  IonContent,
  IonHeader,
  IonImg,
  IonModal,
  IonTitle,
} from "@ionic/react";
import { Pin } from "../types/interfaces";
import { ASSETS_URL } from "../config/api";

interface PinDetailsProps {
  pin: Pin;
  setSelectedPin: Function;
}

const PinDetailsModal = ({ pin, setSelectedPin }: PinDetailsProps) => {
  return (
    <IonModal isOpen={true} onDidDismiss={() => setSelectedPin(null)}>
      <IonHeader>
        <IonTitle>{pin.title}</IonTitle>
      </IonHeader>
      <IonContent className="ion-padding ion-text-center ion-justify-content-center">
        <p>Description : {pin.description}</p>
        <IonImg
          src={ASSETS_URL + pin.img.publicUrl}
          style={{ width: 200, height: "auto" }}
        />
        <p>Starts at : {pin.startDate}</p>
        <p>Ends at : {pin.endDate}</p>
        <p>Now : {new Date().toUTCString()}</p>
        <IonButton onClick={() => setSelectedPin(false)}>Close</IonButton>
      </IonContent>
    </IonModal>
  );
};

export default PinDetailsModal;
