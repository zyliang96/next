import React from 'react';
import ReactDOM from 'react-dom';
import { Upload, Button, Icon } from '@alifd/next';
import { type UploadProps } from '@alifd/next/types/upload';
import { APAConfigProvider } from '@alifd/apa-sdk';

const onChange: UploadProps['onChange'] = info => {
    console.log('onChange : ', info);
};

const onSuccess: UploadProps['onSuccess'] = info => {
    console.log('onSuccess : ', info);
};

ReactDOM.render(
    <APAConfigProvider
        regionName="文件夹上传"
        regionId="Upload-directory-demo"
        regionDesc="展示 Upload 的文件夹上传"
        isRegisterChildren={true}
    >
        <Upload
            action="https://www.easy-mock.com/mock/5b713974309d0d7d107a74a3/alifd/upload"
            onChange={onChange}
            onSuccess={onSuccess}
            listType="text"
            webkitdirectory
        >
            <Button type="primary" style={{ margin: '0 0 10px' }}>
                <Icon type="upload" />
                Upload Directory
            </Button>
        </Upload>
    </APAConfigProvider>,
    mountNode
);
