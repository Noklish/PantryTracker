import React from 'react';

export const Message = (props) => (
    <div>
        <h1>{props.title}</h1>
        <div id="foodAlert" className="alert alert-primary" role="alert">
            You do not have any food items in your <b>{props.title}</b>. Click 'Add Item' to begin filling your <b>{props.title}</b>.
        </div>
    </div>
);