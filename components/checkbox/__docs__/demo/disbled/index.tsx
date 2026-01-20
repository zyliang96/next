import React from 'react';
import ReactDOM from 'react-dom';
import { Checkbox, Switch } from '@alifd/next';
import { APAConfigProvider } from '@alifd/apa-sdk';

class App extends React.Component {
    state = {
        disabled: true,
    };

    toggleDisabled = () => {
        this.setState({
            disabled: !this.state.disabled,
        });
    };

    render() {
        return (
            <React.Fragment>
                disabled:
                <Switch
                    size="small"
                    defaultChecked
                    onChange={this.toggleDisabled}
                    style={{ verticalAlign: 'middle' }}
                />
                <br />
                <br />
                <Checkbox
                    defaultChecked={false}
                    disabled={this.state.disabled}
                    style={{ marginRight: 10 }}
                >
                    Disabled
                </Checkbox>
                <Checkbox defaultChecked disabled={this.state.disabled}>
                    Disabled
                </Checkbox>
            </React.Fragment>
        );
    }
}

ReactDOM.render(
    <APAConfigProvider
        regionName="禁用状态"
        regionId="Checkbox-disbled-demo"
        regionDesc="Checkbox禁用状态示例"
        isRegisterChildren
    >
        <App />
    </APAConfigProvider>,
    mountNode
);
