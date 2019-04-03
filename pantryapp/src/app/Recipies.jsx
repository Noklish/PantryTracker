import React, { Component } from 'react';

export class Recipies extends React.Component {
    render() {
        return (
          <>
            <h1>{this.props.title}</h1>
          </>
        );
      }
}

export default Recipies;