import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Dialog } from '@alifd/next';
import { APAConfigProvider } from '@alifd/apa-sdk';

interface DemoState {
    visible?: boolean;
    fullyCustomizedVisible?: boolean;
    textCustomizedVisible?: boolean;
}

class Demo extends React.Component {
    state: DemoState = {
        visible: false,
    };

    onOpenFullyCustomized = () => {
        this.setState({
            fullyCustomizedVisible: true,
        });
    };

    onCloseFullyCustomized = () => {
        this.setState({
            fullyCustomizedVisible: false,
        });
    };

    onOpenTextCustomized = () => {
        this.setState({
            textCustomizedVisible: true,
        });
    };

    onCloseTextCustomized = () => {
        this.setState({
            textCustomizedVisible: false,
        });
    };

    render() {
        return (
            <APAConfigProvider
                regionName="Dialog自定义Footer Demo"
                regionId="Dialog-customize-footer-demo"
                regionDesc="Dialog自定义Footer示例"
                isRegisterChildren
            >
                <div>
                    <Button onClick={this.onOpenFullyCustomized} type="primary">
                        Fully Customized Footer
                    </Button>
                    <br />
                    <br />
                    <Dialog
                        v2
                        title="Welcome to Alibaba.com"
                        footer={
                            <Button warning type="primary" onClick={this.onCloseFullyCustomized}>
                                Customize footer
                            </Button>
                        }
                        visible={this.state.fullyCustomizedVisible}
                        onOk={this.onCloseFullyCustomized}
                        onClose={this.onCloseFullyCustomized}
                    >
                        Start your business here by searching a popular product
                    </Dialog>
                    <Button onClick={this.onOpenTextCustomized} type="primary">
                        Text Only Customize
                    </Button>
                    <Dialog
                        v2
                        title="Welcome to Alibaba.com"
                        visible={this.state.textCustomizedVisible}
                        onOk={this.onCloseTextCustomized}
                        onClose={this.onCloseTextCustomized}
                        okProps={{ children: 'Custom OK', className: 'asdf' }}
                        cancelProps={{ children: 'Custom Cancel' }}
                    >
                        Start your business here by searching a popular product
                    </Dialog>
                </div>
            </APAConfigProvider>
        );
    }
}

ReactDOM.render(<Demo />, mountNode);
