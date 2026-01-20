import React from 'react';
import ReactDOM from 'react-dom';
import { Dropdown, Menu, Button } from '@alifd/next';
import { APAConfigProvider } from '@alifd/apa-sdk';

const menu = (
    <Menu>
        <Menu.Item>Option 1</Menu.Item>
        <Menu.Item>Option 2</Menu.Item>
        <Menu.Item>Option 3</Menu.Item>
        <Menu.Item>Option 4</Menu.Item>
    </Menu>
);

class App extends React.Component {
    state = {
        visible: false,
    };

    toggleVisible = () => {
        this.setState({
            visible: !this.state.visible,
        });
    };

    onVisibleChange = (visible: boolean) => {
        this.setState({
            visible,
        });
    };

    render() {
        return (
            <div>
                <div style={{ marginBottom: '20px' }}>
                    <Button onClick={this.toggleVisible} ref="button">
                        Toggle Overlay
                    </Button>
                </div>
                <Dropdown
                    trigger={<span>Hello dropdown</span>}
                    triggerType="click"
                    visible={this.state.visible}
                    onVisibleChange={this.onVisibleChange}
                    safeNode={() => this.refs.button}
                >
                    {menu}
                </Dropdown>
            </div>
        );
    }
}

ReactDOM.render(
    <APAConfigProvider
        regionName="从弹层外关闭"
        regionId="Dropdown-controlled-demo"
        regionDesc="展示如何使用 visible 属性控制弹层显示或隐藏"
        isRegisterChildren={true}
    >
        <App />
    </APAConfigProvider>,
    mountNode
);
