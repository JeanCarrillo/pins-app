import { IonCol, IonList, IonRow } from "@ionic/react";
import React from "react";
import { Invoice } from "../types/interfaces";

const twoChars = (num: number): string =>
  num < 10 ? "0" + num.toString() : num.toString();

const getFormattedDate = (date: string): string => {
  const d = new Date(date);
  return `${d.getFullYear()}/${twoChars(d.getMonth() + 1)}/${twoChars(
    d.getDate()
  )}`;
};

const getFormattedHours = (date: string): string => {
  const d = new Date(date);
  return `${twoChars(d.getHours())}:${twoChars(d.getMinutes())}`;
};

const InvoicesList = ({ invoices }: { invoices: Invoice[] }) => (
  <IonList>
    {invoices.map((invoice) => (
      <IonRow key={invoice._id} style={{ borderBottom: "1px solid lightgrey" }}>
        <IonCol>
          <IonRow className="ion-padding-bottom ion-justify-content-center">
            {getFormattedDate(invoice.createdAt)}
          </IonRow>
          <IonRow className="ion-justify-content-center">
            {getFormattedHours(invoice.createdAt)}
          </IonRow>
        </IonCol>
        <IonCol>
          <IonRow className="ion-padding-bottom ion-justify-content-center">
            Point{invoice.points > 1 && "s"}: {invoice.points}
          </IonRow>
          <IonRow className="ion-justify-content-center">
            Price: {Math.floor(invoice.amount / 100)}€
          </IonRow>
        </IonCol>
        <IonCol>
          <IonRow style={{ paddingTop: 12 }}>
            <IonCol className="ion-justify-content-center ion-align-items-center">
              <a href={invoice.receipt}>Receipt</a>
            </IonCol>
          </IonRow>
        </IonCol>
      </IonRow>
    ))}
  </IonList>
);

export default InvoicesList;
