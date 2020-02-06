import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navigation from '../src/components/Navigation/navigation'
import LandingPage from '../src/components/Landing/landing';
import SignUpPage from '../src/components/SignUp/signup';
import SignInPage from '../src/components/SignIn/signin';
import HomePage from '../src/components/Home/home';
import AccountPage from '../src/components/Account/account';

import * as ROUTES from '../src/constants/routes'
import { withFirebase } from '../src/components/Firebase'

import { AuthUserContext } from '../src/components/Session';

const App = () => (
    <Router>
    <div>
      <Navigation />
      <hr />
      <Route exact path={ROUTES.LANDING} component={LandingPage} />
      <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
      <Route path={ROUTES.SIGN_IN} component={SignInPage} />
      <Route path={ROUTES.HOME} component={HomePage} />
      <Route path={ROUTES.ACCOUNT} component={AccountPage} />
    </div>
    </Router>
);

// class App extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       authUser: null
//     };
//   }

//   componentDidMount() {
//     this.listener = this.props.firebase.auth.onAuthStateChanged(authUser => {
//       authUser
//         ? this.setState({ authUser })
//         : this.setState({ authUser: null});
//     });
//   }

//   componentWillUnmount() {
//     this.listener();
//   }

//   render() {
//     return (
//       <AuthUserContext.Provider value={this.state.authUser}>
//         <Router>
//           <div>
//             <Navigation />
            
//             <hr/>
            
//           </div>
//         </Router>
//       </AuthUserContext.Provider>
      
//     )
//   }
// }
export default withFirebase(App);