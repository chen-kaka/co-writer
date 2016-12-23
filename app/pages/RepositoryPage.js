/**
 * Created by kakachan on 16/12/12.
 */
import React, {Component} from 'react';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import {
    View,
    ActivityIndicatorIOS,
    Text,
    StyleSheet,
    ScrollView,
    TouchableHighlight,
    Image,
    TouchableOpacity,
    ListView
} from 'react-native';
import RepoListView from '../pages/RepoListView';
import Platform from 'Platform';

export default class RepositoryPage extends Component {
    _selectTab= 0;
    _lvs= [];
    constructor(props){
        super(props);

        this.state = {
        };
    }

    onChangeTab(tab) {
    }

    render(){
        let paddingTop = 10;
        if (Platform.OS == 'android') {
            paddingTop = 10;
        }
        return (
            <View style={{backgroundColor: 'white', flex: 1}}>
                <ScrollableTabView
                    onChangeTab={this.onChangeTab}
                >
                    <RepoListView
                        tabLabel="MyRepos"
                        tabIndex="0"
                        navigator={this.props.navigator}
                    >
                    </RepoListView>
                    <RepoListView
                        tabLabel="ShareRepos"
                        tabIndex="1"
                        navigator={this.props.navigator}
                    >
                    </RepoListView>
                    <RepoListView
                        tabLabel="CoWrites"
                        tabIndex="2"
                        navigator={this.props.navigator}
                    >
                    </RepoListView>
                </ScrollableTabView>
            </View>
        )
    }
}

const ICON_SIZE = 12;
const styles = StyleSheet.create({
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
    },
    iconTextContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 2,
    },
    showcase: {
        height: 120,
    },
    poplular: {
        padding: 5,
    },
});