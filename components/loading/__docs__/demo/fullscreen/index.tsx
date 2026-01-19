import React from 'react';
import ReactDOM from 'react-dom';
import { Loading, Button } from '@alifd/next';
import { APAConfigProvider } from '@alifd/apa-sdk';

class App extends React.Component {
    state = {
        visible: false,
    };

    btn: any;

    onClick() {
        this.setState({ visible: !this.state.visible });
    }

    onClose = () => {
        this.setState({
            visible: false,
        });
    };

    render() {
        return (
            <span>
                <Loading
                    visible={this.state.visible}
                    fullScreen
                    safeNode={this.btn}
                    onVisibleChange={this.onClose.bind(this)}
                >
                    <Button onClick={this.onClick.bind(this)} ref={ref => (this.btn = ref)}>
                        Full Screen
                    </Button>
                </Loading>
            </span>
        );
    }
}

ReactDOM.render(
    <APAConfigProvider
        regionName="全屏"
        regionId="Loading-fullscreen-demo"
        regionDesc="Loading全屏展示示例"
        isRegiserChildren
    >
        <App />
    </APAConfigProvider>,
    mountNode
);
