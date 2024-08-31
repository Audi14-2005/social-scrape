import React, { useState } from 'react';
import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonButton,
    IonItem,
    IonLabel,
    IonInput,
    IonTextarea,
    IonModal,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonIcon,
} from '@ionic/react';
import { addOutline } from 'ionicons/icons'; // Import the "+" icon
import './AddCase.css';

interface AddCaseProps {
    onSave: (newCaseId: string) => void;
}

const AddCase: React.FC<AddCaseProps> = ({ onSave }) => {
    const [showAddCasePopup, setShowAddCasePopup] = useState<boolean>(false);
    const [caseId, setCaseId] = useState<string>('');
    const [caseName, setCaseName] = useState<string>('');
    const [caseDescription, setCaseDescription] = useState<string>('');

    const handleSave = () => {
        // Save the case data and close the modal
        onSave(caseId);
        handleReset();
        setShowAddCasePopup(false);
    };

    const handleReset = () => {
        setCaseId('');
        setCaseName('');
        setCaseDescription('');
    };

    const handleCaseIdChange = (e: CustomEvent) => {
        setCaseId(e.detail.value as string || '');
    };

    const handleCaseNameChange = (e: CustomEvent) => {
        setCaseName(e.detail.value as string || '');
    };

    const handleCaseDescriptionChange = (e: CustomEvent) => {
        setCaseDescription(e.detail.value as string || '');
    };

    return (
        <>
            <IonCard className="add-case-card" onClick={() => setShowAddCasePopup(true)}>
                <IonCardHeader>
                    <IonCardTitle className="add-case-title">
                        <IonIcon icon={addOutline} className="add-case-icon" />
                    </IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                    <p>Add a new case</p>
                </IonCardContent>
            </IonCard>
            <IonModal isOpen={showAddCasePopup} onDidDismiss={() => setShowAddCasePopup(false)}>
                <IonPage>
                    <IonHeader>
                        <IonToolbar>
                            <IonTitle>Add New Case</IonTitle>
                            <IonButton slot="end" onClick={() => setShowAddCasePopup(false)}>
                                Close
                            </IonButton>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent className="ion-padding">
                        <IonItem>
                            <IonLabel position="fixed">Case ID</IonLabel>
                            <IonInput
                                type="text"
                                value={caseId}
                                onIonInput={handleCaseIdChange}
                            />
                        </IonItem>
                        <IonItem>
                            <IonLabel position="fixed">Case Name</IonLabel>
                            <IonInput
                                type="text"
                                value={caseName}
                                onIonInput={handleCaseNameChange}
                            />
                        </IonItem>
                        <IonItem>
                            <IonLabel position="fixed">Case Description</IonLabel>
                            <IonTextarea
                                value={caseDescription}
                                onIonInput={handleCaseDescriptionChange}
                            />
                        </IonItem>
                        <IonButton expand="block" onClick={handleSave}>
                            Save
                        </IonButton>
                        <IonButton expand="block" color="light" onClick={handleReset}>
                            Reset
                        </IonButton>
                    </IonContent>
                </IonPage>
            </IonModal>
        </>
    );
};

export default AddCase;