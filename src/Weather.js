import React from 'react';
import Card from 'react-bootstrap/Card';



class Weather extends React.Component {

  render() {
    // console.log(this.props.weatherData);
    return (
      <>
        {
          this.props.error
            ?
            <p>{this.props.errorMessage}</p>
            :
            <Card bg='dark' text='light' style={{ width: '18rem' }}>
              <Card.Body>
                <Card.Title>Date: {this.props.weatherData.date}</Card.Title>
                <Card.Text>
                  Forecast: {this.props.weatherData.description}
                </Card.Text>
                <Card.Text>
                  High: {this.props.weatherData.highTemp}
                </Card.Text>
                <Card.Text>
                  Low: {this.props.weatherData.lowTemp}
                </Card.Text>
              </Card.Body>
            </Card>

        }
      </>
    )
  };
}
export default Weather;