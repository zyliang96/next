import React from 'react';
import ReactDOM from 'react-dom';
import { Form, Input, Checkbox, Radio } from '@alifd/next';
import { APAConfigProvider } from '@alifd/apa-sdk';

const FormItem = Form.Item;

const formItemLayout = {
    labelCol: {
        fixedSpan: 10,
    },
    wrapperCol: {
        span: 14,
    },
};

class Demo extends React.Component {
    state: {
        device: 'desktop' | 'tablet' | 'desktop' | 'phone';
    } = {
        device: 'desktop',
    };

    handleDeviceChange = (device: string) => {
        this.setState({
            device,
        });
    };

    render() {
        return (
            <APAConfigProvider
                regionName="移动端表单 Demo"
                regionId="Form-mobile-demo"
                regionDesc="移动端表单 Demo"
                isRegisterChildren
            >
                <div>
                    <Radio.Group
                        shape="button"
                        value={this.state.device}
                        onChange={this.handleDeviceChange}
                    >
                        <Radio value="desktop">desktop</Radio>
                        <Radio value="phone">phone</Radio>
                    </Radio.Group>
                    <hr />
                    <Form style={{ width: '60%' }} {...formItemLayout} device={this.state.device}>
                        <FormItem label="Username:">
                            <p>Fixed Name</p>
                        </FormItem>
                        <FormItem label="password:" name="basePass">
                            <Input htmlType="password" placeholder="Please Enter Password" />
                        </FormItem>
                        <FormItem label="Note:" help="something" name="baseRemark">
                            <Input.TextArea placeholder="something" />
                        </FormItem>
                        <FormItem label="Agreement:" name="baseAgreement">
                            <Checkbox defaultChecked>Agree</Checkbox>
                        </FormItem>
                        <FormItem label=" ">
                            <Form.Submit>Confirm</Form.Submit>
                        </FormItem>
                    </Form>
                </div>
            </APAConfigProvider>
        );
    }
}

ReactDOM.render(<Demo />, mountNode);
