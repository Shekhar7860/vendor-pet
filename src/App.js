import "react-native-gesture-handler";


import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {Dimensions, SafeAreaView, StyleSheet, View, LogBox} from 'react-native';
import ChangePassword from './module/changePassword/ChangePassword';
import ForgotPassword from './module/login/ForgotPassword';
import NewPassword from './module/login/NewPassword';
import HomeScreen from './module/home/HomeScreen';
import Login from './module/login/Login';
import Notificatios from './module/notifications/Notificatios';
import Reminders from './module/reminders/Reminders';
import Setting from './module/settings/Setting';
import SignUp from './module/signup/SignUp';
import Splash from './module/Splash';
import Vaccination from './module/vaccination/Vaccination';
import Welcome from './module/welcome/Welcome';
import MyProfile from './module/profile/MyProfile';
import MyDoctorProfile from './module/profile/MyDoctorProfile';
import AuthContextProvider from './services/authProvider';
import MyAppointments from './module/myAppointments/MyAppointments';
import MyOrders from './module/myOrders/MyOrders';
import BookingDetail from './module/myAppointments/BookingDetail';
import AssignDoctor from './module/myAppointments/AssignDoctor';
import DoctorAppointment from './module/myAppointments/DoctorAppointment';
import AppointmentDetail from './module/myAppointments/AppointmentDetail';
import BookAppointments from './module/myAppointments/BookAppointments';
import AddTimeSlotDialog from './module/profile/AddTimeSlotDialog';
import OrderDetails from './module/myOrders/OrderDetails'
import {Chat} from './module/chat/Chat';
import BankAccountDetail from './module/bankAccount/BankAccountDetail';
import ServiceProvider from './module/service/ServiceProvider';
import UpdateKycDetail from './module/kycDetail/UpdateKycDetail';
import PlacesApiSearch from './module/placesapisearch/index';
import BusinessDetail from './module/businessDetail/BusinessDetail';
import VideoCall from './module/video/VideoCall';
import LegalInformation from './module/legalInformation/LegalInformation';
import Products from './module/products/Products';
import ProductDialog from "./module/products/ProductDialog";
export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;

export var userCurrentLocation = null;

const App = () => {
  const Stack = createStackNavigator();

  return (
    <AuthContextProvider>
      <SafeAreaView style={styles.container}>
        {(LogBox.ignoreAllLogs())}
        <View style={styles.bottomSafeArea}>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Splash">
              <Stack.Screen
                name="Splash"
                component={Splash}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="Login"
                component={Login}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="Welcome"
                component={Welcome}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="SignUp"
                component={SignUp}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{headerShown: false}}
              />

              <Stack.Screen
                name="Vaccination"
                component={Vaccination}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="Products"
                component={Products}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="AddProduct"
                component={ProductDialog}
                options={{headerShown: false}}
              />

              <Stack.Screen
                name="Reminders"
                component={Reminders}
                options={{headerShown: false}}
              />

              <Stack.Screen
                name="Notificatios"
                component={Notificatios}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="ChangePassword"
                component={ChangePassword}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="ForgotPassword"
                component={ForgotPassword}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="NewPassword"
                component={NewPassword}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="Setting"
                component={Setting}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="MyProfile"
                component={MyProfile}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="MyDoctorProfile"
                component={MyDoctorProfile}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="MyAppointments"
                component={MyAppointments}
                options={{headerShown: false}}
              />
                <Stack.Screen
                name="MyOrders"
                component={MyOrders}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="BookingDetail"
                component={BookingDetail}
                options={{headerShown: false}}
              />
               <Stack.Screen
                name="OrderDetails"
                component={OrderDetails}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="DoctorAppointment"
                component={DoctorAppointment}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="AppointmentDetail"
                component={AppointmentDetail}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="AssignDoctor"
                component={AssignDoctor}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="AddTimeSlotDialog"
                component={AddTimeSlotDialog}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="Chat"
                component={Chat}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="BankAccountDetail"
                component={BankAccountDetail}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="ServiceProvider"
                component={ServiceProvider}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="BookAppointments"
                component={BookAppointments}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="UpdateKycDetail"
                component={UpdateKycDetail}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="PlacesApiSearch"
                component={PlacesApiSearch}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="BusinessDetail"
                component={BusinessDetail}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="VideoCall"
                component={VideoCall}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="LegalInformation"
                component={LegalInformation}
                options={{headerShown: false}}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </View>
      </SafeAreaView>
    </AuthContextProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomSafeArea: {
    flex: 1,
  },
});

export default App;
