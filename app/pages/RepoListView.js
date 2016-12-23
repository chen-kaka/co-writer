/**
 * Created by kakachan on 16/12/13.
 */


import React, {Component} from 'react';

import {
    StyleSheet,
    View,
    Image,
    TouchableHighlight,
    Platform,
    Text
} from 'react-native';

import GiftedListView from 'react-native-gifted-listview';
import styleUtils from '../utils/Styles';
import moment from 'moment';
import ParsedText from 'react-native-parsed-text';
import {ajax} from '../utils/Network';
const PropTypes = React.PropTypes;

const propTypes = {
    tabLabel: PropTypes.string
}

export default class RepoListView extends Component {
    constructor(props) {
        super(props);
        // alert(this.props.tabLabel);

        this.state = {

        }
    }

    render(){
        let color = Platform.OS === 'android' ? styleUtils.androidSpinnerColor : 'gray';
        return (
            <GiftedListView
                enableEmptySections={true}
                customStyles={customStyles}
                rowView={this._renderRowView.bind(this)}
                onFetch={this._onFetch.bind(this)}
                firstLoader={true}
                pagination={true}
                refreshable={true}
                withSections={false}
                spinnerColor={color}
            />
        )
    }

    _onFetch(page = 1, callback, options) {
        let query = {
            u_id : '58538dcc9822d109091c1d51'
        };
        let reqUrl;
        if(this.props.tabIndex == '0'){
            reqUrl = "app/resources/my_repos/list";
        }else if(this.props.tabIndex == '1'){
            reqUrl = "app/resources/share_repos/list";
        }else if(this.props.tabIndex == '2'){
            reqUrl = "app/resources/co_writes/list";
        }

        if(page === 1 && options.firstLoad) {
            ajax({
                url: reqUrl, query: query
            }).then(res => {
                if(!res.err_code) {
                    this.setState({
                        timeline: res.data,
                    })
                    callback(this.state.timeline)
                }
            })
        } else if(page === 1 && !options.firstLoad) {
            ajax({
                url: reqUrl
            }).then(res => {
                if(!res.err_code) {
                    let oldTimeline = this.state.timeline
                    this.setState({
                        timeline: res.data.concat(oldTimeline)
                    })
                    callback(this.state.timeline)
                }
            })
        } else {
            ajax({
                url: reqUrl
            }).then(res => {
                if(!res.err_code) {
                    callback(res.data, {
                        allLoaded: true
                    })
                }
            })
        }
    }

    _renderRowView(info) {
        let newText = info.text;
        if(info.text && info.text.length > 100){
            newText = info.text.substr(0, 100);
        }

        const createDateStr = moment(info.create_at).toISOString().slice(0, 10);
        const updateDateStr = moment(info.last_update).toISOString().slice(0, 10);

        return (
            <TouchableHighlight underlayColor='transparent' onPress={this._gotoDetails.bind(this, info)}>
                <View style={styles.tweetContainer}>
                    <View style={styles.topContainer}>
                        <Image source={{uri: info.avatar}} style={styles.avatar} />
                        <View>
                            <Text style={styles.name}>{info.name}</Text>
                            <Text style={styles.time}>{' Author:  ' + info.nickname} {'    ' + createDateStr} </Text>
                        </View>
                    </View>
                    <View style={styles.middleContainer}>
                        <ParsedText
                            parse={
                            [{type: 'url', style: customStyles.url, onPress: this._handleUrlPress.bind(this)}]}
                        >{newText}</ParsedText>
                    </View>
                    <View style={styles.repoBottom}>
                        <View>
                            <Text style={styles.time}>{"last update: " + updateDateStr}</Text>
                            <Text style={styles.time}>{"likes: " + info.likes}</Text>
                        </View>
                    </View>
                </View>
            </TouchableHighlight>
        )
    }

    _renderMsgImage(info) {
        if(info.original_pic) {
            return (
                <TouchableHighlight onPress={this._openPhotoBrowser.bind(this, info)}>
                    <Image source={{uri: info.original_pic}} style={[styles.msgImage, { resizeMode: Image.resizeMode.cover }]} />
                </TouchableHighlight>
            )
        }
    }

    _handleUrlPress(url) {
        this.props.navigator.push({
            title: 'WebView',
            id: 'webview',
            params: {
                url: url
            }
        })
    }

    _gotoDetails(info) {
        this.props.navigator.push({
            title: 'Repository',
            id: 'repoDetail',
            params: {
                repoInfo: info
            }
        })
    }

    _openPhotoBrowser(info) {
        this.props.navigator.push({
            id: 'photoBrowser',
            params: {
                mediaList: [{
                    photo: info.original_pic,
                    caption: info.text
                }]
            }
        })
    }
}


const customStyles = {
    paginationView: {
        ...styleUtils.containerBg
    },
    url: {
        color: '#007aff'
    }
};


const styles = StyleSheet.create(styleUtils.card);