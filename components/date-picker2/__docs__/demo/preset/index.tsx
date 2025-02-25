import React from 'react';
import ReactDOM from 'react-dom';

import { DatePicker2 } from '@alifd/next';
import dayjs, { type Dayjs } from 'dayjs';

const { RangePicker } = DatePicker2;
const RangePreset: Record<string, Dayjs[]> = {
    今天: [dayjs(), dayjs()],
    本月: [dayjs().startOf('month'), dayjs().endOf('month')],
};
const datePreset: Record<string, () => Dayjs> = {
    此刻: () => dayjs(),
};

function App() {
    return (
        <div className="app">
            <div>
                <DatePicker2 preset={datePreset} />
            </div>
            <div>
                <DatePicker2 preset={datePreset} showTime />
            </div>
            <div>
                <RangePicker preset={RangePreset} />
            </div>
            <div>
                <RangePicker preset={RangePreset} showTime />
            </div>
        </div>
    );
}

ReactDOM.render(<App />, mountNode);
