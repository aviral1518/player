import React from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';
import LinearGradient from "react-native-linear-gradient";
import AppText from "../components/AppText";
import Layout from "../constants/Layout";
import theme, { lightTheme, darkTheme } from "../constants/Theme";
import FontSize from "../constants/FontSize";
import Video from 'react-native-video'; 


const { width } = Dimensions.get('window');

export default class VideoPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullscreen: false,
    };
  }

  render = () => {
    const {fullscreen} = this.state;
    const { theme } = this.props;
    const colors = theme === "LIGHT" ? lightTheme : darkTheme;
    const styles = getStyles(colors);
    return (
      <View style={styles.container}>
          <ScrollView style={{ flex: 1, backgroundColor: "white", }}>
        <LinearGradient
          colors={[colors.gradient.start, colors.gradient.end]}
          style={styles.headerContainer}
        >
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => this.props.navigation.openDrawer()}
              style={styles.headerIconContainer}
            >
              <Image
                source={require("../assets/img/menu.png")}
                style={styles.headerIcon}
              />
            </TouchableOpacity>
            <AppText style={styles.screenTitle}>Nature Videos</AppText>
          </View>
        </LinearGradient>
        <View style={fullscreen ? styles.fullscreenVideo : styles.video}>
          <Video
            fullscreen={fullscreen}
            ref={ref => this.video = ref}
            source={{uri:'https://media.istockphoto.com/videos/riverbed-in-the-grand-canyon-usa-video-id1180176895'}}
            style={{ ...StyleSheet.absoluteFill }}
            resizeMode='cover'
            muted
            repeat
          />
        </View>

        <View style={fullscreen ? styles.fullscreenVideo : styles.video}>
          <Video
            fullscreen={fullscreen}
            ref={ref => this.video = ref}
            source={{uri:'https://media.istockphoto.com/videos/aerial-fly-over-view-of-the-suns-rays-streaming-over-the-tree-tops-video-id1188792725'}}
            style={{ ...StyleSheet.absoluteFill }}
            resizeMode='cover'
            muted
            repeat
          />

        </View>

        <View style={fullscreen ? styles.fullscreenVideo : styles.video}>
          <Video
            fullscreen={fullscreen}
            ref={ref => this.video = ref}
            source={{uri:'https://media.istockphoto.com/videos/calm-surface-of-a-lake-in-the-forest-reflecting-the-beautiful-mount-video-id864526000'}}
            style={{ ...StyleSheet.absoluteFill }}
            resizeMode='cover'
            muted
            repeat
          />
          
        </View>

        <View style={fullscreen ? styles.fullscreenVideo : styles.video}>
          <Video
            fullscreen={fullscreen}
            ref={ref => this.video = ref}
            source={{uri:'https://dm0qx8t0i9gc9.cloudfront.net/watermarks/video/GTYSdDW/agriculture-sunset-slow-motion_rnvd4jr__5137c394c1e4a0f5b4540f5ccd63d8f5__P360.mp4'}}
            style={{ ...StyleSheet.absoluteFill }}
            resizeMode='cover'
            muted
            repeat
          />
          
        </View>

        <View style={fullscreen ? styles.fullscreenVideo : styles.video}>
          <Video
            fullscreen={fullscreen}
            ref={ref => this.video = ref}
            source={{uri:'https://dm0qx8t0i9gc9.cloudfront.net/watermarks/video/GTYSdDW/sun-rays-sunbeam-trees-silhouette-background-beaming-light-nature-fantasy_r4libwpr__17394f1b4d372bc36998b54dbbbd1be1__P360.mp4'}}
            style={{ ...StyleSheet.absoluteFill }}
            resizeMode='cover'
            muted
            repeat
          />
          
        </View>

        <View style={fullscreen ? styles.fullscreenVideo : styles.video}>
          <Video
            fullscreen={fullscreen}
            ref={ref => this.video = ref}
            source={{uri:'https://dm0qx8t0i9gc9.cloudfront.net/watermarks/video/GTYSdDW/lovatnet-lake-beautiful-nature-norway_rv-0czoz4l__9a342dad7f633464c8058f2f924e93a0__P360.mp4'}}
            style={{ ...StyleSheet.absoluteFill }}
            resizeMode='cover'
            muted
            repeat
          />
        </View>
        </ScrollView>
      </View>
    );
  }
}

const getStyles = (colors) => ({
  container: {
    flex: 1,
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
  video: { width, height: width * .6, backgroundColor: 'black' },
  fullscreenVideo: {
    backgroundColor: 'black',
    ...StyleSheet.absoluteFill,
    elevation: 1,
  },
});