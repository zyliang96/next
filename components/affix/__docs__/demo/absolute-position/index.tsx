import React from 'react';
import ReactDOM from 'react-dom';
import { Affix, Button } from '@alifd/next';
import { APAConfigProvider } from '@alifd/apa-sdk';

class Demo extends React.Component {
    container: HTMLDivElement;
    _containerRefHandler(ref: HTMLDivElement) {
        this.container = ref;
    }

    render() {
        return (
            <div className="custom-affix-container" ref={this._containerRefHandler.bind(this)}>
                <div className="affix-wrapper">
                    <Affix container={() => this.container} offsetTop={0} useAbsolute>
                        <Button type="secondary">Absolute Position Affixed</Button>
                    </Affix>
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <APAConfigProvider
        regionName="Affix固钉组件的绝对定位实现Demo"
        regionId="affix-absolute-position-demo"
        regionDesc="Affix固钉组件的绝对定位实现Demo"
        isRegisterChildren
    >
        <Demo />
    </APAConfigProvider>,
    mountNode
);
