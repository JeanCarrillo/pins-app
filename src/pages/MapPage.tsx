import React, { useState } from "react";
import {
  IonContent,
  IonFab,
  IonFabButton,
  IonIcon,
  IonPage,
} from "@ionic/react";
import { add, close } from "ionicons/icons";
import ReactMapboxGl, { Marker } from "react-mapbox-gl";
import mapboxgl from "mapbox-gl";
import "./MapPage.css";
import { LatLng, Pin } from "../types/interfaces";
import NewPinModal from "../components/NewPinModal";
import useSWR from "swr";
import PinDetailsModal from "../components/PinDetailsModal";
import { ASSETS_URL } from "../config/api";

const Map = ReactMapboxGl({
  accessToken: process.env.REACT_APP_MAPBOX_TOKEN || "",
});

const MapPage: React.FC = () => {
  const { data: pins } = useSWR("/pins");

  const [addingPin, setAddingPin] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedPin, setSelectedpin] = useState<Pin | null>(null);
  const [newPinLatLng, setNewPinLatLng] = useState<LatLng>();

  const handleMapClick = (map: mapboxgl.Map, e: any) => {
    if (!addingPin) return;
    setNewPinLatLng(e.lngLat);
    setShowModal(true);
  };

  const handleAddPinClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setNewPinLatLng(undefined);
    setAddingPin((s) => !s);
  };

  const onStyleLoad = (map: mapboxgl.Map) => map.resize();

  return (
    <IonPage>
      <IonContent fullscreen>
        <NewPinModal
          showModal={showModal}
          latLng={newPinLatLng}
          setShowModal={setShowModal}
        />
        {selectedPin && (
          <PinDetailsModal pin={selectedPin} setSelectedPin={setSelectedpin} />
        )}
        <Map
          // eslint-disable-next-line
          style="mapbox://styles/mapbox/streets-v8"
          containerStyle={{ width: "100%", height: "100%" }}
          onClick={handleMapClick}
          onStyleLoad={onStyleLoad}
          center={[4.79, 45.75]}
        >
          {pins &&
            pins.map((pin: Pin) => (
              <Marker
                key={pin._id}
                coordinates={pin.location.coordinates}
                anchor="bottom"
                onClick={() => setSelectedpin(pin)}
              >
                <div
                  className="pin-map-marker"
                  style={{
                    backgroundImage: `url(${ASSETS_URL}${pin.img.publicUrl})`,
                  }}
                ></div>
              </Marker>
            ))}
        </Map>
        {addingPin && (
          <div className="touch-map">Touch map to create a new event...</div>
        )}
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton
            onClick={handleAddPinClick}
            color={addingPin ? "danger" : "primary"}
          >
            {addingPin ? <IonIcon icon={close} /> : <IonIcon icon={add} />}
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default MapPage;
