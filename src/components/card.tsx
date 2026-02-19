interface CardProps {
    image: string;
    title: string;
    category: string;
    price: number;
    desc: string;
}

function Card(props: CardProps) {
    return <span className='productCard'>
        <img src={props.image} alt="" />
        <h2>{props.title}</h2>
        <p>{props.category}</p>
        <p>${props.price}</p>
        <p>{props.desc}</p>
    </span>;
}
export default Card;