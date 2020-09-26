import React, { useContext, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import StripeModal from "../components/StripeModal";
import { Elements } from "@stripe/react-stripe-js";
import useSWR from "swr";
import AuthContext from "../contexts/AuthContext";
import { IonButton } from "@ionic/react";
import { User } from "../types/interfaces";
import InvoicesList from "./InvoicesList";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY || "");

const UserDetails = ({ user }: { user: User }) => {
  const { userId } = useContext(AuthContext);
  const { revalidate } = useSWR("/users/" + userId);
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <>
      <h1 style={{ paddingBottom: 30 }}>{user.username}</h1>
      <p>Your points : {user.points}</p>
      <Elements stripe={stripePromise}>
        <StripeModal
          isOpen={showModal}
          setShowModal={setShowModal}
          revalidate={revalidate}
        />
      </Elements>
      <IonButton onClick={() => setShowModal(true)}>Buy points</IonButton>
      <h5>Invoices</h5>
      <InvoicesList invoices={user.invoices} />
    </>
  );
};

export default UserDetails;
