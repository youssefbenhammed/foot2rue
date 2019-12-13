import test from './requests'
import React from 'react';

import ListGroup from 'react-bootstrap/ListGroup'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Spinner from 'react-bootstrap/Spinner'


import Pagination from 'react-bootstrap/Pagination'

class Teams extends React.Component {

    constructor(props){
        super(props)
        this.state = { listeEquipe: [0,0,0,0,0,0,0,0,0,0,0,0,0], page: 0, wait: true }
        this.listeEquipe = this.ListeEquipe.bind(this)
        this.render =  this.render.bind(this)
        this.handleClickButton=this.handleClickButton.bind(this)
        this.handleClickNext=this.handleClickNext.bind(this)
        this.handleClickPrevious=this.handleClickPrevious.bind(this)
        
      }
      componentWillUpdate(){
          this.ListeEquipe()
      }

      ListeEquipe() {
        test(13, this.state.page).then(result => {
          this.setState({ listeEquipe: result})
          this.setState({wait:false})
          console.log("ok")
        }).catch(err => {
          console.log(err)
        })
      }

      handleClickNext() {
        this.setState({page:this.state.page + 1,wait:true})
      }
      handleClickPrevious() {
        if(this.state.page>0){
            this.setState({page:this.state.page - 1,wait:true})
        }
        
      }
      handleClickButton(number){
          this.setState({page:this.state.page + number,wait:true})
      }

    render() {
      return(
    <Container fluid="true" >
        <Row>
        <Col xs={3}>
      <ListGroup as="ul">
      {this.state.wait===false && this.state.listeEquipe.map((equipe,index)=>{
       return <ListGroup.Item as="li" active>
        {equipe.team_long_name}
      </ListGroup.Item>
      })}
      {this.state.wait===true && this.state.listeEquipe.map((equipe,index)=>{
       return <ListGroup.Item as="li" active>
        <Spinner animation="border" size="sm"/>
      </ListGroup.Item>
      })}
    </ListGroup>
    <Pagination>
        <Pagination.Prev onClick={this.handleClickPrevious}/>
        <Pagination.Item active="true" onClick={()=>this.handleClickButton(0)}>{1+this.state.page}</Pagination.Item>
        <Pagination.Item onClick={()=>this.handleClickButton(1)}>{2+this.state.page}</Pagination.Item>
        <Pagination.Item onClick={()=>this.handleClickButton(2)}>{3+this.state.page}</Pagination.Item>
        <Pagination.Item onClick={()=>this.handleClickButton(3)}>{4+this.state.page}</Pagination.Item>
        <Pagination.Item onClick={()=>this.handleClickButton(4)}>{5+this.state.page}</Pagination.Item>
        <Pagination.Next onClick={this.handleClickNext}/>
      </Pagination>
    </Col>
    <Col>
    JELDJF
    </Col>
    </Row>
    </Container>
    )
    }
  }

  export default Teams;