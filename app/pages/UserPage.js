/**
 * Created by kakachan on 16/12/12.
 */
import React, {Component} from 'react';
import {
    View,
    ActivityIndicatorIOS,
    Text,
    StyleSheet,
    ScrollView,
    TouchableHighlight,
    Image,
    TouchableOpacity,
    ListView,
    Navigator
} from 'react-native';
import {ajax} from '../utils/Network';
import Icon from 'react-native-vector-icons/Ionicons';
const Colors = require('../utils/Colors');

const ICON_SIZE = 18;

export default class UserPage extends Component{
    constructor(props){
        super(props);

        this.state = {
            user : {},
            userLoaded : false
        }

        ajax({
            url: 'app/user/user_info/info'
        }).then(res => {
            try{
            if(!res.err_code) {
                this.setState({
                    user: res.data,
                    userLoaded: true
                })
            }
            }catch(err){
                alert("err: " + err);
            }

        })
    }

    render(){
        let userEmail;
        let userSummary;
        let userJoined;
        if(this.state.user) {
            if (this.state.user.email) {
                userEmail = (
                    <View style={styles.iconTextContainer}>
                        <Text
                            style={styles.profileInfoEmailAndSite}
                        >{this.state.user.email}</Text>
                    </View>
                )
            }
            if (this.state.user.summary) {
                userSummary = (
                    <View style={styles.iconTextContainer}>
                        <Text
                            style={styles.profileInfoEmailAndSite}
                        >{this.state.user.summary}</Text>
                    </View>
                )
            }

            if (this.state.user.create_at) {
                const date = new Date(this.state.user.create_at * 1000).toISOString().slice(0, 10);
                const joined = 'Joined Date: ' + date;
                userJoined = (
                    <View style={styles.iconTextContainer}>
                        <Text style={styles.profileInfoLocation}>{joined}</Text>
                    </View>
                )
            }
        }

        let user = this.state.user;
        let userAvatar = user ? user.avatar : 'http://img5.duitang.com/uploads/item/201408/02/20140802211120_t34dW.thumb.224_0.jpeg';
        let username = user ? user.username : 'unknown';
        let nickname = user ? user.nickname : 'unknown';
        return (
            <View>
                <View style={styles.profile}>
                    <Image style={styles.profileImage} source={{uri: userAvatar}}/>
                    <View style={styles.profileInfo}>
                        <Text style={styles.profileInfoName}>{username}</Text>
                        <Text style={styles.profileInfoNickName}>{nickname}</Text>
                        {userJoined}
                        {userEmail}
                        {userSummary}
                    </View>
                </View>
            </View>
        )
    }
}

var styles = StyleSheet.create({
    icon: {
        width: ICON_SIZE,
        height: ICON_SIZE,
        marginRight: 3,
    },
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    scvContainerStyle: {
        justifyContent: 'flex-start',
        flexDirection: 'column',
        flex: 1,
    },
    iconTextContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 2,
        // paddingRight: 100,
        width:220,
    },
    profile: {
        padding: 15,
        flexDirection: 'row',
        alignSelf: 'stretch',
        paddingBottom: 0,
    },
    profileImage: {
        width: 110,
        height: 110,
        backgroundColor: '#f0f',
        borderRadius: 3,
    },
    profileInfo: {
        alignSelf: 'stretch',
        flexDirection: 'column',
        marginLeft: 15,
        justifyContent: 'space-between',
        paddingBottom: 5,
    },
    profileInfoName: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 15,
        marginBottom: 3,
    },
    profileInfoNickName: {
        color: 'gray',
        fontSize: 12,
        marginBottom: 10,
    },
    profileInfoLocation: {
        color: 'black',
        fontSize: 12,
    },
    profileInfoEmailAndSite: {
        color: Colors.blue,
        fontSize: 12,
    },
    orgnizations: {
        flexDirection: 'row',
        alignSelf: 'stretch',
        flexWrap: 'wrap',
        padding: 15,
        borderBottomWidth: 1,
        borderColor: 'rgba(0,0,0,0.1)',
        paddingLeft: 20,
        paddingBottom: 10,
        paddingTop: 10,
    },
    orgnizationsText: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 16,
        marginLeft: 15,
    },
    orgnizationsImage: {
        width: 30,
        height: 30,
        marginLeft: 3,
        borderRadius: 2,
        marginBottom: 2,
        backgroundColor: '#f0f',
    },
    status: {
        flexDirection: 'column',
        padding: 15,
        borderBottomWidth: 1,
        borderColor: 'rgba(0,0,0,0.1)',
        paddingBottom: 10,
        paddingTop: 10,
    },
    statusFollowButton: {
        alignSelf: 'stretch',
        backgroundColor: '#5ca941',
        height: 40,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 3,
    },
    statusFollowButtonText: {
        color: 'white',
    },
    statusInfo: {
        flexDirection: 'row',
        padding: 15,
        justifyContent: 'space-between',
        paddingBottom: 0,
    },
    statusInfoTouch: {
        flexDirection: 'column',
        alignItems: 'center',
        alignSelf: 'stretch',
    },
    statusInfoTouchNum: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 17,
    },
    statusInfoTouchDes: {
        color: 'gray',
        fontSize: 13,
        fontWeight: 'normal'
    },

});