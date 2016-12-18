/**
 * Created by kakachan on 16/12/18.
 */

import React,{Component} from 'react';

import {
    View,
    Text
} from 'react-native';

export default class NewRepoComponent extends Component{
    constructor(props){
        super(props);

        this.state = {
        }
    }

    render(){

        return(
            <View>
                <Text>New Group.</Text>
            </View>
        )
    }
}