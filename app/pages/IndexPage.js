/**
 * Created by kakachan on 16/12/9.
 */

import React, {
    Component
} from 'react';

import {
    StyleSheet,
    View
} from 'react-native';

import TabComponent from '../components/TabComponent';

export default class IndexPage extends Component {
    constructor(props){
        super(props);
        this.state = {}
    }

    render(){
        return (
            <View style={styles.container}>
                <TabComponent navigator={this.props.navigator}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
   container:{
       flexGrow: 1
   }
});