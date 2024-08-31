import React, { useState } from 'react';
import {IonCard, IonContent, IonHeader, IonToolbar, IonCardHeader, IonCardTitle, IonTitle, IonCardContent, IonButton, IonModal } from '@ionic/react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

interface CaseInfoProps {
  caseId: string;
}

const CaseInfo: React.FC<CaseInfoProps> = ({ caseId }) => {
  const [showModal, setShowModal] = useState(false);

  const handleStartClick = () => {
    setShowModal(true);
  };

  return (
    <IonCard className="add-case-card">
      <IonCardHeader>
        <IonCardTitle>Case ID: {caseId}</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <IonButton onClick={handleStartClick}>Start</IonButton>
      </IonCardContent>
      <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
        <IonContent>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Choose Platform</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <Link to="/instagram-login">
              <IonButton>Instagram</IonButton>
            </Link>
            <IonButton disabled={true}>Twitter</IonButton>
            <IonButton disabled={true}>Whatsapp</IonButton>
            <IonButton disabled={true}>Facebook</IonButton>
          </IonContent>
        </IonContent>
      </IonModal>
    </IonCard>
  );
};

export default CaseInfo;