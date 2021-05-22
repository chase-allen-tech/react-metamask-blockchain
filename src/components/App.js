import React, { useCallback, useEffect, useState } from 'react';
import Web3 from 'web3';
import './App.css';
import Navbar from './Navbar';
import Marketplace from '../abis/Marketplace.json';
import Main from './Main';

const App = () => {
    const [account, setAccount] = useState('');
    const [marketplace, setMarketPlace] = useState({});
    const [productCount, setProductCount] = useState(0);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadWeb3();
        loadBlockchainData();
    }, [loadBlockchainData]);

    const loadWeb3 = async () => {
        console.log('[ethereum]', window.ethereum);
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum);
            await window.ethereum.enable();
        } else if (window.web3) {
            console.log('enter');
            window.web3 = new Web3(window.web3.currentProvider);
        } else {
            window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
        }
    }

    const loadBlockchainData = async () => {
        const web3 = window.web3;
        const accounts = await web3.eth.getAccounts();
        console.log(accounts);
        setAccount(accounts[0]);

        const networkId = await web3.eth.net.getId();
        console.log('[networkID]', networkId);

        // const networkData = Marketplace.networks[networkId];
        const networkData = Marketplace.networks[Object.keys(Marketplace.networks)[0]];
        // console.log('[networkData]', networkData);
        if (networkData) {
            const marketplace = web3.eth.Contract(Marketplace.abi, networkData.address);
            setMarketPlace(marketplace)
            const productCount = await marketplace.methods.productCount().call();
            // console.log('[productCount]', marketplace.methods.products)
            setProductCount(productCount);

            for(let i = 1; i <= productCount; i ++) {
                const product = await marketplace.methods.products(i).call();
                setProducts([...products, product]);
            }

            setLoading(false);
        } else {
            window.alert('Marketplace contract not deployed to detected network.');
        }
    }

    const purchaseProduct = (id, price) => {
        setLoading(true);
        marketplace.methods.purchaseProduct(id).send({ from: account, value: price})
            .once('receipt', receipt => {
                setLoading(false);
            })
    }

    const createProduct = (name, price) => {
        setLoading(true);
        marketplace.methods.createProduct(name, price).send({ from: account })
            .once('receipt', receipt => {
                console.log(receipt);
                setLoading(false);
            });
    }

    return (
        <div>
            <Navbar account={account} />
            <div className="container-fluid mt-5">
                <div className="row">
                    <main role="main" className="col-lg-12 d-flex text-center">
                        {loading
                            ? <div id="loader" className="text-center"><p className="text-center">Loading...</p></div>
                            : <Main
                            products={products}
                            createProduct={createProduct}
                            purchaseProduct={purchaseProduct} />
                        }
                    </main>
                </div>
            </div>
        </div>
    )
}

export default App;