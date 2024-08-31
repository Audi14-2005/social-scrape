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
     IonAlert,
    } from "@ionic/react";

interface LoginProps {
  pageTitle: string; // Prop for page title (Login or Instagram Login)
  para: String;
  actBtn: String;
  onSubmit?: (username: string, password: string) => void; // Optional function for form submission handling
}

const Login: React.FC<LoginProps> = ({ pageTitle, para, actBtn, onSubmit }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertHeader, setAlertHeader] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  const handleUsernameChange = (e: CustomEvent) => {
    setUsername((e.target as HTMLInputElement).value);
  };

  const handlePasswordChange = (e: CustomEvent) => {
    setPassword((e.target as HTMLInputElement).value);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!username.trim() || !password.trim()) {
      setAlertHeader('Input Error!');
      setAlertMessage('Both username and password are required.');
      setShowAlert(true);
    } else if (onSubmit) {
        onSubmit(username, password); // Call onSubmit function if provided
    } else {
      console.log('Username:', username);
      console.log('Password:', password);
      // Handle form submission logic here, if no onSubmit function is provided
    }
  };

  const handleReset = () => {
    setUsername('');
    setPassword('');
  };

  const handleAlertDismiss = () => {
    setShowAlert(false);
  };

  return (
    <IonPage>
   <IonHeader>
    <IonToolbar>
     <IonTitle>{pageTitle}</IonTitle>
    </IonToolbar>
   </IonHeader>
   <IonContent className="ion-padding">
    <p>{para}</p>
     <IonItem>
      <IonLabel position="fixed">Username</IonLabel>
      <IonInput
       type="text"
       value={username}
       onIonInput={handleUsernameChange}
      />
     </IonItem>
     <IonItem>
      <IonLabel position="fixed">Password</IonLabel>
      <IonInput
       type="password"
       value={password}
       onIonInput={handlePasswordChange}
      />
     </IonItem>
     <IonButton expand="block" type="submit" onClick={handleFormSubmit}>
      {actBtn}
     </IonButton>
     <IonButton expand="block" color="light" onClick={handleReset}>
      Reset
     </IonButton>

    <IonAlert
     isOpen={showAlert}
     onDidDismiss={handleAlertDismiss}
     header={alertHeader}
     message={alertMessage}
     buttons={[{ text: 'Retry', handler: handleAlertDismiss}]}
    />
   </IonContent>
  </IonPage>
 );
};

export default Login;