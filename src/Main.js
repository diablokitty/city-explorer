import React from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      cityData: {},
      error: false,
      errorMessage: ''
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
    let response = await axios.get(`https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.city}&format=json`);
    console.log(response.data[0]);
    this.setState({
      cityData: response.data[0]
    })
    console.log(this.state.cityData.lon);

  }

  render() {

    let locCoord = <section><p>{this.state.cityData.display_name}</p>
      <p>{this.state.cityData.lat}{this.state.cityData.lon}</p>
    </section>



    return (
      <>
        <h1>City Explorer</h1>
        <Form onSubmit={this.handleSubmit}>
          <Form.Label htmlFor="city">Pick a City</Form.Label>
          <Form.Control
            type="text"
            id="city"
            onInput={this.handleInput}
          />

          <Button variant="primary" type="submit" >
            Explore!
          </Button>
        </Form>



        <Card style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Title>Oh, The Places You'll Go!</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">Your Destination</Card.Subtitle>
            <Card.Text>
              {locCoord}
            </Card.Text>
          </Card.Body>
        </Card>

      </>
    );





  }
}


export default Main;