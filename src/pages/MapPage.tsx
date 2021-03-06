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
import { Coords, LatLng, Pin } from "../types/interfaces";
import NewPinModal from "../components/NewPinModal";
import useSWR, { mutate } from "swr";
import PinDetailsModal from "../components/PinDetailsModal";
import { ASSETS_URL } from "../config/api";
import { fetcher } from "../config/swr";

const Map = ReactMapboxGl({
  accessToken: process.env.REACT_APP_MAPBOX_TOKEN || "",
});

const MapPage: React.FC = () => {
  const [addingPin, setAddingPin] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedPin, setSelectedpin] = useState<Pin | null>(null);
  const [newPinLatLng, setNewPinLatLng] = useState<LatLng>();
  const [coords, setCoords] = useState<Coords>([4.79, 45.75]);
  const { data: pins } = useSWR("/pins");

  const handleMapClick = (map: mapboxgl.Map, e: any): void => {
    if (!addingPin) return;
    setNewPinLatLng(e.lngLat);
    setShowModal(true);
  };

  const handleAddPinClick = (e: React.MouseEvent): void => {
    e.stopPropagation();
    setNewPinLatLng(undefined);
    setAddingPin((s) => !s);
  };

  const onStyleLoad = (map: mapboxgl.Map): void => {
    map.resize();
  };

  const onDragEnd = (map: mapboxgl.Map, e: React.SyntheticEvent<any>): void => {
    const { lng, lat } = map.getCenter();
    setCoords([lng, lat]);
    mutate("/pins", fetcher(`/pins?coords=${coords}`));
  };

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
          center={coords}
          onDragEnd={onDragEnd}
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
