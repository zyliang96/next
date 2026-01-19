import React, { type FormEvent, Component } from 'react';
import ReactDOM from 'react-dom';
import { Form, Input } from '@alifd/next';
import { APAConfigProvider } from '@alifd/apa-sdk';

const FormItem = Form.Item;

class Demo extends Component {
    onSubmit(e: FormEvent) {
        e.preventDefault(); // form will auto submit if remove this line
        console.log('onsubmit');
    }

    render() {
        return (
            <APAConfigProvider
                regionName="表单提交 Demo"
                regionId="Form-onsubmit-demo"
                regionDesc="表单提交 Demo"
                isRegiserChildren
            >
                <Form onSubmit={this.onSubmit.bind(this)}>
                    <FormItem>
                        <Input placeholder="Enter Key can also trigger ‘onSubmit’" />
                    </FormItem>
                    <Form.Submit htmlType="submit">submit</Form.Submit>
                </Form>
            </APAConfigProvider>
        );
    }
}

ReactDOM.render(<Demo />, mountNode);
