import React from 'react';

function Card(props) {
    return <span className='productCard'>
        <img src={props.image} alt="" />
        <h2>{props.title}</h2>
        <p>${props.price}</p>
        <p>{props.desc}</p>
    </span>;
}
export default Card;