/**
 * Created by kakachan on 16/12/12.
 */

import React, {Component} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Platform,
    Image,
    TouchableHighlight
} from 'react-native';


import NavigationBar from 'react-native-navbar';
import ModalPicker from './react-native-modal-picker';

const IconImgConf = {
  index : require('../img/add48.png')
};


export default class NaviComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render() {
        let style = {
            paddingTop: 0,
            height: Platform.OS === 'android' ? 48 : 44
        }
        return (
            <NavigationBar
                style={[styles.navbar, style]}
                tintColor={'#f7f7f8'}
                leftButton={this._leftButton()}
                rightButton={this._rightButton()}
                title={this._title()}
            />
        )
    }

    _leftButton() {
        switch (this.props.route.id) {
            case 'index':
                return (<View></View>)
            case 'tweet':
                return _renderBarButton('Cancel', () => this.props.navigator.pop(), false, {
                    width: 50,
                    marginLeft: 10
                })
            default:
                return _renderBarButton('uniE617', () => this.props.navigator.pop(), true)
        }
    }

    _rightButton() {
        switch (this.props.route.id) {
            case 'index':
                return _renderBarButton('index', this._renderModalChange.bind(this), true, {
                    width: 50
                });
            case 'newRepo':
                return _renderBarButton('newRepo', this.props.route.createRepo, true, {
                    width: 50
                });
            default:
                break
        }
    }

    _title() {
        return (
            <View style={styles.title}>
                <Text style={styles.titleText}>{this.props.route.title ? this.props.route.title : 'CoWriter'}</Text>
            </View>
        )
    }

    _renderModalChange(option) {
        let title = '';
        let naviId = '';
        switch(option.label){
            case 'Repository':
                naviId = 'newRepo';
                break;
            case 'Group':
                naviId = 'newGroup';
                break;
            default:
                break;
        }

        this.props.navigator.push({
            title: title,
            id: naviId
        })
    }
}

function _renderBarButton(text, handler, icon = false, buttonStyle = {}, buttonTextStyle = {}) {
    switch (text) {
        case 'index':  //首页按钮
            let index = 0;
            const data = [
                { key: index++, section: true, label: 'New Repo' },
                { key: index++, label: 'Repository' },
                { key: index++, label: 'Group' }
            ];
            return (
                <View style={[styles.button, buttonStyle]}>
                    <ModalPicker
                        data={data}
                        onChange={handler} />
                </View>
            )
        case 'newRepo':  //发布页按钮
            return (
                <TouchableHighlight activeOpacity={0.7} onPress={handler}>
                    <View>
                        <Text style={styles.naviText}>publish</Text>
                    </View>
                </TouchableHighlight>
            )
        default:
            break
    }
}

const styles = {
    navbar: {
        alignItems: 'center',
        borderColor: '#e1e1e1',
        borderBottomWidth: 1
    },
    title: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 5
    },
    titleText: {
        fontSize: 18
    },
    button: {
        width: 35,
        alignItems: 'center',
        justifyContent: 'center'
    },
    naviText: {
        fontSize: 16,
        color: '#333',
        alignItems: 'center',
        justifyContent: 'center',
        paddingRight:10
    },
    buttonText: {
        fontSize: 16,
        color: '#333'
    },
    buttonIconFontText: {
        fontSize: 26,
        fontFamily: 'iconfont'
    },
    imgStyle:{
        width:24,
        height:24
    }
}