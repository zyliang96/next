import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, Button, Dialog, Icon } from '@alifd/next';
import { APAConfigProvider } from '@alifd/apa-sdk';

class Demo extends React.Component {
    state = {
        visible: false,
        overflowScroll: true,
        count: 25,
    };

    onOpen = () => {
        this.setState({
            visible: true,
            count: 25,
        });
    };

    onClose = () => {
        this.setState({
            visible: false,
        });
    };

    toggleOverflowScroll = () => {
        this.setState({
            overflowScroll: !this.state.overflowScroll,
        });
    };

    render() {
        const { visible, overflowScroll, count } = this.state;

        return (
            <APAConfigProvider
                regionName="Dialog大内容 Demo"
                regionId="Dialog-large-content-demo"
                regionDesc="Dialog大内容示例"
                isRegisterChildren
            >
                <div>
                    <Switch
                        autoWidth
                        checkedChildren="滚动"
                        unCheckedChildren="铺开"
                        checked={overflowScroll}
                        onChange={this.toggleOverflowScroll}
                    />
                    <br />
                    <br />
                    <Button onClick={this.onOpen} type="primary">
                        Open dialog
                    </Button>
                    <Dialog
                        title="Welcome to Alibaba.com"
                        v2
                        centered
                        visible={visible}
                        width={600}
                        overflowScroll={overflowScroll}
                        onOk={this.onClose}
                        onClose={this.onClose}
                    >
                        {Array(count)
                            .fill(0)
                            .map((_, index) => (
                                <p key={index}>
                                    a long long content here
                                    <Button
                                        text
                                        type="primary"
                                        style={{ marginLeft: 10 }}
                                        onClick={() => this.setState({ count: count - 1 })}
                                    >
                                        <Icon type="ashbin" />
                                    </Button>
                                </p>
                            ))}
                    </Dialog>
                </div>
            </APAConfigProvider>
        );
    }
}

ReactDOM.render(<Demo />, mountNode);
