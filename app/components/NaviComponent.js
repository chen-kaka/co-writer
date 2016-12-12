/**
 * Created by kakachan on 16/12/12.
 */

import React, {Component} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Platform,
    Image
} from 'react-native';


import NavigationBar from 'react-native-navbar';

const IconImgConf = {
  index : require('../img/add24.png')
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
                return _renderBarButton('index', () => {
                    this.props.navigator.push({
                        title: 'New Repo',
                        id: 'newRepo'
                    })
                }, true, {
                    width: 50
                })
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
}

function _renderBarButton(text, handler, icon = false, buttonStyle = {}, buttonTextStyle = {}) {
    let buttonText = [styles.buttonText, buttonTextStyle]
    let img = IconImgConf[text];
    return (
        <TouchableOpacity
            onPress={handler}
            style={[styles.button, buttonStyle]}>
            <Image source={img}/>
        </TouchableOpacity>
    )
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
    buttonText: {
        fontSize: 16,
        color: '#333'
    },
    buttonIconFontText: {
        fontSize: 26,
        fontFamily: 'iconfont'
    }
}