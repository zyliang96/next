import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Dialog } from '@alifd/next';
import { APAConfigProvider } from '@alifd/apa-sdk';

class Demo extends React.Component {
    state = {
        visible: false,
    };

    onOpen = () => {
        this.setState({
            visible: true,
        });
    };

    onClose = () => {
        this.setState({
            visible: false,
        });
    };

    render() {
        const { visible } = this.state;

        return (
            <APAConfigProvider
                regionName="Dialog高度 Demo"
                regionId="Dialog-height-demo"
                regionDesc="Dialog高度示例"
                isRegisterChildren
            >
                <div>
                    <Button onClick={this.onOpen} type="primary">
                        Open dialog
                    </Button>
                    <Dialog
                        title="Fixed Height"
                        v2
                        visible={visible}
                        height="400px"
                        onOk={this.onClose}
                        onClose={this.onClose}
                    >
                        Small Content in a fixed size Dialog
                    </Dialog>
                </div>
            </APAConfigProvider>
        );
    }
}

ReactDOM.render(<Demo />, mountNode);
