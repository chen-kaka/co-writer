/**
 * Created by kakachan on 16/12/9.
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image
} from 'react-native';

import TabNavigator from 'react-native-tab-navigator';
import styleUtils from '../utils/Styles';
import HomePage from '../pages/HomePage';

const tabIconImg = {
    Home: require('../img/home.png'),
    Repository: require('../img/disk.png'),
    Me: require('../img/me.png'),
    HomeSelected: require('../img/home_light.png'),
    RepositorySelected: require('../img/disk_light.png'),
    MeSelected: require('../img/me_light.png')
};

export default class TabComponent extends Component {
    constructor(props){
        super(props);

        this.state = {
            selectedTab : 'Home'
        };
    }
    
    render(){
        return(
            <TabNavigator hidesTabTouch={true} sceneStyle={styles.sceneStyle}>
                {this._renderTabItem('Home', <HomePage navigator={this.props.navigator}></HomePage>)}
                {this._renderTabItem('Repository', <View></View>)}
                {this._renderTabItem('Me', <View></View>)}
            </TabNavigator>
        )
    }

    _renderTabItem(tag, childView) {
        return (
            <TabNavigator.Item
                title={tag}
                titleStyle={styles.titleStyle}
                selectedTitleStyle={styles.selectedTitleStyle}
                renderIcon={() => this._renderTabItemIcon(tag)}
                renderSelectedIcon={() => this._renderTabItemIcon(tag, true)}
                selected={this.state.selectedTab === tag}
                onPress={() => this.setState({ selectedTab: tag })}>
                {childView}
            </TabNavigator.Item>
        )
    }

    _renderTabItemIcon(tag, selected = false) {
        tag = selected ? tag + 'Selected' : tag;
        let img = tabIconImg[tag];
        return (
        <Image source={img}/>
        )
    }
}

const styles = StyleSheet.create({
    sceneStyle: {
        ...styleUtils.containerBg
    },
    titleStyle: {
        color: '#929292',
        fontSize: 12,
        marginTop: -2
    },
    selectedTitleStyle: {
        color: '#ff9630'
    },
    tabIcon: {
        fontSize: 28,
        color: '#929292',
        fontFamily: 'iconfont'
    },
    selectedTabIcon: {
        color: '#ff9630'
    },
    tabImg: {
        color: '#929292'
    },
    selectedTabImg: {
        color: '#ff9630'
    }
})