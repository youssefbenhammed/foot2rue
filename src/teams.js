import {test,team} from './requests'

import React from 'react';

import ListGroup from 'react-bootstrap/ListGroup'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Spinner from 'react-bootstrap/Spinner'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Button from 'react-bootstrap/Button'
import ProgressBar from 'react-bootstrap/ProgressBar'
import Table from 'react-bootstrap/Table'


import Pagination from 'react-bootstrap/Pagination'

class Teams extends React.Component {

  constructor(props) {
    super(props)
    this.state = { listeEquipe: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], page: 0, wait: true,homeTeam:[0,0,0,0,0,0,0,0,0,0],awayTeam:[0,0,0,0,0,0,0,0,0,0] }
    this.listeEquipe = this.ListeEquipe.bind(this)
    this.selectedTeam = -1;
    this.render = this.render.bind(this)
    this.handleClickButton = this.handleClickButton.bind(this)
    this.handleClickNext = this.handleClickNext.bind(this)
    this.handleClickPrevious = this.handleClickPrevious.bind(this)
    this.ListeEquipe()
  }
  componentDidMount() {
    this.ListeEquipe()
  }

  ListeEquipe() {
    test(12, this.state.page).then(result => {
      this.setState({ listeEquipe: result })
      this.setState({ wait: false })
      console.log("ok")
    }).catch(err => {
      console.log(err)
    })
  }

  teamName(id,index,type){
    if(type=="away"){
      team(id).then(result=>{
        var awayT=this.state.awayTeam
        awayT[index]=result[0].team_long_name
        this.setState({awayTeam:awayT})
      }).catch(err=>{
        return "UNDEFINED"
      })
    }
    else{
      team(id).then(result=>{
        var homeT=this.state.homeTeam
        homeT[index]=result[0].team_long_name
        this.setState({homeTeam:homeT})
      }).catch(err=>{
        return "UNDEFINED"
      })
    }
    
  }

  handleClickNext() {
    this.setState({ page: this.state.page + 1, wait: true })
    this.ListeEquipe()
  }
  handleClickPrevious() {
    if (this.state.page > 0) {
      this.setState({ page: this.state.page - 1, wait: true })
      this.ListeEquipe()
    }

  }
  handleClickButton(number) {
    this.setState({ page: this.state.page + number, wait: true })
    this.ListeEquipe()
  }

  render() {
    return (
      <Container fluid="true" >
        <Row>
          <Col xs={3}>
            <ListGroup as="ul">
              <ListGroup.Item as="li" variant="success">
                <div style={{ display: 'flex', justifyContent: 'center' }}>TEAMS</div>
              </ListGroup.Item>
              {this.state.wait === false && this.state.listeEquipe.map((equipe, index) => {
                return <ListGroup.Item onClick={() => {this.setState({ selectedTeam: index})
                this.state.listeEquipe[index].matchs.slice(0, 10).map((match, index) => {
                this.teamName(match.away_team_api_id,index,"away")
                this.teamName(match.home_team_api_id,index,"home")})}} as="li" active={this.state.selectedTeam === index && true} >
                  {equipe.team_long_name}
                </ListGroup.Item>
              })}
              {this.state.wait === true && this.state.listeEquipe.map((equipe, index) => {
                return <ListGroup.Item as="li">
                  <Spinner animation="border" size="sm" />
                </ListGroup.Item>
              })}
            </ListGroup>
            <Pagination>
              <Pagination.Prev onClick={this.handleClickPrevious} />
              <Pagination.Item active="true" onClick={() => this.handleClickButton(0)}>{1 + this.state.page}</Pagination.Item>
              <Pagination.Item onClick={() => this.handleClickButton(1)}>{2 + this.state.page}</Pagination.Item>
              <Pagination.Item onClick={() => this.handleClickButton(2)}>{3 + this.state.page}</Pagination.Item>
              <Pagination.Item onClick={() => this.handleClickButton(3)}>{4 + this.state.page}</Pagination.Item>
              <Pagination.Item onClick={() => this.handleClickButton(4)}>{5 + this.state.page}</Pagination.Item>
              <Pagination.Next onClick={this.handleClickNext} />
            </Pagination>
          </Col>
          <Col>
            {(this.state.selectedTeam === -1 || this.state.selectedTeam === undefined) &&
              <Jumbotron>
                <h1>Welcome to Foot2Rue</h1>
                <p>
                  Our system allows you to have the latest statistics from your favorite teams.
              {this.state.selectedTeam}
                </p>
                <p>
                  <Button variant="primary" onClick={() => window.open("https://www.youtube.com/watch?v=OalJZhbmO8E")}>Demo</Button>
                </p>
              </Jumbotron>
            }
            {(this.state.selectedTeam !== -1 && this.state.selectedTeam !== undefined) &&
              <Jumbotron>
                <h1>{this.state.listeEquipe[this.state.selectedTeam].team_long_name}</h1>
                <Row>
                  <Col xs={3}><div><h6>Dribbling :</h6></div></Col>
                  <Col>
                    {this.state.listeEquipe[this.state.selectedTeam].team_attributes[0] !== undefined && <p><ProgressBar now={this.state.listeEquipe[this.state.selectedTeam].team_attributes.slice(-1)[0].buildUpPlayDribbling} label={this.state.listeEquipe[this.state.selectedTeam].team_attributes.slice(-1)[0].buildUpPlayDribblingClass} /></p>}</Col>

                </Row>

                <Row>
                  <Col xs={3}><div><h6>Build-up Play Passing :</h6></div></Col>
                  <Col>
                    {this.state.listeEquipe[this.state.selectedTeam].team_attributes[0] !== undefined && <p><ProgressBar now={this.state.listeEquipe[this.state.selectedTeam].team_attributes.slice(-1)[0].buildUpPlayPassing} label={this.state.listeEquipe[this.state.selectedTeam].team_attributes.slice(-1)[0].buildUpPlayPassingClass} /></p>}</Col>

                </Row>


                <Row>
                  <Col xs={3}><div><h6>Speed :</h6></div></Col>
                  <Col>
                    {this.state.listeEquipe[this.state.selectedTeam].team_attributes[0] !== undefined && <p><ProgressBar now={this.state.listeEquipe[this.state.selectedTeam].team_attributes.slice(-1)[0].buildUpPlaySpeed} label={this.state.listeEquipe[this.state.selectedTeam].team_attributes.slice(-1)[0].buildUpPlaySpeedClass} /></p>}</Col>

                </Row>


                <Row>
                  <Col xs={3}><div><h6>Crossing :</h6></div></Col>
                  <Col>
                    {this.state.listeEquipe[this.state.selectedTeam].team_attributes[0] !== undefined && <p><ProgressBar now={this.state.listeEquipe[this.state.selectedTeam].team_attributes.slice(-1)[0].chanceCreationCrossing} label={this.state.listeEquipe[this.state.selectedTeam].team_attributes.slice(-1)[0].chanceCreationCrossingClass} /></p>}</Col>

                </Row>


                <Row>
                  <Col xs={3}><div><h6>Creation Passing :</h6></div></Col>
                  <Col>
                    {this.state.listeEquipe[this.state.selectedTeam].team_attributes[0] !== undefined && <p><ProgressBar now={this.state.listeEquipe[this.state.selectedTeam].team_attributes.slice(-1)[0].chanceCreationPassing} label={this.state.listeEquipe[this.state.selectedTeam].team_attributes.slice(-1)[0].chanceCreationPassingClass} /></p>}</Col>

                </Row>


                <Row>
                  <Col xs={3}><div><h6>Creation Shooting :</h6></div></Col>
                  <Col>
                    {this.state.listeEquipe[this.state.selectedTeam].team_attributes[0] !== undefined && <p><ProgressBar now={this.state.listeEquipe[this.state.selectedTeam].team_attributes.slice(-1)[0].chanceCreationShooting} label={this.state.listeEquipe[this.state.selectedTeam].team_attributes.slice(-1)[0].chanceCreationShootingClass} /></p>}</Col>

                </Row>


                <Row>
                  <Col xs={3}><div><h6>Defence Agression :</h6></div></Col>
                  <Col>
                    {this.state.listeEquipe[this.state.selectedTeam].team_attributes[0] !== undefined && <p><ProgressBar now={this.state.listeEquipe[this.state.selectedTeam].team_attributes.slice(-1)[0].defenceAggression} label={this.state.listeEquipe[this.state.selectedTeam].team_attributes.slice(-1)[0].defenceAggressionClass} /></p>}</Col>

                </Row>


                <Row>
                  <Col xs={3}><div><h6>defence Pressure :</h6></div></Col>
                  <Col>
                    {this.state.listeEquipe[this.state.selectedTeam].team_attributes[0] !== undefined && <p><ProgressBar now={this.state.listeEquipe[this.state.selectedTeam].team_attributes.slice(-1)[0].defencePressure} label={this.state.listeEquipe[this.state.selectedTeam].team_attributes.slice(-1)[0].defencePressureClass} /></p>}</Col>

                </Row>


                <Row>
                  <Col xs={3}><div><h6>defence Team Width :</h6></div></Col>
                  <Col>
                    {this.state.listeEquipe[this.state.selectedTeam].team_attributes[0] !== undefined && <p><ProgressBar now={this.state.listeEquipe[this.state.selectedTeam].team_attributes.slice(-1)[0].defenceTeamWidth} label={this.state.listeEquipe[this.state.selectedTeam].team_attributes.slice(-1)[0].defenceTeamWidthClass} /></p>}</Col>

                </Row>


                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Team A</th>
                      <th>Score</th>
                      <th>Team B</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.listeEquipe[this.state.selectedTeam].matchs.slice(0, 10).map((match, index) => {
                      
                      return <tr>
                              <td>{index+1}</td>
                              <td>{this.state.homeTeam[index]}</td>
                              <td >{match.away_team_goal+"-"+match.home_team_goal}</td>
                              <td>{this.state.awayTeam[index]}</td>
                            </tr>
                    })}
                  </tbody>

                </Table>
              </Jumbotron>
            }
          </Col>
        </Row>
      </Container>
    )
  }
}

export default Teams;