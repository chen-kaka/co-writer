/**
 * Created by kakachan on 16/12/20.
 */

import React,{
    Component
} from 'react';

import{
    StyleSheet,
    ScrollView,
    View,
    Text,
    Image
} from 'react-native';

import ParsedText from 'react-native-parsed-text';
import {ajax} from '../utils/Network';
import styleUtils from '../utils/Styles';
import NaviComponent from '../components/NaviComponent';
import CommentComponent from '../components/CommentComponent';
import moment from 'moment';

export default class RepoDetail extends Component{
    constructor(props){
        super(props);
        
        this.state = {
            loadding : false,
            comments: []
        }
    }
    
    componentDidMount(){
        let repoInfo = this.props.repoInfo;
        ajax({
            url: 'app/comment/comment/query_repo',
            query: {repo_id: '585a1c1a36af130950b1d5be'}//repoInfo._id}
        }).then(res =>{
            if(!res.err_code){
                let comments = res.data;

                this.setState({
                    loadding: false,
                    comments: comments
                })
            }
        });
    }
    
    render(){
        let repoInfo = this.props.repoInfo;
        return(
            <View style={[styles.container, styleUtils.containerShadow]}>
                <NaviComponent route={this.props.route} navigator={this.props.navigator}/>
                <ScrollView contentContainerStyle={styles.container}>
                    <View style={cardStyle.tweetContainer}>
                        <View style={cardStyle.topContainer}>
                            <Image source={{uri: repoInfo.avatar}} style={cardStyle.avatar} />
                            <View>
                                <View style={cardStyle.userContainer}>
                                    <Text style={cardStyle.name}>{repoInfo.nickname}</Text>
                                    <Text style={cardStyle.time}>{'   ' + moment(repoInfo.create_at).fromNow()}</Text>
                                </View>
                            </View>
                        </View>

                        <View style={cardStyle.middleContainer}>
                            <View style={styles.contentTitle}>
                                 <Text>{repoInfo.name}</Text>
                            </View>
                            <ParsedText
                                parse={
                                [{type: 'url', style: {color: '#007aff'}, onPress: this._handleUrlPress.bind(this)}]}
                            >{repoInfo.text}</ParsedText>
                            {this._renderMsgImage(repoInfo)}
                        </View>
                    </View>
                    <View style={styles.commentContainer}>
                        <View style={styles.commentTitle}>
                            <Text style={styles.commentTitleText}>Comments</Text>
                        </View>
                        <CommentComponent loadding={this.state.loadding} comments={this.state.comments}/>
                    </View>
                </ScrollView>
            </View>
        )
    }

    _renderMsgImage(info) {
        if(info.original_pic) {
            return (
                <Image source={{uri: info.original_pic}} style={[cardStyle.msgImage, { resizeMode: Image.resizeMode.cover }]} />
            )
        }
    }

    _handleUrlPress(url) {
        this.props.navigator.push({
            title: 'WebView',
            id: 'webView',
            params: {
                url: url
            }
        })
    }
}

const cardStyle = styleUtils.card;

const styles = StyleSheet.create({
    container: {
        ...styleUtils.containerBg,
        flexGrow: 1
    },
    contentTitle: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 15
    },
    commentContainer: {
        borderWidth: 1,
        borderColor: '#ebe9e9',
        margin: 10,
        marginTop: 10
    },
    commentTitle: {
        height: 30,
        backgroundColor: '#fff',
        justifyContent: 'center',
        paddingLeft: 10,
        borderWidth: 1,
        borderColor: '#ebe9e9'
    },
    commentTitleText: {
        fontSize: 12,
        color: '#6d6d72'
    }
})