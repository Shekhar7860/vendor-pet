/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  Image,
  PermissionsAndroid,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import normalize from 'react-native-normalize';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {
  TwilioVideo,
  TwilioVideoLocalView,
  TwilioVideoParticipantView,
} from 'react-native-twilio-video-webrtc';
import {END_CALL, MUTED_ICON, ROTATE_CAMERA, UN_MUTED_ICON} from '../../images';
import Network from '../../network/Network';
import {RED, WHITE} from '../../utils/Colors';
import {LoaderIndicator} from '../../common/LoaderIndicator';

export async function GetAllPermissions() {
  try {
    // if (Platform.OS === "android") {
    const userResponse = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.CAMERA,
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    ]);
    return userResponse;
    // }
  } catch (err) {
    console.log(err);
  }
  return null;
}
export default class VideoCall extends Component {
  state = {
    isAudioEnabled: true,
    isVideoEnabled: true,
    isButtonDisplay: true,
    status: 'disconnected',
    participants: new Map(),
    videoTracks: new Map(),
    roomName: this.props.route.params.roomName,
    token: '',
    authToken: this.props.route.params.authToken,
    userId: this.props.route.params.userId,
    loading: false,
  };

  componentDidMount() {
    // on start we are asking the permisions
    GetAllPermissions();
    this.getAccressToken();
  }

  getAccressToken = () => {
    this.setState({loading: true});
    const {authToken, userId, roomName} = this.state;
    const payload = {
      sender_id: userId,
      room_name: roomName,
    };
    Network('user/get-video-call-token', 'post', payload, authToken)
      .then(async res => {
        console.log(' /n/n Result ', JSON.stringify(res));
        this.setState({loading: true, token: res.data.video_token}, () =>
          this._onConnectButtonPress(),
        );
      })
      .catch(error => {
        // showToastMessage("Something went wrong.");
      });
  };

  _onConnectButtonPress = () => {
    console.log('in on connect button preess');
    this.refs.twilioVideo.connect({
      roomName: this.state.roomName,
      accessToken: this.state.token,
    });
    this.setState({status: 'connecting'});
    console.log(this.state.status);
  };
  _onEndButtonPress = () => {
    this.refs.twilioVideo.disconnect();
    this.props.navigation.goBack();
  };
  _onMuteButtonPress = () => {
    // on cliking the mic button we are setting it to mute or viceversa
    this.refs.twilioVideo
      .setLocalAudioEnabled(!this.state.isAudioEnabled)
      .then(isEnabled => this.setState({isAudioEnabled: isEnabled}));
  };
  _onFlipButtonPress = () => {
    // switches between fronst camera and Rare camera
    this.refs.twilioVideo.flipCamera();
  };
  _onRoomDidConnect = () => {
    console.log('room did connected');
    this.setState({status: 'connected'});
    // console.log("over");
  };
  _onRoomDidDisconnect = ({roomName, error}) => {
    console.log('ERROR: ', JSON.stringify(error));
    console.log('disconnected');

    this.setState({status: 'disconnected'});
  };
  _onRoomDidFailToConnect = error => {
    console.log('ERROR: ', JSON.stringify(error));
    console.log('failed to connect');
    this.setState({status: 'disconnected'});
  };
  _onParticipantAddedVideoTrack = ({participant, track}) => {
    // call everytime a participant joins the same room
    console.log('onParticipantAddedVideoTrack: ', participant, track);
    this.setState({
      videoTracks: new Map([
        ...this.state.videoTracks,
        [
          track.trackSid,
          {participantSid: participant.sid, videoTrackSid: track.trackSid},
        ],
      ]),
    });

    console.log('this.state.videoTracks', this.state.videoTracks);
  };
  _onParticipantRemovedVideoTrack = ({participant, track}) => {
    // gets called when a participant disconnects.
    console.log('onParticipantRemovedVideoTrack: ', participant, track);
    const videoTracks = this.state.videoTracks;
    videoTracks.delete(track.trackSid);
    this.setState({videoTracks: {...videoTracks}});
    this.props.navigation.goBack();
  };
  render() {
    return (
      <View style={styles.container}>
        {/* {this.state.status === 'disconnected' && (
          <View>
            <Text style={styles.welcome}>React Native Twilio Video</Text>
            <View style={styles.spacing}>
              <Text style={styles.inputLabel}>Room Name</Text>
              <TextInput
                style={styles.inputBox}
                placeholder="Room Name"
                defaultValue={this.state.roomName}
                onChangeText={text => this.setState({roomName: text})}
              />
            </View>
            <View style={styles.spacing}>
              <Text style={styles.inputLabel}>Token</Text>
              <TextInput
                style={styles.inputBox}
                placeholder="Token"
                defaultValue={this.state.token}
                onChangeText={text => this.setState({token: text})}
              />
            </View>
            <TouchableHighlight
              style={[styles.buttonContainer, styles.loginButton]}
              onPress={this._onConnectButtonPress}>
              <Text style={styles.Buttontext}>Connect</Text>
            </TouchableHighlight>
          </View>
        )} */}
        {(this.state.status === 'connected' ||
          this.state.status === 'connecting') && (
          <View style={styles.callContainer}>
            {this.state.status === 'connected' && (
              <View style={styles.remoteGrid}>
                <TouchableOpacity
                  style={styles.remoteVideo}
                  onPress={() => {
                    this.setState({
                      isButtonDisplay: !this.state.isButtonDisplay,
                    });
                  }}>
                  {Array.from(
                    this.state.videoTracks,
                    ([trackSid, trackIdentifier]) => {
                      return (
                        <TwilioVideoParticipantView
                          style={styles.remoteVideo}
                          key={trackSid}
                          trackIdentifier={trackIdentifier}
                        />
                      );
                    },
                  )}
                </TouchableOpacity>
                <TwilioVideoLocalView
                  enabled={true}
                  style={
                    this.state.isButtonDisplay
                      ? styles.localVideoOnButtonEnabled
                      : styles.localVideoOnButtonDisabled
                  }
                />
              </View>
            )}
            <View
              style={{
                display: this.state.isButtonDisplay ? 'flex' : 'none',
                position: 'absolute',
                left: 0,
                bottom: 0,
                right: 0,
                height: 100,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-evenly',
                // backgroundColor:"blue",
                // zIndex: 2,
                zIndex: this.state.isButtonDisplay ? 2 : 0,
              }}>
              <TouchableOpacity
                activeOpacity={1}
                style={{
                  display: this.state.isButtonDisplay ? 'flex' : 'none',
                  width: 60,
                  height: 60,
                  marginLeft: 10,
                  marginRight: 10,
                  borderRadius: 100 / 2,
                  backgroundColor: 'grey',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={this._onMuteButtonPress}>
                <Image
                  source={
                    this.state.isAudioEnabled ? MUTED_ICON : UN_MUTED_ICON
                  }
                  style={{
                    tintColor: WHITE,
                    resizeMode: 'contain',
                    width: 40,
                    height: 40,
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  display: this.state.isButtonDisplay ? 'flex' : 'none',
                  width: 60,
                  height: 60,
                  marginLeft: 10,
                  marginRight: 10,
                  borderRadius: 30,
                  backgroundColor: RED,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={this._onEndButtonPress}>
                <Image source={END_CALL} style={{tintColor: WHITE}} />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  display: this.state.isButtonDisplay ? 'flex' : 'none',
                  width: 60,
                  height: 60,
                  marginLeft: 10,
                  marginRight: 10,
                  borderRadius: 100 / 2,
                  backgroundColor: 'grey',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={this._onFlipButtonPress}>
                <Image source={ROTATE_CAMERA} style={{tintColor: WHITE}} />
              </TouchableOpacity>
            </View>
          </View>
        )}
        <TwilioVideo
          ref="twilioVideo"
          onRoomDidConnect={this._onRoomDidConnect}
          onRoomDidDisconnect={this._onRoomDidDisconnect}
          onRoomDidFailToConnect={this._onRoomDidFailToConnect}
          onParticipantAddedVideoTrack={this._onParticipantAddedVideoTrack}
          onParticipantRemovedVideoTrack={this._onParticipantRemovedVideoTrack}
        />
        {this.state.loading && <LoaderIndicator loading={this.state.loading} />}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  callContainer: {
    flex: 1,
    position: 'absolute',
    bottom: 0,
    top: 0,
    left: 0,
    right: 0,
    minHeight: '100%',
  },
  welcome: {
    fontSize: 30,
    textAlign: 'center',
    paddingTop: 40,
  },
  input: {
    height: 50,
    borderWidth: 1,
    marginRight: 70,
    marginLeft: 70,
    marginTop: 50,
    textAlign: 'center',
    backgroundColor: 'white',
  },
  button: {
    marginTop: 100,
  },
  localVideoOnButtonEnabled: {
    bottom: '40%',
    width: '35%',
    left: '64%',
    height: '25%',
    zIndex: 2,
  },
  localVideoOnButtonDisabled: {
    bottom: '30%',
    width: '35%',
    left: '64%',
    height: '25%',
    zIndex: 2,
  },
  remoteGrid: {
    flex: 1,
    flexDirection: 'column',
  },
  remoteVideo: {
    width: wp('100%'),
    height: hp('100%'),
    zIndex: 1,
  },
  optionsContainer: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    right: 0,
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    zIndex: 2,
  },
  optionButton: {
    width: 60,
    height: 60,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 100 / 2,
    backgroundColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
  },
  spacing: {
    padding: 10,
  },
  inputLabel: {
    fontSize: 18,
  },
  buttonContainer: {
    height: normalize(45),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: wp('90%'),
    borderRadius: 30,
  },
  loginButton: {
    backgroundColor: '#1E3378',
    width: wp('90%'),
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
    marginTop: 10,
  },
  Buttontext: {
    color: 'white',
    fontWeight: '500',
    fontSize: 18,
  },
  inputBox: {
    borderBottomColor: '#cccccc',
    fontSize: 16,
    width: wp('95%'),
    borderBottomWidth: 1,
  },
});
