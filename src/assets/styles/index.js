import { StyleSheet } from "react-native";
import { WHITE } from "../../utils/Colors";
import { scale } from "../../utils/scaling";

export default StyleSheet.create(
    {
        cardViewWhite: {
            flexDirection: 'column',
            borderRadius: 5,
            flex: 1,
            backgroundColor: WHITE,
            ...Platform.select({
                ios: {
                    shadowColor: 'rgba(0,0,0, 0.4)',
                    shadowOffset: { height: 1, width: 1 },
                    shadowOpacity: 0.7,
                    shadowRadius: 2,
                },
                android: {
                    elevation: 2,
                },
            }),
        },
        spaceBetweenRow: { width: '100%', justifyContent: 'space-between', flexDirection: 'row' },
        spaceBetweenColumn: { width: '100%', justifyContent: 'space-between', flexDirection: 'column' },
        fitImage: {
            borderRadius: 20,
        },
        fitImageWithSize: {
            height: scale(88),
            width: scale(101),
            borderRadius: 16,
        },
        cardView: {
            margin: 10,
            backgroundColor: WHITE,
            borderRadius: 6,
            ...Platform.select({
                ios: {
                    shadowColor: 'rgba(0,0,0, 0.4)',
                    shadowOffset: { height: 1, width: 1 },
                    shadowOpacity: 0.7,
                    shadowRadius: 2,
                },
                android: {
                    elevation: 2,
                },
            }),
        },
    },

)