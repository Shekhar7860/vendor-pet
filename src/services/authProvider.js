import React, {useState, useEffect} from 'react';
import {MESIBO_TOKEN} from '../utils/AppConstant';
import {getItem, setItem, removeItem} from './storageService';

export const AuthContext = React.createContext();

const STORAGE_USER_KEY = 'user';
const STORAGE_TOKEN_KEY = 'token';
const FIREBASE_TOKEN_KEY = 'firebaseToken';
const MESIBO_TOKEN_KEY = 'mesiboToken';
const MESIBO_USER_ID_KEY = 'mesiboUserId';
const PROFILE_STATUS_KEY = 'profileStatus';

const AuthContextProvider = ({children}) => {
  const [user, setUser] = useState();
  const [profileStatus, setProfileStatus] = useState();
  const [token, setToken] = useState();
  const [logout, setLogout] = useState(false);
  const [firebaseToken, setFirebaseToken] = useState();
  const [mesiboToken, setMesiboToken] = useState();
  const [mesiboId, setMesiboId] = useState();
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();

  useEffect(() => {
    if (logout) {
      (async () => {
        setUser('');
        setToken('');
        setLogout(false);
        removeItem(STORAGE_USER_KEY).then(result => {
          console.log('user logout', result);
        });
        removeItem(STORAGE_TOKEN_KEY).then(result => {
          console.log('user logout', result);
        });
      })();
    } else if (user && token && user !== '' && token !== '') {
      setItem(STORAGE_USER_KEY, user);
      setItem(STORAGE_TOKEN_KEY, token);
      setItem(FIREBASE_TOKEN_KEY, firebaseToken);
      setItem(MESIBO_TOKEN_KEY, mesiboToken);
      setItem(MESIBO_USER_ID_KEY, mesiboId);
      setItem(PROFILE_STATUS_KEY, profileStatus);
    } else {
      (async () => {
        getItem(STORAGE_USER_KEY).then(userValue => {
          if (userValue) {
            setUser(JSON.parse(userValue));
          } else {
            setUser('');
          }
        });
        getItem(STORAGE_TOKEN_KEY).then(tokenValue => {
          if (tokenValue) {
            setToken(tokenValue);
          } else {
            setToken('');
          }
        });
        getItem(FIREBASE_TOKEN_KEY).then(firebaseTokenValue => {
          if (firebaseTokenValue) {
            setFirebaseToken(firebaseTokenValue);
          }
        });
        getItem(MESIBO_TOKEN_KEY).then(mesiboTokenValue => {
          if (mesiboTokenValue) {
            setMesiboToken(mesiboTokenValue);
          }
        });
        getItem(MESIBO_USER_ID_KEY).then(mesiboUserIdValue => {
          if (mesiboUserIdValue) {
            setMesiboToken(mesiboUserIdValue);
          }
        });
        getItem(PROFILE_STATUS_KEY).then(profileStatusValue => {
          if (profileStatusValue) {
            setProfileStatus(profileStatusValue);
          }
        });
      })();
    }
  }, [
    logout,
    user,
    token,
    mesiboToken,
    mesiboId,
    profileStatus,
    firebaseToken,
  ]);
  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        firebaseToken,
        logout,
        mesiboToken,
        mesiboId,
        profileStatus,
        latitude,
        longitude,
        setUser,
        setToken,
        setLogout,
        setFirebaseToken,
        setMesiboToken,
        setMesiboId,
        setProfileStatus,
        setLatitude,
        setLongitude,
      }}>
      {user !== undefined && token !== undefined ? children : null}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
