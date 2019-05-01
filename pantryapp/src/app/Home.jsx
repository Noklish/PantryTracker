import React from 'react';

import './Home.css';


export const Home = (props) => (
    <h1 id="home-alert" className="alert alert-info text-center">{`Welcome to Pantry Tracker, ${props.user.username}!`}</h1>
)

export default Home;
