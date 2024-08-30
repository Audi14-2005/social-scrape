import React, { useState } from "react";
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

import { useHistory } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [alertHeader, setAlertHeader] = useState("Input Error!");
  const [alertMessage, setAlertMessage] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [btnMessage, setBtnMessage] = useState("Retry");

  const history = useHistory();

  // Handle form submission
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate the input fields
    if (!username.trim() && !password.trim()) {
      setAlertHeader("Input Error!");
      setAlertMessage("Both username and password are required.");
      setBtnMessage("Retry");
      setShowAlert(true);
    } else if (!username.trim()) {
      setAlertHeader("Input Error!");
      setAlertMessage("Username is required.");
      setBtnMessage("Retry");
      setShowAlert(true);
    } else if (!password.trim()) {
      setAlertHeader("Input Error!");
      setAlertMessage("Password is required.");
      setBtnMessage("Retry");
      setShowAlert(true);
    } else {
      setLoggedIn(true);
      setAlertHeader("Done!");
      setAlertMessage("Login Successful!");
      setBtnMessage("Continue");
      setShowAlert(true);
      console.log("Username:", username);
      console.log("Password:", password);
    }
  };
  
  const handleAlertButtonClick = () => {
    if (loggedIn) {
      history.push('/case', { username }); // Redirect to Case page & pass username's state too
    }
  };

  // Reset form fields
  const handleReset = () => {
    setUsername("");
    setPassword("");
  };

  const handleUsernameChange = (e: CustomEvent) => {
    const value = (e.target as HTMLInputElement).value;
    setUsername(value);
  };

  const handlePasswordChange = (e: CustomEvent) => {
    const value = (e.target as HTMLInputElement).value;
    setPassword(value);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <form onSubmit={handleLogin}>
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
          <IonButton expand="block" type="submit">
            Login
          </IonButton>
          <IonButton expand="block" color="light" onClick={handleReset}>
            Reset
          </IonButton>
        </form>

        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header={alertHeader}
          message={alertMessage}
          buttons={[{ text: btnMessage, handler: handleAlertButtonClick}]}
        />
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
