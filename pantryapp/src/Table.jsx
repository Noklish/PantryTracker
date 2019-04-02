import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import { Form } from 'react-bootstrap';

export class Table extends React.Component {
    constructor(props, context) {
        super(props, context);
    
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
    
        this.state = {
          show: false,
          hideMessage: false
        };
      }
    
      handleClose() {
        this.setState({ show: false });
      }
    
      handleShow() {
        this.setState({ show: true });
      }
    
    render (){
        return (
            <>
            <div id="home">
                <h1>{this.props.title}</h1>
                <div id="foodAlert" className="alert alert-primary" role="alert">
                    You do not have any food items in your <b>{this.props.title}</b>. Click 'Add Item' to begin filling your <b>{this.props.title}</b>.
                </div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Food Item</th>
                            <th>Brand</th>
                            <th>Food Type</th>
                            <th>Expiration Date</th>
                            <th>Quantity</th>
                            <th className="text-right">{this.props.quick}</th>
                        </tr>
                    </thead>
                    <tbody id="foodTableBody">
                    </tbody>
                </table>
                <Button variant="primary" size='lg' block onClick={this.handleShow}>
                        Add Item to your {this.props.title}
                </Button>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Food Item</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="foodItem.food">
                                <Form.Label>Food Item</Form.Label>
                                <Form.Control type="text" placeholder="Please enter your food item" />
                            </Form.Group>
                            <Form.Group controlId="foodItem.brand">
                                <Form.Label>Food Brand</Form.Label>
                                <Form.Control type="text" placeholder="Please enter the brand of your food item" />
                            </Form.Group>
                            <Form.Group controlId="foodItem.type">
                                <Form.Label>Food Type</Form.Label>
                                <Form.Control as="select" >
                                    <option value="-1" selected disabled>Please select food type</option>
                                    <option value="Grain">Grain</option>
                                    <option value="Fruit">Fruit</option>
                                    <option value="Vegetable">Vegetable</option>
                                    <option value="Dairy">Dairy</option>
                                    <option value="Meat">Meat</option>
                                    <option value="Beverage">Beverage</option>
                                    <option value="Other">Other</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="foodItem.expiration">
                                <Form.Label>Expiration Date</Form.Label>
                                <Form.Control type="date" /> 
                            </Form.Group>
                            <Form.Group controlId="foodItem.quantity">
                                <Form.Label>Quantity</Form.Label>
                                <Form.Control type="number" min="1" placeholder="Please enter the quanity of food" /> 
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={this.handleClose}>
                        Submit
                    </Button>
                    </Modal.Footer>
                </Modal>


            
            </div>
            </>
        );
    }
}

export default Table;