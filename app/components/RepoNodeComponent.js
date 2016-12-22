/**
 * Created by kakachan on 16/12/22.
 */

import React, {
    Component
} from 'react'

import {
    View,
    Text,
    Image,
    Platform,
    ListView,
    StyleSheet,
    ActivityIndicator
} from 'react-native'

import styleUtils from '../utils/Styles';
import moment from 'moment';

export default class RepoNodeComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        if(this.props.node_loadding) {
            return this._renderSpinner()
        } else if(this.props.repo_nodes.length) {
            return this._renderRepoNodeList()
        } else {
            return this._renderEmptyList()
        }
    }

    _renderRepoNodeList() {
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
        let dataSource = ds.cloneWithRows(this.props.repo_nodes)
        return (
            <ListView
                dataSource={dataSource}
                renderRow={this._renderRepoNodeRow}
                style={styles.container}
            />
        )
    }

    _renderRepoNodeRow(repoNode) {
        let content = '';
        if(repoNode.content && repoNode.content.text){
            content = repoNode.content.text;
        }
        return (
            <View style={styles.commentContainer}>
                <Image source={{uri: repoNode.avatar}} style={styles.commentAvatar} />
                <View style={styles.commentRightContainer}>
                    <Text style={styles.commentTime}>{repoNode.username + '   ' + moment(repoNode.create_at).fromNow()}</Text>
                    <Text style={styles.commentName}>{repoNode.name}</Text>
                    <Text style={styles.commentText}>{content}</Text>
                </View>
            </View>
        )
    }

    _renderEmptyList() {
        return (
            <View style={[styles.container, styles.emptyContainer]}>
                <Text style={styles.emptyText}>Empty Repo Nodes</Text>
            </View>
        )
    }

    _renderSpinner() {
        let color = Platform.OS === 'android' ? styleUtils.androidSpinnerColor : 'gray'
        return (
            <View style={[styles.container, styles.spinnerContainer]}>
                <ActivityIndicator
                    animating={true}
                    size='small'
                    color={color}
                />
            </View>
        )
    }
}

RepoNodeComponent.defaultProps = {
    loading: true,
    comments: []
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f7f7f7'
    },
    emptyContainer: {
        height: 200,
        justifyContent: 'center',
        alignItems: 'center'
    },
    emptyIcon: {
        fontFamily: 'iconfont',
        color: '#dbdbdb',
        fontSize: 80
    },
    emptyText: {
        color: '#dbdbdb',
        fontSize: 16,
        marginTop: 25
    },
    spinnerContainer: {
        height: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },
    commentContainer: {
        flexDirection: 'row',
        marginLeft: 10,
        marginRight: 10,
        paddingTop: 10,
        paddingBottom: 10,
        borderColor: '#e1e1e1',
        borderBottomWidth: 1
    },
    commentAvatar: {
        backgroundColor: 'gray',
        width: 35,
        height: 35,
        borderRadius: 4,
        marginRight: 6
    },
    commentTime: {
        color: '#6d6d72',
        fontSize: 11
    },
    commentName: {
        color: '#6d6d72',
        fontSize: 13
    },
    commentText: {
        color: '#6d6d72',
        fontSize: 14
    }
})