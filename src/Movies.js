import React from 'react';
import Card from 'react-bootstrap/Card';



class Movies extends React.Component {

  render() {
    // console.log(this.props.movieData);
    return (
      <>
        {
          this.props.error
            ?
            <p>{this.props.errorMessage}</p>
            :
            <Card bg='dark' text='light' style={{ width: '18rem' }}>
              <Card.Body>
                <Card.Title>Title: {this.props.movieData.title}</Card.Title>
                <Card.Text>
                  Summary: {this.props.movieData.description}
                </Card.Text>
                <Card.Img variant="bottom" src={this.props.movieData.poster} alt={this.props.movieData.title} />
              </Card.Body>
            </Card>

        }
      </>
    )
  };
}
export default Movies;