
import React, { Component } from 'react';
import {
  StyleSheet,
  Navigator,
  View
} from 'react-native';
import About from '../pages/About';
import TabIcon from '../components/TabIcon';
import IndexPage from '../pages/IndexPage';
import NewRepoComponent from '../pages/NewRepoPage';
import NewGroupComponent from '../pages/NewGroupPage';
import RepoDetail from '../pages/RepoDetail';
import {connect} from 'react-redux';
import {
  Router,
  Scene,
  ActionConst
} from 'react-native-router-flux';

const RouterWithRedux = connect()(Router);

const getSceneStyle = (props, computedProps) => {
  const style = {
    flex: 1,
    backgroundColor: '#fff',
    shadowColor: null,
    shadowOffset: null,
    shadowOpacity: null,
    shadowRadius: null,
  };
  // if (computedProps.isActive) {
  //   style.marginTop = computedProps.hideNavBar ?
  //     0 : Navigator.NavigationBar.Styles.General.TotalNavHeight;
  //   style.marginBottom = computedProps.hideTabBar ? 0 : 50;
  // }
  return style;
};

class App extends Component {
  componentDidMount(){

  }

  render() {
    return (
      // <RouterWithRedux
      //   getSceneStyle={getSceneStyle}
      //   navigationBarStyle={styles.navBar}
      //   titleStyle={styles.navBarTitle}
      // >
        <View style={styles.container}>
          <Navigator
              initialRoute={{name: 'indexView', index: 0, id: 'index'}}
              configureScene={this._configureScene}
              renderScene={this._renderScene}
          />
        </View>
     // </RouterWithRedux>
    );
  }

  _configureScene(route, routeStack){
    switch (route.id){
      case 'tweet':
      case 'webview':
      case 'photoBrowser':
        return Navigator.SceneConfigs.FloatFromBottom
      default:
        return Navigator.SceneConfigs.FloatFromRight
    }
  }

  _renderScene(route, navigator) {
    switch (route.id) {
      case 'index':  //首页
        return (
            <IndexPage navigator={navigator} route={route}/>
        )
      case 'newRepo':  //新建资源
        return (
            <NewRepoComponent navigator={navigator} route={route}/>
        )
      case 'newGroup':  //新建组
        return (
            <NewGroupComponent navigator={navigator} route={route}/>
        )
      case 'repoDetail': //资源详情
        return (
            <RepoDetail {...route.params} navigator={navigator} route={route}/>
        )
      default:
        break
    }
  }
}

export default App;


const styles = StyleSheet.create({
  navBar: {
    backgroundColor: '#3e9ce9'
  },
  navBarTitle: {
    color: '#fff',
    fontSize: 20,
  },
  container: {
    flexGrow: 1
  }
});
