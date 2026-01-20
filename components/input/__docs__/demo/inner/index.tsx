import React from 'react';
import ReactDOM from 'react-dom';
import { Input, Icon } from '@alifd/next';
import { APAConfigProvider } from '@alifd/apa-sdk';

class App extends React.Component {
    state = {
        v: '',
    };

    onChange = (v: string) => {
        this.setState({
            v,
        });
    };

    onClick = () => {
        console.log(this.state.v);
    };

    render() {
        return (
            <div>
                <Input
                    innerBefore={
                        <Icon type="search" style={{ margin: 4 }} onClick={this.onClick} />
                    }
                    placeholder="search"
                    value={this.state.v}
                    aria-label="input with config of innerBefore"
                    onChange={this.onChange}
                />
                <br />
                <br />

                <Input
                    innerAfter={
                        <Icon
                            type="search"
                            size="xs"
                            onClick={this.onClick}
                            style={{ margin: 4 }}
                        />
                    }
                    placeholder="search"
                    value={this.state.v}
                    aria-label="input with config of innerAfter"
                    onChange={this.onChange}
                />
                <br />
                <br />

                <Input
                    label="total"
                    innerAfter="¥"
                    placeholder="search"
                    value={this.state.v}
                    onChange={this.onChange}
                />
                <br />
                <br />

                <Input
                    disabled
                    defaultValue="hi"
                    innerAfter={<Icon type="calendar" style={{ margin: 4 }} />}
                    aria-label="input with config of innerAfter and disabled"
                />
            </div>
        );
    }
}

ReactDOM.render(
    <APAConfigProvider
        regionName="Input水印和前后缀Demo"
        regionId="Input-inner-demo"
        regionDesc="Input水印和前后缀示例"
        isRegisterChildren
    >
        <App />
    </APAConfigProvider>,
    mountNode
);
