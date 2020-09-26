import React, { useContext, useState } from "react";
import {
  IonButton,
  IonContent,
  IonDatetime,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonTextarea,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { close, checkmark } from "ionicons/icons";
import { LatLng, Pin, PinFormData } from "../types/interfaces";
import PinsAPI from "../services/pinsAPI";
import useSWR from "swr";
import AuthContext from "../contexts/AuthContext";

interface ModalProps {
  setShowModal: Function;
  latLng: LatLng | undefined;
  showModal: boolean;
}

const durations: number[] = [];
for (let i = 1; i <= 24; i++) durations.push(i);

const now = () => new Date().toISOString();

const initialFormData = (): PinFormData => ({
  startDate: now(),
  duration: durations[0],
  title: "",
  description: "",
  img: null,
  lat: undefined,
  lng: undefined,
});

const NewPinModal = ({ showModal, setShowModal, latLng }: ModalProps) => {
  const { userId } = useContext(AuthContext);
  const { data: user, revalidate: revalidateUser } = useSWR("/users/" + userId);
  const { mutate: mutatePins } = useSWR("/pins");

  const [formData, setFormData] = useState<PinFormData>(initialFormData());
  const { startDate, duration, title, description, img } = formData;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const createdPin = await PinsAPI.create({
        title,
        description,
        img,
        lat: latLng?.lat,
        lng: latLng?.lng,
        startDate,
        duration,
      });
      mutatePins(async (pins: Pin[]) => [...pins, createdPin.data], false);
      revalidateUser();
      closeModal();
    } catch (error) {
      console.log(error);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setFormData(initialFormData());
  };

  const handleChange = (name: string, value: string | number | File) =>
    setFormData((d) => ({ ...d, [name]: value }));

  const inputDisabled = !user || user.points < 1;

  return (
    <IonModal isOpen={showModal} onDidDismiss={closeModal}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Create event</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <form onSubmit={onSubmit}>
          <IonList className="ion-justify-content-around">
            <IonItem className="ion-margin-bottom">
              <IonLabel position="stacked">Title</IonLabel>
              <IonInput
                value={title}
                placeholder="Enter title here"
                onIonChange={(e) => handleChange("title", e.detail.value!)}
                clearInput
                required
                disabled={inputDisabled}
              />
            </IonItem>
            <IonItem className="ion-margin-bottom">
              <IonLabel position="stacked">Description</IonLabel>
              <IonTextarea
                value={description}
                placeholder="Enter event description here"
                onIonChange={(e) =>
                  handleChange("description", e.detail.value!)
                }
                required
                disabled={inputDisabled}
              />
            </IonItem>
            <IonItem className="ion-margin-bottom">
              <IonLabel position="stacked">Start date</IonLabel>
              <IonDatetime
                value={startDate}
                onIonChange={(e) => handleChange("startDate", e.detail.value!)}
                displayFormat="D MMM YYYY H:mm"
                min={now()}
                max="2030"
                aria-required
                disabled={inputDisabled}
              />
            </IonItem>
            <IonItem className="ion-margin-bottom">
              <IonLabel position="stacked">Duration</IonLabel>
              <IonSelect
                value={duration}
                placeholder="Select One"
                onIonChange={(e) => handleChange("duration", e.detail.value)}
                aria-required
                disabled={inputDisabled}
              >
                {durations
                  .filter((num) => (!user ? true : num <= user.points))
                  .map((num, i) => (
                    <IonSelectOption key={`Duration-${i}`} value={num}>
                      {num} hour{num > 1 && "s"} : {num} point{num > 1 && "s"}
                    </IonSelectOption>
                  ))}
              </IonSelect>
              {user && (
                <p>
                  {user.points < 1
                    ? "You can't create an event without points, you can buy some on your profile page."
                    : `You currently have : ${user.points} point${
                        user.points > 1 ? "s" : ""
                      }`}
                </p>
              )}
            </IonItem>
            <IonItem className="ion-margin-bottom">
              <IonLabel position="stacked">Image</IonLabel>
              <input
                type="file"
                accept="image/png, image/jpeg"
                onChange={(e: React.ChangeEvent<any>) =>
                  handleChange("fileData", e.target.files[0])
                }
                required
                disabled={inputDisabled}
              />
            </IonItem>
          </IonList>
          <IonRow className="ion-justify-content-around ion-margin-top ion-margin-bottom">
            <IonButton color="danger" onClick={closeModal}>
              <IonIcon slot="icon-only" icon={close} />
            </IonButton>
            <IonButton type="submit" disabled={inputDisabled}>
              <IonIcon slot="icon-only" icon={checkmark} />
            </IonButton>
          </IonRow>
        </form>
      </IonContent>
    </IonModal>
  );
};

export default NewPinModal;
