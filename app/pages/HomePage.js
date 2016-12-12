/**
 * Created by kakachan on 16/12/9.
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

export default class HomePage extends Component{
    constructor(props){
        super(props);
        this.state = {
            timeline: []
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
        if(page === 1 && options.firstLoad) {
            ajax({
                url: 'app/indexpage/recommend/news'
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
                url: 'app/indexpage/recommend/news'
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
                url: 'app/indexpage/recommend/news'
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
        return (
            <TouchableHighlight underlayColor='transparent' onPress={this._gotoDetails.bind(this, info)}>
                <View style={styles.tweetContainer}>
                    <View style={styles.topContainer}>
                        <Image source={{uri: info.avatar}} style={styles.avatar} />
                        <View>
                            <View style={styles.userContainer}>
                                <Text style={styles.name}>{info.name}</Text>
                                <Text style={styles.time}>{info.nickname + ' '} {moment(info.created_at * 1000).fromNow()} {' #' + info.update} </Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.middleContainer}>
                        <ParsedText
                            parse={
                            [{type: 'url', style: customStyles.url, onPress: this._handleUrlPress.bind(this)}]}
                        >{info.text}</ParsedText>
                        {this._renderMsgImage(info)}
                    </View>
                    <View style={styles.bottomContainer}>
                        <TouchableHighlight style={styles.bottomTool}>
                            <Text style={styles.bottomToolText}>CoWrite</Text>
                        </TouchableHighlight>
                        <TouchableHighlight style={styles.bottomTool}>
                            <Text style={styles.bottomToolText}>Comment</Text>
                        </TouchableHighlight>
                        <TouchableHighlight style={styles.bottomTool}>
                            <Text style={styles.bottomToolText}>Follow</Text>
                        </TouchableHighlight>
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

    _gotoDetails(tweet) {
        this.props.navigator.push({
            title: 'Tweet',
            id: 'tweetDetails',
            params: {
                tweet: tweet
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