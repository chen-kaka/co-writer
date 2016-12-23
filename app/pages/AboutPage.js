/**
 * Created by kakachan on 16/12/23.
 */

import React, {
    Component
} from 'react'

import {
    StyleSheet,
    View,
    Text,
    Image
} from 'react-native'

import styleUtils from '../utils/Styles'
import NaviComponent from '../components/NaviComponent'

export default class AboutView extends Component{
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <View style={[styles.container, styleUtils.containerShadow]}>
                <NaviComponent route={this.props.route} navigator={this.props.navigator}/>
                <View style={styles.textContainer}>
                    <View style={styles.logoView}>
                        <Image style={styles.logo} source={require('../img/about_logo.jpg')} />
                    </View>
                    <View style={styles.appNameView}>
                        <Text style={styles.appNameText}>CoWriter</Text>
                    </View>
                    <View style={styles.infoView}>
                        <Text style={styles.infoText}>GitHub: chen-kaka</Text>
                        <Text style={styles.infoText}>QQ: 632693486</Text>
                        <Text style={styles.infoText}>Email: chen-kaka@163.com</Text>
                    </View>
                    <View style={styles.copyrightView}>
                        <Text style={styles.copyrightText}>Copyright © 2016 ~   kakachan</Text>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1
    },
    textContainer: {
        ...styleUtils.containerBg,
        flexGrow: 1,
        alignItems: 'center',
        paddingTop: 35
    },
    logoView: {
        width: 90,
        height: 90,
        borderColor: '#dfdfdf',
        backgroundColor: 'white',
        borderRadius: 5,
        borderWidth: 1,
        justifyContent: 'center'
    },
    logo: {
        width: 75,
        height: 75,
        alignSelf: 'center'
    },
    appNameView: {
        marginTop: 15,
    },
    appNameText: {
        fontSize: 20,
        color: '#666'
    },
    infoView: {
        marginTop: 30
    },
    infoText: {
        marginTop: 20,
        color: '#666'
    },
    copyrightView: {
        position: 'absolute',
        bottom: 25,
        left: 0,
        right: 0
    },
    copyrightText: {
        color: '#666',
        alignSelf: 'center'
    }
})