import React, { useState } from 'react';
import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
} from '@ionic/react';
import { useLocation } from 'react-router-dom';
import AddCase from '../components/AddCase';
import CaseInfo from '../components/CaseInfo';
import '../pages/CasePage.css';

const CasePage: React.FC = () => {
    const location = useLocation<{ username: string }>();
    const username = location.state?.username;

    const [showAddCase, setShowAddCase] = useState(true);
    const [currentCaseId, setCurrentCaseId] = useState('');

    const handleSave = (newCaseId: string) => {
        setCurrentCaseId(newCaseId);
        setShowAddCase(false);
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Case Page</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <p>Welcome, {username}!</p>
                {showAddCase ? (
                    <AddCase onSave={handleSave} />
                ) : (
                    <CaseInfo caseId={currentCaseId} />
                )}
            </IonContent>
        </IonPage>
    );
};

export default CasePage;