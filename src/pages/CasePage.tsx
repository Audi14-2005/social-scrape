// import React, { useState, useEffect } from 'react';

// import {
//     IonContent,
//     IonHeader,
//     IonPage,
//     IonTitle,
//     IonToolbar,
// } from '@ionic/react';
// import { useLocation } from 'react-router-dom';
// import AddCase from '../components/AddCase';
// import CaseInfo from '../components/CaseInfo';
// import '../pages/CasePage.css';

// const CasePage: React.FC = () => {
//     const location = useLocation<{ username: string }>();
//     const username = location.state?.username;

//     const [showAddCase, setShowAddCase] = useState(true);
//     const [currentCaseId, setCurrentCaseId] = useState('');

//     const handleSave = (newCaseId: string) => {
//         setCurrentCaseId(newCaseId);
//         setShowAddCase(false);
//     };

//     return (
//         <IonPage>
// <IonHeader>
//     <IonToolbar>
//         <IonTitle>Case Page</IonTitle>
//     </IonToolbar>
// </IonHeader>
//             <IonContent className="ion-padding">
//                 <p>Welcome, {username}!</p>
//                 {showAddCase ? (
//                     <AddCase onSave={handleSave} />
//                 ) : (<>
//                         <CaseInfo caseId={currentCaseId} />
//                         <AddCase onSave={handleSave} />
//                     </>
//                 )}
//             </IonContent>
//         </IonPage>
//     );
// };

// export default CasePage;
import React, { useState, useEffect } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useLocation } from "react-router-dom";
import AddCase from "../components/AddCase";
import CaseInfo from "../components/CaseInfo";
import "../pages/CasePage.css";

const CasePage: React.FC = () => {
  const location = useLocation<{ username: string }>();
  const username = location.state?.username;

  const [cases, setCases] = useState<string[]>([]);

  useEffect(() => {
    // Load saved cases from local storage on component mount
    const storedCases = localStorage.getItem("cases");
    if (storedCases) {
      setCases(JSON.parse(storedCases));
    }
  }, []);

  const handleSave = (newCaseId: string) => {
    setCases((prevCases) => [...prevCases, newCaseId]);
    localStorage.setItem('cases', JSON.stringify([...cases, newCaseId]));
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
        {cases.map((caseId) => (
          <CaseInfo key={caseId} caseId={caseId} />
        ))}
        <AddCase onSave={handleSave} />
      </IonContent>
    </IonPage>
  );
};

export default CasePage;
