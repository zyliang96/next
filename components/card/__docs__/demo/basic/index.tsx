import React from 'react';
import ReactDOM from 'react-dom';
import { Card, Button } from '@alifd/next';
import { APAConfigProvider } from '@alifd/apa-sdk';

const commonProps = {
    subTitle: 'SubTitle',
    extra: (
        <Button text type="primary">
            Link
        </Button>
    ),
};

ReactDOM.render(
    <APAConfigProvider
        regionName="卡片基本用法"
        regionId="card-basic-demo"
        regionDesc="卡片基本用法"
        isRegisterChildren
    >
        <div>
            <Card free style={{ width: 300 }} showTitleBullet>
                <Card.Header title="Simple Card" {...commonProps} />
                <Card.Content>
                    Lorem ipsum dolor sit amet, est viderer iuvaret perfecto et. Ne petentium
                    quaerendum nec, eos ex recteque mediocritatem, ex usu assum legendos temporibus.
                    Ius feugiat pertinacia an, cu verterem praesent quo.
                </Card.Content>
            </Card>
        </div>
    </APAConfigProvider>,
    mountNode
);
