import React from 'react';
import ReactDOM from 'react-dom';
import { Radio, Button, Drawer } from '@alifd/next';
import { APAConfigProvider } from '@alifd/apa-sdk';
import type { RadioProps } from '@alifd/next/types/radio';

class Demo extends React.Component {
    state = {
        visible: false,
        placement: 'right',
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

    onPlacementChange: RadioProps['onChange'] = dir => {
        this.setState({
            placement: dir,
        });
    };

    render() {
        return (
            <APAConfigProvider
                regionName="自定义弹出方向"
                regionId="Drawer-placement-demo"
                regionDesc="自定义弹出方向"
                isRegisterChildren
            >
                <div>
                    <Radio.Group
                        dataSource={['right', 'bottom', 'left', 'top']}
                        defaultValue={'right'}
                        onChange={this.onPlacementChange}
                    />
                    <br />
                    <br />
                    <Button type="primary" onClick={this.onOpen}>
                        {' '}
                        open{' '}
                    </Button>
                    <Drawer
                        v2
                        title="标题"
                        visible={this.state.visible}
                        placement={this.state.placement as 'right' | 'bottom' | 'left' | 'top'}
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
