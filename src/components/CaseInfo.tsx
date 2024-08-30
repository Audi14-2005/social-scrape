import React from 'react';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton } from '@ionic/react';
import './AddCase.css'
interface CaseInfoProps {
  caseId: string;
}

const CaseInfo: React.FC<CaseInfoProps> = ({ caseId }) => {
  return (
    <IonCard className="add-case-card">
      <IonCardHeader>
        <IonCardTitle>Case ID: {caseId}</IonCardTitle>
      </IonCardHeader>
      <IonButton>Start</IonButton>   
     </IonCard>
  );
};

export default CaseInfo;