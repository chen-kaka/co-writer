
import React from 'react';
import {
  StyleSheet,
  Image,
  Text,
  Linking,
  View
} from 'react-native';

import DeviceInfo from 'react-native-device-info';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';
import Button from '../components/Button';

const REPO = 'https://github.com/chen-kaka/myprojs/tree/master/cowriter/cowriter';

const aboutLogo = require('../img/about_logo.png');

class About extends React.Component {
  componentDidMount() {
    Actions.refresh({ renderRightButton: this.renderRightButton.bind(this) });
  }

  onPress(url) {
    Linking.openURL(url);
  }

  renderRightButton() {
    return (
      <Icon.Button
        name="logo-github"
        backgroundColor="transparent"
        underlayColor="transparent"
        activeOpacity={0.8}
        onPress={() => this.onPress(REPO)}
      />
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.center}>
            <Image
              style={styles.logo}
              source={aboutLogo}
            />
            <Text style={styles.title}>
              co-writer
            </Text>
            <Text style={styles.subtitle}>
              协作, 创造一个美好世界
            </Text>
          </View>
          <View style={styles.bottomContainer}>
            <View style={styles.disclaimerContent}>
              <Text style={[styles.disclaimer, { color: '#999999' }]}>
                免责声明：所有内容均来自用户生成。
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingBottom: 10
  },
  center: {
    flex: 1,
    alignItems: 'center'
  },
  logo: {
    width: 110,
    height: 110,
    marginTop: 50
  },
  version: {
    fontSize: 16,
    textAlign: 'center',
    color: '#aaaaaa',
    marginTop: 5
  },
  title: {
    fontSize: 28,
    textAlign: 'center',
    color: '#313131',
    marginTop: 10
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    color: '#4e4e4e'
  },
  disclaimerContent: {
    flexDirection: 'column'
  },
  disclaimer: {
    fontSize: 14,
    textAlign: 'center'
  },
  bottomContainer: {
    alignItems: 'center'
  }
});

export default About;
