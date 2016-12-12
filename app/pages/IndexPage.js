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
import NaviComponent from '../components/NaviComponent';

export default class IndexPage extends Component {
    constructor(props){
        super(props);
        this.state = {}
    }

    render(){
        return (
            <View style={styles.container}>
                <NaviComponent route={this.props.route} navigator={this.props.navigator} />
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