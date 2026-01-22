import React from 'react';
import ReactDOM from 'react-dom';

import { Button, Dialog, Input, Select } from '@alifd/next';
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
        return (
            <APAConfigProvider
                regionName="Dialog无障碍支持Demo"
                regionId="Dialog-accessibility-demo"
                regionDesc="Dialog无障碍支持示例"
                isRegisterChildren
            >
                <div>
                    <Button onClick={this.onOpen} type="primary">
                        Open dialog
                    </Button>
                    <Dialog
                        v2
                        title="Welcome to Alibaba.com"
                        visible={this.state.visible}
                        autoFocus
                        onOk={this.onClose.bind(this, 'okClick')}
                        onClose={this.onClose.bind(this, 'cancelClick')}
                        cancelProps={{ 'aria-label': 'cancel' }}
                        okProps={{ 'aria-label': 'ok' }}
                    >
                        <Input placeholder="should autofocus here" />
                        <Select popupProps={{ v2: true }} style={{ marginLeft: 8 }}>
                            <Select.Option value="1">1</Select.Option>
                            <Select.Option value="12">12</Select.Option>
                        </Select>
                    </Dialog>
                </div>
            </APAConfigProvider>
        );
    }
}

ReactDOM.render(<Demo />, mountNode);
