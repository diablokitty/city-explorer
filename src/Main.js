import React from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './Main.css';


class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      cityData: {},
      error: false,
      errorMessage: '',
      display: false
    }
  }

  handleInput = (e) => {
    let city = e.target.value;
    this.setState({
      city: city
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    // API request through axios and save in state
    try {
      let response = await axios.get(`https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.city}&format=json`);
      console.log(response.data[0]);
      this.setState({
        cityData: response.data[0],
        error: false,
        display: true
      });

    } catch (error) {
      console.log('error: ', error);
      console.log('error.message: ', error.message);
      this.setState({
        error: true,
        errorMessage: `Something's not right here - ${error.response.status}`
      });
    }
    console.log(this.state.errorMessage);
  };

  render() {

    let locCoord = <section><p>{this.state.cityData.display_name}</p>
      <p>{this.state.cityData.lat}{this.state.cityData.lon}</p>
    </section>

    //let viewMap = <img src = "https://maps.locationiq.com/v3/staticmap?key={process.env.REACT_APP_LOCATIONIQ_API_KEY}&center={this.state.cityData.lat},{this.state.cityData.lon}&zoom=10>" ,"


    return (
      <>
      <main>
        <h1>City Explorer</h1>
        <Form onSubmit={this.handleSubmit}>
          <Form.Label htmlFor="city">Pick a City or Location</Form.Label>
          <Form.Control
            type="text"
            id="city"
            onInput={this.handleInput}
          />

          <Button variant="outline-light"type="submit" >
            Explore!
          </Button>
        </Form>

        {
          this.state.error
            ?
            <p>{this.state.errorMessage}</p>
            :
            this.state.display
            ?
            <Card bg='dark' text='light' style={{ width: '18rem' }}>
              <Card.Body>
                <Card.Title>Oh, The Places You'll Go!</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Your Destination</Card.Subtitle>
                <Card.Img src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${this.state.cityData.lat},${this.state.cityData.lon}&zoom=14`} />
                <Card.Text>
                  {locCoord}
                </Card.Text>
              </Card.Body>
            </Card>
            :
            <Card.Text>Where are we going?</Card.Text>
        }
        </main>
      </>
    );

  }
}


export default Main;

