/**
 * Created by kakachan on 16/12/23.
 */

import React, {
    Component
} from 'react'

import {
    StyleSheet,
    View,
    Alert
} from 'react-native'

import styleUtils from '../utils/Styles'
import NaviComponent from '../components/NaviComponent'
import FeedbackEditor from './FeedbackEditor'
import {ajax} from '../utils/Network';

export default class FeedbackPage extends Component{
    constructor(props) {
        super(props)
        this.state = {
            text: '',
            title: ''
        }
    }

    componentWillMount() {
        this.props.route.sendFeedback = this.sendFeedback.bind(this)
    }

    render() {
        return (
            <View style={[styles.container, styleUtils.containerShadow]}>
                <NaviComponent route={this.props.route} navigator={this.props.navigator}/>
                <FeedbackEditor
                    onChangeText={this.onChangeText.bind(this)}
                    onChangeTitle={this.onChangeTitle.bind(this)}
                    text={this.state.text}
                    title={this.state.title}/>
            </View>
        )
    }

    sendFeedback() {
        if(!this.state.title || this.state.title == '' ||
            !this.state.text || this.state.text == ''){
            Alert.alert(
                'please fill in all fields.',
                this.state.text,
                [
                    {text: 'OK'}
                ]
            );
            return;
        }

        let data = {
            u_id:"58538dcc9822d109091c1d51",
            title: this.state.title,
            content: this.state.text
        }
        ajax({
            url : 'app/user/user_feedback/create',
            data :  data,
            method : 'POST'
        }).then(res => {
            try{
                if(!res.err_code) {
                    Alert.alert(
                        'Thanks for your feedback',
                        this.state.text,
                        [
                            {text: 'OK', onPress: () => this.props.navigator.pop()}
                        ]
                    )
                }
            }catch(err){
                alert("err: " + err);
            }
        })
    }

    onChangeText(text) {
        this.setState({
            text: text
        })
    }

    onChangeTitle(title) {
        this.setState({
            title: title
        })
    }
}

const styles = StyleSheet.create({
    container: {
        ...styleUtils.containerBg,
        flexGrow: 1
    }
})