import React, { useState } from 'react';
import { IonButton, IonModal } from '@ionic/react';

const MyComponent: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  const handleButtonClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    console.log('Closed');
    setShowModal(false);
  };

  return (
    <>
      <IonButton onClick={handleButtonClick}>Open Modal</IonButton>
      <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
        <IonButton onClick={handleCloseModal}>Close</IonButton>
      </IonModal>
    </>
  );
};

export default MyComponent;