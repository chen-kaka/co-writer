/**
 * Created by kakachan on 16/12/19.
 */

import React, {
    Component,
    PropTypes
} from 'react'

import {
    View,
    Text,
    TextInput,
    TouchableHighlight,
    StyleSheet
} from 'react-native'

export default class FeedbackEditor extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        return (
            <View>
                <TextInput
                    placeholder='title'
                    multiline={false}
                    style={styles.shortInput}
                    value={this.props.title}
                    onChangeText={this.props.onChangeTitle}
                />
                <TextInput
                    placeholder='write your feedback here ~'
                    multiline={true}
                    style={styles.textInput}
                    value={this.props.text}
                    onChangeText={this.props.onChangeText}
                />
            </View>
        )
    }

    _renderTool(buttonText, handle = () => {}) {
        return (
            <TouchableHighlight style={styles.tool}
                onClick={handle}>
                <Text style={styles.toolText}>{buttonText}</Text>
            </TouchableHighlight>
        )
    }
}

FeedbackEditor.propTypes = {
    enableTools: PropTypes.string,
    text: PropTypes.string,
    placeholder: PropTypes.string,
    onChangeText: PropTypes.func
}

const styles = StyleSheet.create({
    shortInput: {
        height: 50,
        backgroundColor: '#fff',
        padding: 10,
        paddingTop: 10,
        paddingBottom: 10,
        fontSize: 14,
        textAlignVertical: 'top'
    },
    textInput: {
        height: 160,
        backgroundColor: '#fff',
        padding: 10,
        paddingTop: 10,
        paddingBottom: 5,
        fontSize: 14,
        textAlignVertical: 'top'
    },
    toolbar: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        height: 40,
        backgroundColor: '#f9f9f9',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderColor: '#dadada',
    },
    tool: {
        width: 70,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 5,
        marginRight: 5
    },
    toolText: {
        fontSize: 14,
        fontFamily: 'iconfont',
        color: '#666'
    }
})