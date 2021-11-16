/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Modal, Text, View } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { BLACK, GRAY_200, WHITE } from '../utils/Colors';
import DocumentPicker from 'react-native-document-picker';
import RNFetchBlob from 'rn-fetch-blob'

export default function ImagePicker(props) {
    const { dialogVisible, setDialogVisible, selectedImagePath } = props;

    const cameraLaunch = () => {
        let options = {
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
            maxWidth: 400,
            maxHeight: 400,
        };
        launchCamera(options, res => {
            if (res.didCancel) {
                console.log('User cancelled image picker');
            } else if (res.error) {
                console.log('ImagePicker Error: ', res.error);
            } else if (res.customButton) {
                console.log('User tapped ');
            } else {
                const source = res?.uri;
                selectedImagePath(source);
                setDialogVisible(false);
            }
        });
    };
    const imageGalleryLaunch = () => {
        let options = {
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
            maxWidth: 400,
            maxHeight: 400,
        };

        launchImageLibrary(options, res => {
            console.log(res,'User   image picker');

            if (res.didCancel) {
                console.log('User cancelled image picker');
            } else if (res.error) {
                console.log('ImagePicker Error: ', res.error);
            } else if (res.customButton) {
                console.log('User tapped custom button: ', res.customButton);
            } else {
                const source = res?.uri;
                selectedImagePath(source);
                setDialogVisible(false);
            }
        });
    };

    // const onUploadDocumentPress = async () => {
    //     try {
    //         const res = await DocumentPicker.pick({
    //             // type: [DocumentPicker.types.pdf],
    //             // type: [DocumentPicker.types.images],
    //             // type: [DocumentPicker.types.docx],
    //         });

    //         console.log('picked document is: ', res); selectedImagePath

    //         const source = res && res.length > 0 && res[0].uri;

    //         RNFetchBlob.fs
    //             .stat(source)
    //             .then((stats) => {
    //                 console.log(stats, 'rn fetch blob>>>>');
    //                 //output: /storage/emulated/0/WhatsApp/Media/WhatsApp Images/IMG-20200831-WA0019.jpg
    //                 selectedImagePath(`file://${stats && stats.path}`);

    //             }).catch((err) => {
    //                 console.log(err);
    //             });
    //         setDialogVisible(false);

    //     } catch (error) {
    //         console.log('document picker error: ', error);
    //         if (DocumentPicker.isCancel(error)) {
    //             // User cancelled the picker, exit any dialogs or menus and move on
    //         }
    //     }
    // };

    return (
        <Modal
            visible={dialogVisible}
            transparent={true}
            animationType={'fade'}
            onRequestClose={() => {
                setDialogVisible(!dialogVisible);
            }}>
            <View
                style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    flex: 1,
                    backgroundColor: 'rgba(52, 52, 52, 0.6)',
                }}>
                <View
                    style={{
                        backgroundColor: WHITE,
                        width: '80%',
                        alignItems: 'center',
                        borderRadius: 6,
                        elevation: 4,
                        flexDirection: 'column',
                    }}>
                    <Text
                        style={{
                            color: BLACK,
                            fontSize: 18,
                            textAlign: 'center',
                            paddingVertical: 20,
                            marginTop: 10,
                        }}
                        onPress={() => cameraLaunch()}>
                        Take Photo
                    </Text>

                    <View
                        style={{
                            height: 1,
                            backgroundColor: GRAY_200,
                            width: '100%',
                        }}
                    />

                    <Text
                        style={{
                            color: BLACK,
                            fontSize: 18,
                            textAlign: 'center',
                            paddingVertical: 10,
                            marginTop: 10,
                            fontFamily: 'Raleway-Bold',
                        }}
                        onPress={() => imageGalleryLaunch()}

                    >
                        Choose From Files
                    </Text>

                    <View
                        style={{
                            height: 1,
                            marginTop: 20,
                            backgroundColor: GRAY_200,
                            width: '100%',
                        }}
                    />

                    <View
                        style={{
                            flexDirection: 'row',
                            backgroundColor: GRAY_200,
                            borderBottomStartRadius: 6,
                            borderBottomEndRadius: 6,
                        }}>
                        <Text
                            style={{
                                color: BLACK,
                                fontSize: 18,
                                padding: 10,
                                fontFamily: 'Raleway-Sembold',
                                textAlign: 'center',
                                flex: 1,
                            }}
                            onPress={() => {
                                setDialogVisible(false);
                            }}>
                            Cancel
                        </Text>
                    </View>
                </View>
            </View>
        </Modal>
    );
}
