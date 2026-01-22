import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Dialog, ConfigProvider } from '@alifd/next';
import { APAConfigProvider } from '@alifd/apa-sdk';

const NormalDialog = () => {
    return (
        <div>
            <Button
                onClick={() => {
                    Dialog.confirm({
                        v2: true,
                        title: 'Dialog.confirm 命令式弹窗',
                    });
                }}
            >
                使用 Dialog.confirm
            </Button>
        </div>
    );
};

const DialogWitchContext = Dialog.withContext(({ contextDialog }) => {
    return (
        <div>
            <Button
                onClick={() => {
                    contextDialog.confirm({
                        v2: true,
                        title: 'Dialog.withContext 命令式弹窗',
                    });
                }}
            >
                使用 Dialog.withContext
            </Button>
        </div>
    );
});

class Demo extends React.Component {
    render() {
        return (
            <APAConfigProvider
                regionName="Dialog withContext Demo"
                regionId="Dialog-withContext-demo"
                regionDesc="Dialog withContext示例"
                isRegisterChildren
            >
                <ConfigProvider
                    locale={{
                        Dialog: {
                            close: '关闭（根组件文案）',
                            ok: '确认（根组件文案）',
                            cancel: '取消（根组件文案）',
                        },
                    }}
                >
                    <ConfigProvider
                        locale={{
                            Dialog: {
                                close: '关闭（局部文案）',
                                ok: '确认（局部文案）',
                                cancel: '取消（局部文案）',
                            },
                        }}
                    >
                        <div>
                            <NormalDialog />
                            <br />
                            <DialogWitchContext />
                        </div>
                    </ConfigProvider>
                </ConfigProvider>
            </APAConfigProvider>
        );
    }
}

ReactDOM.render(<Demo />, mountNode);
