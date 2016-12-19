/**
 * Created by kakachan on 16/12/16.
 */

import React,{Component} from 'react';

import {
    StyleSheet,
    View,
    Alert
} from 'react-native';

import styleUtils from '../utils/Styles';
import NaviComponent from '../components/NaviComponent';
import EditorPage from '../pages/EditorPage';
import {ajax} from '../utils/Network';

export default class NewRepoPage extends Component{
    constructor(props){
        super(props);

        this.state = {
            text: '',
            nameText: ''
        }
    }

    componentWillMount(){
        this.props.route.title = 'New Repository';
        this.props.route.createRepo = this.createRepo.bind(this);
    }

    render(){

        return(
            <View style={styles.container}>
                <NaviComponent route={this.props.route} navigator={this.props.navigator} />
                <EditorPage
                    onChangeText={this.onChangeText.bind(this)}
                    onChangeNameText={this.onChangeNameText.bind(this)}
                    text={this.state.text}
                    repoNameText={this.state.nameText}/>
            </View>
        )
    }

    createRepo() {
        if(!this.state.nameText || this.state.nameText == '' ||
            !this.state.text || this.state.text == ''){
            Alert.alert(
                'please fill in all fields.',
                this.state.text,
                [
                    {text: 'OK'}
                ]
            )
            return;
        }

        let data = {
            name: this.state.nameText,
            creator: 'kakachan',
            u_id:"58538dcc9822d109091c1d51",
            description: this.state.text
        }
        ajax({
            url : 'app/resources/repository/create',
            data :  data,
            method : 'POST'
        }).then(res => {
            try{
                alert(JSON.stringify(res));
                if(!res.err_code) {
                    Alert.alert(
                        'Create Success: ',
                        this.state.nameText,
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

    onChangeNameText(repoNameText) {
        this.setState({
            nameText: repoNameText
        })
    }
}

const styles = StyleSheet.create({
    container: {
        ...styleUtils.containerBg,
        flexGrow: 1
    }
})
