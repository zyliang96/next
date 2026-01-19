import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Box } from '@alifd/next';
import { APAConfigProvider } from '@alifd/apa-sdk';

class Demo extends React.Component {
    state = {
        loading: false,
    };

    setLoading = () => {
        this.setState({ loading: true });
    };

    render() {
        return (
            <APAConfigProvider
                regionName="Button加载状态Demo"
                regionId="Button-loading-demo"
                regionDesc="Button加载状态Demo"
                isRegiserChildren
            >
                <Box direction="row" spacing={20}>
                    <Button type="secondary" loading>
                        Loading
                    </Button>
                    <Button type="primary" loading={this.state.loading} onClick={this.setLoading}>
                        Click to loading
                    </Button>
                </Box>
            </APAConfigProvider>
        );
    }
}

ReactDOM.render(<Demo />, mountNode);
