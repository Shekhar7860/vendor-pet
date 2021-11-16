import React, {Component} from 'react';
import {Button, View, Text} from 'react-native';
import RNPgReactNativeSDK from 'react-native-pg-react-native-sdk';

const WEB = 'WEB';
const UPI = 'UPI';
const BASE_RESPONSE_TEXT = 'Response or error will show here.';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      responseText: BASE_RESPONSE_TEXT,
    };
  }

  changeResponseText = message => {
    this.setState({
      responseText: message,
    });
  };

  _startProcess(mode) {
    this.changeResponseText(BASE_RESPONSE_TEXT);
    var orderId;

    const apiKey = '--app id here--'; // put your apiKey here
    const apiSecret = '--app secret here--'; // put your apiSecret here

    const env = 'TEST'; // use "TEST" or "PROD"
    var tokenUrl;
    if (env === 'TEST') {
      tokenUrl = 'https://test.cashfree.com/api/v2/cftoken/order'; //for TEST
    } else {
      tokenUrl = 'https://api.cashfree.com/api/v2/cftoken/order'; //for PROD
    }

    orderId = 'Order' + parseInt(100000000 * Math.random());
    let orderApiMap = {
      orderId: orderId,
      orderAmount: '1',
      orderCurrency: 'INR',
    };

    const postParams = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-client-id': apiKey,
        'x-client-secret': apiSecret,
      },
      body: JSON.stringify(orderApiMap),
    };

    var cfToken;
    fetch(tokenUrl, postParams)
      .then(response => {
        return response.json();
      })
      .then(data => {
        // console.log("data" + data);
        try {
          cfToken = data.cftoken;
          console.log('Token is : ' + data.cftoken);
          startPayment(cfToken);
        } catch (error) {
          this.changeResponseText(data);
        }
      });

    function startPayment(cfToken) {
      var map = {
        orderId: orderId,
        orderAmount: '1',
        appId: apiKey,
        tokenData: cfToken,
        orderCurrency: 'INR',
        orderNote: 'Test Note',
        notifyUrl: 'https://test.gocashfree.com/notify',
        customerName: 'Cashfree User',
        verifyExpiry: '100',
        customerPhone: '9999999999',
        customerEmail: 'cashfree@cashfree.com',
      };

      if (mode === UPI) {
        RNPgReactNativeSDK.startPaymentUPI(map, env, responseHandler);
      } else {
        RNPgReactNativeSDK.startPaymentWEB(map, env, responseHandler);
      }
    }

    var responseHandler = result => {
      this.changeResponseText(result);
      console.log(result);
      try {
        var output = '';
        var obj = JSON.parse(result, function (key, value) {
          if (key !== '') {
            output = output + key + ' : ' + value + '\n';
          }
          // Do something with the result
        });
        this.changeResponseText(output);
      } catch (error) {
        //
      }
    };
  }

  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Button onPress={() => this._startProcess(WEB)} title={WEB} />
        <Button
          onPress={() => this._startProcess(UPI)}
          title={UPI}
          style={{marginTop: 16}}
        />
        <Text style={{margin: 16, fontSize: 14}}>
          {' '}
          {this.state.responseText}{' '}
        </Text>
      </View>
    );
  }
}
