import React from "react";
import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import { Redirect, Route } from "react-router-dom";
import { mapOutline, personCircleOutline } from "ionicons/icons";
import MapPage from "../pages/MapPage";
import ProfilePage from "../pages/ProfilePage";

const MainTabs = () => (
  <IonTabs>
    <IonRouterOutlet>
      <Route path="/map" component={MapPage} exact={true} />
      <Route path="/profile" component={ProfilePage} exact={true} />
      <Route path="/" render={() => <Redirect to="/map" />} exact={true} />
    </IonRouterOutlet>
    <IonTabBar slot="bottom">
      <IonTabButton tab="map" href="/map">
        <IonIcon icon={mapOutline} />
        <IonLabel>Map</IonLabel>
      </IonTabButton>
      <IonTabButton tab="profile" href="/profile">
        <IonIcon icon={personCircleOutline} />
        <IonLabel>Profile</IonLabel>
      </IonTabButton>
    </IonTabBar>
  </IonTabs>
);

export default MainTabs;
