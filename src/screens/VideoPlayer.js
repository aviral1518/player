import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  TouchableNativeFeedback
} from 'react-native';
import LinearGradient from "react-native-linear-gradient";
import AppText from "../components/AppText";
import Layout from "../constants/Layout";
import theme, { lightTheme, darkTheme } from "../constants/Theme";
import FontSize from "../constants/FontSize";
import Slider from '@react-native-community/slider';
import Video from 'react-native-video'; /// alreadyimported this
import Icon from 'react-native-vector-icons/FontAwesome5'; // and this
import Orientation from 'react-native-orientation';
import ImagePicker from "react-native-image-picker";

const { width } = Dimensions.get('window');

export default class VideoPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTime: 0,
      duration: 0.1,
      paused: false,
      overlay: false,
      fullscreen: false,
      videoSource: ''
    };
  }

  selectVideo = () => {
    ImagePicker.showImagePicker({
      title: 'Select video',
      mediaType: 'video',
      path: 'video',
      quality: 1
    }, (response) => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };
        this.setState({ videoSource: source })
      }
    });
  }

  lastTap = null;
  handleDoubleTap = (doubleTapCallback, singleTapCallback) => {
    const now = Date.now();
    const DOUBLE_PRESS_DELAY = 300;
    if (this.lastTap && (now - this.lastTap) < DOUBLE_PRESS_DELAY) {
      clearTimeout(this.timer);
      doubleTapCallback();
    } else {
      this.lastTap = now;
      this.timer = setTimeout(() => {
        singleTapCallback();
      }, DOUBLE_PRESS_DELAY);
    }
  }

  getTime = t => {
    const digit = n => n < 10 ? `0${n}` : `${n}`;
    // const t = Math.round(time);
    const sec = digit(Math.floor(t % 60));
    const min = digit(Math.floor((t / 60) % 60));
    const hr = digit(Math.floor((t / 3600) % 60));
    return hr + ':' + min + ':' + sec; // this will convert sec to timer string
    // 33 -> 00:00:33
    // this is done here
    // ok now the theme is good to look
  }

  load = ({ duration }) => this.setState({ duration }) // now here the duration is update on load video
  progress = ({ currentTime }) => this.setState({ currentTime }) // here the current time is upated

  backward = () => {
    this.video.seek(this.state.currentTime - 5);
    clearTimeout(this.overlayTimer);
    this.overlayTimer = setTimeout(() => this.setState({ overlay: false }), 3000);
  }
  forward = () => {
    this.video.seek(this.state.currentTime + 5); // here the video is seek to 5 sec forward
    clearTimeout(this.overlayTimer);
    this.overlayTimer = setTimeout(() => this.setState({ overlay: false }), 3000);
  }

  onslide = slide => {
    this.video.seek(slide * this.state.duration); // here the upation is maked for video seeking
    clearTimeout(this.overlayTimer);
    this.overlayTimer = setTimeout(() => this.setState({ overlay: false }), 3000);
  }

  youtubeSeekLeft = () => {
    const { currentTime } = this.state;
    this.handleDoubleTap(() => {
      this.video.seek(currentTime - 5);
    }, () => {
      this.setState({ overlay: true });
      this.overlayTimer = setTimeout(() => this.setState({ overlay: false }), 3000);
    })
  }
  youtubeSeekRight = () => {
    const { currentTime } = this.state;
    this.handleDoubleTap(() => { // this fn is used to detect the double tap first callback
      this.video.seek(currentTime + 5);
    }, () => {
      this.setState({ overlay: true });
      this.overlayTimer = setTimeout(() => this.setState({ overlay: false }), 3000);
    })
  }

  fullscreen = () => {
    const { fullscreen } = this.state;
    if (fullscreen) {
      Orientation.lockToPortrait();
    } else {
      Orientation.lockToLandscape();
    }
    this.setState({ fullscreen: !fullscreen });
  }

  render = () => {
    const { currentTime, duration, paused, overlay, fullscreen, videoSource } = this.state;
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
              onPress={() => this.props.navigation.openDrawer()}
              style={styles.headerIconContainer}
            >
              <Image
                source={require("../assets/img/menu.png")}
                style={styles.headerIcon}
              />
            </TouchableOpacity>
            <AppText style={styles.screenTitle}>Video Player</AppText>
          </View>
        </LinearGradient>
        <View style={fullscreen ? styles.fullscreenVideo : styles.video}>
          <Video
            fullscreen={fullscreen}
            paused={paused} // this will manage the pause and play
            ref={ref => this.video = ref}
            source={videoSource}
            style={{ ...StyleSheet.absoluteFill }}
            resizeMode='cover'
            onLoad={this.load}
            onProgress={this.progress}
          // onVideoEnd={this.onEndVideo}
          />

          <View style={styles.overlay}>
            {/* now we can remove this not */}
            {overlay ? <View style={{ ...styles.overlaySet, backgroundColor: '#0006' }}>
              <Icon name='backward' style={styles.icon} onPress={this.backward} />
              <Icon name={paused ? 'play' : 'pause'} style={styles.icon} onPress={() => this.setState({ paused: !paused })} />
              <Icon name='forward' style={styles.icon} onPress={this.forward} />
              <View style={styles.sliderCont}>
                <View style={styles.timer}>
                  <Text style={{ color: 'white' }}>{this.getTime(currentTime)}</Text>
                  <Text style={{ color: 'white' }}>{this.getTime(duration)}   <Icon onPress={this.fullscreen} name={fullscreen ? 'compress' : 'expand'} style={{ fontSize: 35 }} /></Text>
                </View>
                <Slider
                  // we want to add some param here
                  maximumTrackTintColor='white'
                  minimumTrackTintColor='white'
                  thumbTintColor='white' // now the slider and the time will work
                  value={currentTime / duration} // slier input is 0 - 1 only so we want to convert sec to 0 - 1
                  onValueChange={this.onslide}
                />
              </View>
            </View> : <View style={styles.overlaySet}>
                <TouchableNativeFeedback onPress={this.youtubeSeekLeft}><View style={{ flex: 1 }} /></TouchableNativeFeedback>
                <TouchableNativeFeedback onPress={this.youtubeSeekRight}><View style={{ flex: 1 }} /></TouchableNativeFeedback>
              </View>}
          </View>
        </View>
        <View style={styles.buttonsContainer}>
          <LinearGradient
            colors={[colors.gradient.start, colors.gradient.end]}
            style={[styles.buttonContainer, styles.cartButton]}
          >
            <TouchableOpacity
              style={styles.buttonResponser}
              onPress={() => this.selectVideo()}
            >
              <AppText style={styles.buttonLabel}>Select Video to Play</AppText>
            </TouchableOpacity>
          </LinearGradient>
        </View>
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
  overlay: {
    ...StyleSheet.absoluteFillObject
  },
  overlaySet: {
    flex: 1,
    flexDirection: 'row'
  },
  icon: {
    color: 'white',
    flex: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 25
  },
  sliderCont: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0
  },
  timer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5
  },
  video: { width, height: width * .6, backgroundColor: 'black' },
  fullscreenVideo: {
    backgroundColor: 'black',
    ...StyleSheet.absoluteFill,
    elevation: 1
  },
  buttonsContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 30
  },
  buttonContainer: {
    flex: 1,
    height: 35 * Layout.ratio,
    borderRadius: 35 / 2 * Layout.ratio,
  },
  cartButton: {
    marginRight: 14 * Layout.ratio,
  },
  buttonResponser: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonLabel: {
    fontSize: FontSize[14],
    fontWeight: "bold",
    color: colors.primaryTint,
  },
});
