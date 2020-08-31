import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import LinearGradient from "react-native-linear-gradient";
import AppText from "../../components/AppText";
import Layout from "../../constants/Layout";
import theme, { lightTheme, darkTheme } from "../../constants/Theme";
import FontSize from "../../constants/FontSize";

const { width } = Dimensions.get('window');

export default class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        };
      }
    
    render = () => {
        const { theme } = this.props;
        const colors = theme === "LIGHT" ? lightTheme : darkTheme;
        const styles = getStyles(colors);
        return (
            <View style={styles.container}>
                <LinearGradient
                    colors={[colors.gradient.start, colors.gradient.end]}
                    style={styles.headerContainer}
                >
                    <View style={styles.header}>
                        <TouchableOpacity
                            style={styles.headerIconContainer}
                        >
                            <Image
                                source={require("../../assets/img/menu.png")}
                                style={styles.headerIcon}
                            />
                        </TouchableOpacity>
                        <AppText style={styles.screenTitle}>Music Player</AppText>
                    </View>
                </LinearGradient>
            </View>
        );
    }
}

const getStyles = (colors) => ({
    container: {
        flex: 1
    },
    headerContainer: {
        justifyContent: "flex-start",
        height: 90 * Layout.ratio,
        paddingHorizontal: 20,
        paddingTop: Layout.statusBarHeight,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        height: 30 * Layout.ratio,
        marginTop: 20 * Layout.ratio,
    },
    headerIconContainer: {
        height: 26 * Layout.ratio,
        width: 26 * Layout.ratio,
        justifyContent: "center",
        alignItems: "center",
    },
    headerIcon: {
        height: 26 * Layout.ratio,
        width: 26 * Layout.ratio,
        resizeMode: "contain",
    },
    screenTitle: {
        fontSize: FontSize[30],
        fontWeight: "bold",
        color: colors.primaryTint,
        marginLeft: 16 * Layout.ratio,
        marginTop: -4,
    },
});
