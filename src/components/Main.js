import React, { useState } from 'react';

const Main = ({ products, createProduct, purchaseProduct }) => {
    const [productPrice, setProductPrice] = useState(0);
    const [productName, setProductName] = useState('');

    return (
        <div id="content">
            <h1>Add Product</h1>
            <form onSubmit={(event) => {
                event.preventDefault()
                const name = productName
                const price = window.web3.utils.toWei(productPrice.toString(), 'Ether')
                createProduct(name, price)
            }}>
                <div className="form-group mr-sm-2">
                    <input
                        id="productName"
                        type="text"
                        value={productName}
                        onChange={e => setProductName(e.target.value)}
                        className="form-control"
                        placeholder="Product Name"
                        required />
                </div>
                <div className="form-group mr-sm-2">
                    <input
                        id="productPrice"
                        type="text"
                        value={productPrice}
                        onChange={e => setProductPrice(e.target.value)}
                        className="form-control"
                        placeholder="Product Price"
                        required />
                </div>
                <button type="submit" className="btn btn-primary">Add Product</button>
            </form>
            <p> </p>
            <h2>Buy Product</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Price</th>
                        <th scope="col">Owner</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody id="productList">
                    {
                        products.map((product, key) => (
                            <tr key={key}>
                                <th scope="row">{product.id}</th>
                                <td>{product.name}</td>
                                <td>{window.web3.utils.fromWei(product.price)}</td>
                                <td>0x39C7BC5496f4eaaa1fF75d88E079C22f0519E7b9</td>
                                <td>{product.owner}</td>
                                <td>
                                    {!product.purchased
                                        ? <button
                                            name={product.id}
                                            value={product.price}
                                            onClick={(event) => {
                                                purchaseProduct(event.target.name, event.target.value)
                                            }}
                                        >
                                            Buy
                                        </button>
                                        : null
                                    }
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Main;