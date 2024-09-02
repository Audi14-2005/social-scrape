import React from 'react';
import { useLocation } from "react-router-dom";
import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
  } from "@ionic/react";
const ReportPage: React.FC = () => {
    const location = useLocation<{ username: string }>();
    const username = location.state?.username;
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Instagram Report</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <p>Generated report for : {username}</p>
      </IonContent>
    </IonPage>
  )
}

export default ReportPage;