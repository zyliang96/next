import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Overlay, Button } from '@alifd/next';
import { APAConfigProvider } from '@alifd/apa-sdk';

class Demo extends Component {
    state = {
        visible: false,
    };

    btn: InstanceType<typeof Button> | null;

    onClick = () => {
        this.setState({
            visible: !this.state.visible,
        });
    };

    onClose = () => {
        this.setState({
            visible: false,
        });
    };

    render() {
        return (
            <div>
                <Button
                    onClick={this.onClick}
                    ref={ref => {
                        this.btn = ref;
                    }}
                >
                    Toggle visible
                </Button>
                <Overlay
                    v2
                    visible={this.state.visible}
                    target={() => this.btn}
                    safeNode={() => this.btn}
                    onRequestClose={this.onClose}
                >
                    <span className="overlay-demo">Hello World From Overlay!</span>
                </Overlay>
            </div>
        );
    }
}

ReactDOM.render(
    <APAConfigProvider
        regionName="基本"
        regionId="Overlay-basic-demo"
        regionDesc="Overlay基本示例"
        isRegisterChildren
    >
        <Demo />
    </APAConfigProvider>,
    mountNode
);
