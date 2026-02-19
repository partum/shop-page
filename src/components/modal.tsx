import { useState } from 'react';

type ModalProps = {
    closeModal: (value: boolean) => void;
    onDataReceived: (data: {
        title: string;
        category: string;
        price: number;
        description: string;
        image: string;

    }) => void;
};

function Modal({ closeModal, onDataReceived }: ModalProps) {
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    //const [data, setData] = useState({});

    function sendDataToParent() {
        const data = {
            title: title,
            category: category,
            price: price,
            description: description,
            image: 'n/a',
            id: Date.now()
        }
        onDataReceived(data)
    }

    return <span className='modal' onClick={(e) => { if ((e.target as HTMLElement).className === 'modal') { closeModal(false) } }}>
        <span>
            <h2>Enter Product Info</h2>
            <form>
                <label htmlFor="title">Title:</label>
                <input type='text' value={title} onChange={e => setTitle(e.target.value)} placeholder='title' required /> <br />
                <label htmlFor="category">Category:</label>
                <input type='text' value={category} onChange={e => setCategory(e.target.value)} placeholder='category' /><br />
                <label htmlFor="price">Price:</label>
                <input type='number' value={price} onChange={e => setPrice(Number(e.target.value))} placeholder='price' /><br />
                <label htmlFor="description">Description:</label>
                <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder='description' />
            </form>
            <button onClick={() => { sendDataToParent(); closeModal(false); }}>Submit</button>
        </span>

    </span>;
}
export default Modal;