import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const ImageCard = ({_id, name, prompt, image}) => {
  return (
    <Card style={{ width: '18rem' }}>
    <Card.Img variant="top" src={image} alt={prompt}/>
    <Card.Body>
      <Card.Title>{name}</Card.Title>
      <Card.Text>
       Prompt: {prompt}
      </Card.Text>
      <Button variant="primary">Go somewhere</Button>
    </Card.Body>
  </Card>
  )
}

export default ImageCard;
