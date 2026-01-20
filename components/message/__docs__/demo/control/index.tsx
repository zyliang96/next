import React from 'react';
import ReactDOM from 'react-dom';
import { Message, Button } from '@alifd/next';
import { APAConfigProvider } from '@alifd/apa-sdk';

class App extends React.Component {
    state = {
        visible: true,
    };

    handleChange = () => {
        this.setState({
            visible: !this.state.visible,
        });
    };

    handleClose = () => {
        this.setState({
            visible: false,
        });
    };

    render() {
        const { visible } = this.state;

        return (
            <div className="control-demo">
                <Button type="primary" onClick={this.handleChange}>
                    Toggle Visible
                </Button>
                <Message
                    type="warning"
                    visible={visible}
                    title="Warning"
                    closeable
                    onClose={this.handleClose}
                >
                    This item already has the label "travel". You can add a new label.
                </Message>
            </div>
        );
    }
}

ReactDOM.render(
    <APAConfigProvider
        regionName="受控模式"
        regionId="Message-control-demo"
        regionDesc="展示Message的受控显示和隐藏"
        isRegisterChildren
    >
        <App />
    </APAConfigProvider>,
    mountNode
);
