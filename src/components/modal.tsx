import React from 'react';

function Modal({ closeModal }: { closeModal: (value: boolean) => void }) {
    return <span className='modal' onClick={(e) => {if(e.target.className === 'modal') {closeModal(false)}}}>
        <span>
            <h2>Enter Product Info</h2>
            <form>
                <label htmlFor="title">Title:</label>
                <input type="text" id="title" name="title" placeholder='title'/> <br />
                <label htmlFor="category">Category:</label>
                <input type="text" id="category" name="category" placeholder='category'/><br />
                <label htmlFor="price">Price:</label>
                <input type="number" id="price" name="price" placeholder='price'/><br />
                <label htmlFor="description">Description:</label>
                <textarea id="description" name="description" placeholder='description'></textarea>
            </form>
            <button>Submit</button>
        </span>

</span>;
}
export default Modal;