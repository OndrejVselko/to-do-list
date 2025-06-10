import React from 'react';
import ViewSwitcher from './ViewSwitcher.jsx';

export default function Stats({ data, setEdited, setData }) {
    return <ViewSwitcher data={data} setEdited={setEdited} setData={setData}/>;
}