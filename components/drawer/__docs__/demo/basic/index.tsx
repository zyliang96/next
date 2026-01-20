import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Drawer } from '@alifd/next';
import { APAConfigProvider } from '@alifd/apa-sdk';
import type { DrawerProps } from '@alifd/next/types/drawer';

class Demo extends React.Component {
    state = {
        visible: false,
    };

    onOpen = () => {
        this.setState({
            visible: true,
        });
    };

    onClose: DrawerProps['onClose'] = (reason, e) => {
        console.log('onClose: ', reason, e);
        this.setState({
            visible: false,
        });
    };

    render() {
        return (
            <APAConfigProvider
                regionName="基本"
                regionId="Drawer-basic-demo"
                regionDesc="第一个抽屉"
                isRegisterChildren
            >
                <div>
                    <Button type="primary" onClick={this.onOpen}>
                        {' '}
                        open{' '}
                    </Button>
                    <Drawer
                        v2
                        title="标题"
                        placement="right"
                        visible={this.state.visible}
                        onClose={this.onClose}
                    >
                        Start your business here by searching a popular product
                    </Drawer>
                </div>
            </APAConfigProvider>
        );
    }
}

ReactDOM.render(<Demo />, mountNode);
