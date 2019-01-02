import React from 'react'
import {Image, SafeAreaView, StyleSheet, View} from 'react-native'
import Timer from '../components/Timer'
import Colors from '../constants/Colors'

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  }

  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.contentContainer}>
          <Image
            source={require('../assets/images/daddy.png')}
            style={styles.daddyImage}
          />
          <View style={styles.timerControls}>
            <Timer />
          </View>
        </SafeAreaView>
        <View style={styles.accentView} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  accentView: {
    backgroundColor: Colors.accents.purple,
    height: '100%',
    marginTop: 250,
  },
  container: {
    backgroundColor: Colors.muted.purple,
    flex: 1,
  },
  contentContainer: {
    position: 'absolute',
    height: '100%',
    flex: 1,
    width: '100%',
    zIndex: 100,
  },
  daddyImage: {
    height: 160,
    marginTop: 115,
    resizeMode: 'contain',
    width: '100%',
  },
  timerControls: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    paddingBottom: 50,
    width: '100%',
  },
})
