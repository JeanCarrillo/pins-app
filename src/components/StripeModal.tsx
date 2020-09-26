import React, { useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import "../theme/StripeModal.scss";
import {
  IonButton,
  IonContent,
  IonItem,
  IonLabel,
  IonModal,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonSpinner,
} from "@ionic/react";
import stripeAPI from "../services/stripeAPI";

interface StripeModalProps {
  isOpen: boolean;
  setShowModal: Function;
  revalidate: Function;
}
const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#303238",
      fontSize: "16px",
      fontFamily: "sans-serif",
      fontSmoothing: "antialiased",
      "::placeholder": {
        color: "#CFD7DF",
      },
    },
    invalid: {
      color: "#e5424d",
      ":focus": {
        color: "#303238",
      },
    },
  },
};

const pointsList: number[] = [];
for (let i = 1; i <= 24; i++) pointsList.push(i);

const StripeModal = ({
  isOpen,
  setShowModal,
  revalidate,
}: StripeModalProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [points, setPoints] = useState<number>(pointsList[0]);
  const [receiptUrl, setReceiptUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    const card = elements.getElement(CardElement);
    if (!card) return;
    const { error, token } = await stripe.createToken(card);
    if (error) {
      console.log(error.message);
    } else {
      setLoading(true);
      const invoice = await stripeAPI.checkout({
        cardToken: token,
        points,
      });
      setReceiptUrl(invoice.receipt);
      revalidate();
    }
    setLoading(false);
  };

  const closeModal = () => {
    setShowModal(false);
    setReceiptUrl("");
  };

  return (
    <IonModal isOpen={isOpen} onDidDismiss={closeModal}>
      <IonContent className="ion-padding">
        {receiptUrl ? (
          <div className="success">
            <h2>Payment Successful!</h2>
            <a href={receiptUrl}>View Receipt</a>
            <IonButton onClick={closeModal}>Back</IonButton>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              height: "100%",
            }}
          >
            <IonItem>
              <IonLabel position="stacked">Points</IonLabel>
              <IonSelect
                value={points}
                placeholder="Select One"
                onIonChange={(e) => setPoints(e.detail.value)}
                aria-required
              >
                {pointsList.map((num, i) => (
                  <IonSelectOption key={`Point-${i}`} value={num}>
                    {num} Point{num > 1 && "s"} : {num} €
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>
            <IonItem>
              <IonLabel>
                Card details
                <CardElement options={CARD_ELEMENT_OPTIONS} />
              </IonLabel>
            </IonItem>
            <IonRow className="ion-justify-content-around ion-margin-bottom">
              <IonButton color="danger" onClick={closeModal}>
                Cancel
              </IonButton>
              <IonButton type="submit" disabled={!stripe || loading}>
                {loading ? <IonSpinner /> : "Pay"}
              </IonButton>
            </IonRow>
          </form>
        )}
      </IonContent>
    </IonModal>
  );
};

export default StripeModal;
