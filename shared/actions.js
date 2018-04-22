import firebase from 'firebase';
import config from './config.json';
import pick from 'lodash/pick';
import moment from 'moment';

const firebaseApp = firebase.initializeApp(config.firebase);
const firebaseDB = firebaseApp.database();
const firebaseRef = firebaseDB.ref();
const firebaseAuth = firebase.auth;
let provider = new firebase.auth.GoogleAuthProvider();
let fbProvider = new firebase.auth.FacebookAuthProvider();
fbProvider.addScope('email');

export function onAuthStateChanged(firebaseUser) {
  return dispatch => {
    if (firebaseUser) {
      firebaseAuth().currentUser.getIdToken()
        .then((token) => {
          global.token = token;
        }).catch((err) => {
          console.log(err);
        });
      firebaseRef.child('/users/' + firebaseUser.uid).once('value').then((data) => {
        let user = data.val();
        if (!user) {
          let newSet = {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            emailVerified: firebaseUser.emailVerified
          };
          if (firebaseUser.providerData && firebaseUser.providerData[0]) {
            newSet.provider = firebaseUser.providerData[0].providerId;
            if (firebaseUser.providerData[0].displayName) {
              newSet.name = firebaseUser.providerData[0].displayName;
            }
          }
          firebaseRef.child('/users/' + firebaseUser.uid).set(newSet);
        } else if (user.email !== firebaseUser.email || (!user.emailVerified && firebaseUser.emailVerified)) {
          firebaseRef.child('/users/' + firebaseUser.uid).update({
            email: firebaseUser.email,
            emailVerified: firebaseUser.emailVerified
          });
        } else if ((user.provider && user.provider.providerID) !==
          (firebaseUser.providerData && firebaseUser.providerData[0] && firebaseUser.providerData[0].providerId)) {
          firebaseRef.child('/users/' + firebaseUser.uid).update({
            provider: firebaseUser.providerData && firebaseUser.providerData[0] && firebaseUser.providerData[0].providerId
          });
        }
        firebaseRef.child('/groups/').on('value', (snap) => {
          let groups = {};
          snap.forEach((child) => {
            groups[child.key] = child.val();
          });
          dispatch({
            type: 'UPDATE_AUTH',
            user: user || {
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              emailVerified: firebaseUser.emailVerified
            },
            groups
          });
        });
        firebaseRef.child('/users/' + firebaseUser.uid).on('value', (data) => {
          let user = data.val();
          if (user) {
            dispatch({
              type: 'UPDATE_AUTH',
              user
            });
          }
        });
      });
    } else {
      dispatch({
        type: 'UPDATE_AUTH',
        user: undefined
      });
    }
  }
}

export function loginWithGoogle(email, callback) {
  return dispatch => {
    if (email) {
      provider.setCustomParameters({
        'login_hint': email
      });
    }
    firebaseAuth().signInWithRedirect(provider);
    firebaseAuth().getRedirectResult().then((result) => {
      if (result.credential) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        //var token = result.credential.accessToken;
      }
      let user = result.user;
      callback && callback(user);
    }).catch((err) => {
      // Handle Errors here.
      var errorCode = err.code;
      var errorMessage = err.message;
      // The email of the user's account used.
      var email = err.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = err.credential;
      console.log(err);
      dispatch({
        type: 'UPDATE_AUTH',
        err
      });
      callback && callback(undefined, err);
    });
  }
}

export function logout() {
  return dispatch => {
    firebaseAuth().signOut()
      .then(() => {
        dispatch({
          type: 'UPDATE_AUTH'
        });
      })
      .catch((err) => {
        console.log(err);
      })
  }
}

export function resetPassword(email, callback) {
  return dispatch => {
    firebaseAuth().sendPasswordResetEmail(email)
      .then(() => {
        callback && callback();
      })
      .catch((err) => {
        console.log(err);
        callback && callback(undefined, err);
      })
  }
}

export function setUserGroup(uid, group, value, groups, callback) {
  return dispatch => {
    if (groups && groups[group] && groups[group][uid]) {
      firebaseRef.child('/groups/' + group + '/' + uid).set(value);
    } else {
      firebaseRef.child('/groups/' + group + '/' + uid).push(value);
    }
  }
}

export function fetchUsers() {
  return dispatch => {
    firebaseRef.child('/users/').on('value', (snap) => {
      let users = {};
      snap.forEach((child) => {
        users[child.key] = child.val();
      });
      dispatch({
        type: 'FETCH_USERS',
        users
      });
    });
  }
}

export function addUser(user, callback) {
  return dispatch => {
    fetch('/api/adduser', {
      headers: {
        'x-access-token': global.token,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(user)
    })
      .then(response => response.json())
      .then(json => {
        console.log(json);
        if (json.userRecord) {
          callback && callback(json.userRecord.uid);
        } else {
          console.log(json);
          callback && callback(undefined, {error: 'No user returned'});
        }
      })
      .catch(ex => {
        console.log(ex);
        callback && callback(undefined, ex);
      });
  }
}

export function updateFirebaseUser(uid, update, callback) {
  return dispatch => {
    fetch('/api/user/' + uid, {
      headers: {
        'x-access-token': global.token,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'PATCH',
      body: JSON.stringify(update)
    })
      .then(response => response.json())
      .then(json => {
        callback && callback(json);
      })
      .catch(ex => {
        console.log(ex);
        callback && callback(undefined, ex);
      });
  }
}

export function updateUser(user, callback) {
  return dispatch => {
    firebaseRef.child('/users/' + user.uid).update(user);
    callback && callback();
  }
}

export function deleteUser(uid) {
  return dispatch => {
    firebaseRef.child('/users/' + uid).remove();
    fetch('/api/user/' + uid, {
      headers: {
        'x-access-token': global.token,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'DELETE'
    })
      .then(response => response.json())
      .then(err => {
        console.log('deleted user', err);
      })
      .catch(ex => {
        console.log(ex);
      });
  }
}


export function fetchItems() {
  return dispatch => {
    var ref = firebaseDB.ref('items/');
    ref.on('value', (snap) => {
      let items = [];
      snap.forEach((child) => {
        items.push({
          _id: child.key,
          ...child.val()
        });
      });
      dispatch({
        type: 'FETCH_ITEMS',
        items
      });
    });
  }
}
export function addItem(item, callback) {
  return dispatch => {
    let newRef = firebaseRef.child('/items/').push();
    newRef.set({
      _id: newRef.getKey(),
      ...item
    });
    callback && callback();
  }
}
export function updateItem(item, callback) {
  return dispatch => {
    firebaseRef.child('/items/' + item._id).set(item);
    callback && callback();
  }
}
export function deleteItem(id) {
  return dispatch => {
    firebaseRef.child('/items/' + id).remove();
  }
}

export function fetchSales() {
  return dispatch => {
    var ref = firebaseDB.ref('sales/');
    ref.on('value', (snap) => {
      let items = [];
      snap.forEach((child) => {
        items.push({
          _id: child.key,
          ...child.val()
        });
      });
      dispatch({
        type: 'FETCH_SALES',
        items
      });
    });
  }
}
export function submitSale(item, callback) {
  return dispatch => {
    if (item._id) {
      firebaseRef.child('/sales/' + item._id).set(item);
      callback && callback(undefined, item);
    } else {
      let newRef = firebaseRef.child('/sales/').push();
      let newItem = Object.assign({}, item, {
        _id:newRef.getKey()
      });
      newRef.set(newItem);
      callback && callback(undefined, newItem);
    }
  }
}
export function deleteSale(id) {
  return dispatch => {
    firebaseRef.child('/sales/' + id).remove();
  }
}

export function fetchCustomers() {
  return dispatch => {
    var ref = firebaseDB.ref('customers/');
    ref.on('value', (snap) => {
      let items = [];
      snap.forEach((child) => {
        items.push({
          _id: child.key,
          ...child.val()
        });
      });
      dispatch({
        type: 'FETCH_CUSTOMERS',
        items
      });
    });
  }
}
export function submitCustomer(item, callback) {
  return dispatch => {
    if (item._id) {
      firebaseRef.child('/customers/' + item._id).set(item);
      callback && callback(undefined, item);
    } else {
      let newRef = firebaseRef.child('/customers/').push();
      let newItem = Object.assign({}, item, {
        _id:newRef.getKey()
      });
      newRef.set(newItem);
      callback && callback(undefined, newItem);
    }
  }
}
export function deleteCustomer(id) {
  return dispatch => {
    firebaseRef.child('/customers/' + id).remove();
  }
}