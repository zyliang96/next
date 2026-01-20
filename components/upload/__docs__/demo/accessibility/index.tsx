import React from 'react';
import ReactDOM from 'react-dom';
import { Upload, Button } from '@alifd/next';
import { type UploadProps } from '@alifd/next/types/upload';
import { APAConfigProvider } from '@alifd/apa-sdk';

const onChange: UploadProps['onChange'] = info => {
    console.log('onChange callback : ', info);
};

ReactDOM.render(
    <APAConfigProvider
        regionName="无障碍支持"
        regionId="Upload-accessibility-demo"
        regionDesc="展示 Upload 的无障碍支持"
        isRegisterChildren={true}
    >
        <Upload
            listType="text"
            action="https://www.easy-mock.com/mock/5b713974309d0d7d107a74a3/alifd/upload"
            accept="image/png, image/jpg, image/jpeg, image/gif, image/bmp"
            beforeUpload={() => {}}
            onChange={onChange}
            key="5"
        >
            <Button type="secondary" style={{ margin: '0 0 10px' }}>
                upload{' '}
            </Button>
        </Upload>
    </APAConfigProvider>,
    mountNode
);
