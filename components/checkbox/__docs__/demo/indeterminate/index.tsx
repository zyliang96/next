import React from 'react';
import ReactDOM from 'react-dom';
import { Checkbox, Button } from '@alifd/next';
import { APAConfigProvider } from '@alifd/apa-sdk';

class IndeterminateApp extends React.Component {
    state = {
        checked: false,
        indeterminate: true,
        disabled: false,
    };

    toggle = () => {
        if (this.state.indeterminate) {
            this.setState({ indeterminate: false });
        } else {
            this.setState({ checked: false, indeterminate: true });
        }
    };

    render() {
        return (
            <div>
                <Checkbox
                    indeterminate={this.state.indeterminate}
                    checked={this.state.checked}
                    onChange={checked => {
                        this.setState({ checked: checked, indeterminate: false });
                    }}
                />
                <br />
                <br />
                <Button type="primary" onClick={this.toggle}>
                    toggle indeterminate
                </Button>
            </div>
        );
    }
}

ReactDOM.render(
    <APAConfigProvider
        regionName="中间状态"
        regionId="Checkbox-indeterminate-demo"
        regionDesc="Checkbox中间状态示例"
        isRegisterChildren
    >
        <IndeterminateApp />
    </APAConfigProvider>,
    mountNode
);
