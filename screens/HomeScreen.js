import React from 'react'
import {
  Image,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import {WebBrowser} from 'expo'

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
        </SafeAreaView>
        <View style={styles.accentView} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  accentView: {
    backgroundColor: '#51516a',
    height: '100%',
    marginTop: 250,
  },
  container: {
    backgroundColor: '#877fa0',
    paddingTop: 30,
  },
  contentContainer: {
    position: 'absolute',
    height: '100%',
    flex: 1,
    width: '100%',
    zIndex: 100,
  },
  daddyImage: {
    height: 150,
    marginTop: 150,
    resizeMode: 'contain',
    width: '100%',
  },
})
