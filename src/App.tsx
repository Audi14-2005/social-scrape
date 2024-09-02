import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import LoginPage from './pages/LoginPage';
import Case from './pages/CasePage';
import InstaLoginPage from './pages/InstaLoginPage';
import ReportPage from './pages/ReportPage';
import SignupPage from './pages/SignupPage';
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();
const PageLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <IonPage>{children}
  </IonPage>
);

const App: React.FC = () => (
  <IonApp>
  <IonReactRouter>
    <Switch>
      <Route exact path="/login">
        <PageLayout>
          <LoginPage />
        </PageLayout>
      </Route>
      <Route exact path="/signup">
          <PageLayout>
            <SignupPage />
          </PageLayout>
      </Route>
      <Route exact path="/case">
        <PageLayout>
          <Case />
        </PageLayout>
      </Route>
      <Route exact path="/instagram-login">
          <PageLayout>
            <InstaLoginPage />
          </PageLayout>
      </Route>
      <Route exact path="/report">
          <PageLayout>
            <ReportPage />
          </PageLayout>
      </Route>
      <Redirect from="/" to="/login" />
    </Switch>
  </IonReactRouter>
  </IonApp>
);

export default App;
