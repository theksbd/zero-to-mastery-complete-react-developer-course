import { Component } from 'react';
import './Card.css';

class Card extends Component {
  render() {
    const { id, name, email } = this.props.monster;
    return (
      <div className='card-container'>
        <img
          src={`https://robohash.org/${id}?set=set2`}
          alt={`monster ${name}`}
        />
        <h2>{name}</h2>
        <p>{email}</p>
      </div>
    );
  }
}

export default Card;
