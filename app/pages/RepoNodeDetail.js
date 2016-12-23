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
import RepoNodeComponent from '../components/RepoNodeComponent';
import moment from 'moment';

export default class RepoNodeDetail extends Component{
    constructor(props){
        super(props);
        
        this.state = {
            loadding : true,
            comments: [],
        }
    }
    
    componentDidMount(){
        let nodeInfo = this.props.nodeInfo;
        //加载列表
        ajax({
            url: 'app/comment/comment/query',
            query: {node_id: '5858eeafd99cb10d78051538'}//repoInfo._id}
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
        let nodeInfo = this.props.nodeInfo;
        let content = '';
        if(nodeInfo.content && nodeInfo.content.text){
            content = nodeInfo.content.text;
        }
        return(
            <View style={[styles.container, styleUtils.containerShadow]}>
                <NaviComponent route={this.props.route} navigator={this.props.navigator}/>
                <ScrollView contentContainerStyle={styles.container}>
                    <View style={cardStyle.tweetContainer}>
                        <View style={cardStyle.topContainer}>
                            <Image source={{uri: nodeInfo.avatar}} style={cardStyle.avatar} />
                            <View>
                                <View style={cardStyle.userContainer}>
                                    <Text style={cardStyle.name}>{nodeInfo.nickname}</Text>
                                    <Text style={cardStyle.time}>{'   ' + moment(nodeInfo.create_at).fromNow()}</Text>
                                </View>
                            </View>
                        </View>

                        <View style={cardStyle.middleContainer}>
                            <View style={styles.contentTitle}>
                                 <Text>{nodeInfo.name}</Text>
                            </View>
                            <ParsedText
                                parse={
                                [{type: 'url', style: {color: '#007aff'}, onPress: this._handleUrlPress.bind(this)}]}
                            >{content}</ParsedText>
                            {this._renderMsgImage(nodeInfo)}
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