import React from 'react';
import {player} from './requests'

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import ProgressBar from 'react-bootstrap/ProgressBar'


import Teams from './teams'

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = { search: false ,player:[0]}
  }

  handleChange(event) {
    let fleldVal = event.target.value;
    this.setState({teamSearch: fleldVal})
  }

  searchPlayer() {
    player(this.state.teamSearch).then(result => {
      this.setState({ player: result })
    }).catch(err => {
      console.log(err)
    })
  }

  render() {
    return (
      <div>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="#home">Foot2Rue</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">Link</Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Form inline>
              <FormControl name="teamSearch" controlId="teamSearch" type="text" placeholder="Search Player" className="mr-sm-2" onChange={this.handleChange.bind(this)} />
              <Button variant="outline-success" onClick={() => {this.setState({ search: true });this.searchPlayer()}}>Search</Button>
            </Form>
            <Form inline>
              <Button variant="danger">Admin</Button>
            </Form>
          </Navbar.Collapse>
        </Navbar>
        <Teams></Teams>
        {this.state.search == true && <Modal.Dialog enforceFocus style={{
        position: 'absolute', left: '50%', top: '50%',
        transform: 'translate(-50%, -50%)',width: '2000%'
    }}>
          <Modal.Header closeButton onClick={() => this.setState({ search: false })}>
            <Modal.Title>{this.state.teamSearch}</Modal.Title>
          </Modal.Header>

          <Modal.Body>
          <p>
  <p>Birthday : {this.state.player[0].birthday!==undefined && this.state.player[0].birthday.substring(0,10)}</p>
  <p>Height : {this.state.player[0].birthday!==undefined && this.state.player[0].height}</p>
  <p>Weight : {this.state.player[0].birthday!==undefined && this.state.player[0].weight}</p>
                <Row>
                  <Col xs={3}><div><h6>Rating :</h6></div></Col>
                  <Col>
                    {this.state.player[0].Player_Attributes!== undefined && <p><ProgressBar now={this.state.player[0].Player_Attributes.slice(-1)[0].overall_rating}/></p>}</Col>

                </Row>
                <Row>
                  <Col xs={3}><div><h6>Potential :</h6></div></Col>
                  <Col>
                    {this.state.player[0].Player_Attributes!== undefined && <p><ProgressBar now={this.state.player[0].Player_Attributes.slice(-1)[0].potential}/></p>}</Col>

                </Row>
                <Row>
                  <Col xs={3}><div><h6>Crossing :</h6></div></Col>
                  <Col>
                    {this.state.player[0].Player_Attributes!== undefined && <p><ProgressBar now={this.state.player[0].Player_Attributes.slice(-1)[0].crossing}/></p>}</Col>

                </Row>
                <Row>
                  <Col xs={3}><div><h6>Finishing :</h6></div></Col>
                  <Col>
                    {this.state.player[0].Player_Attributes!== undefined && <p><ProgressBar now={this.state.player[0].Player_Attributes.slice(-1)[0].finishing}/></p>}</Col>

                </Row>
        </p>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={() => this.setState({ search: false })}>Close</Button>
          </Modal.Footer>
        </Modal.Dialog>}
      </div>
    );
  }
}

export default App;
