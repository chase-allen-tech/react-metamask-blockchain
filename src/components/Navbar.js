import React from 'react';

const Navbar = (props) => {
    const { account } = props;
    return (
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
            <a
                className="navbar-brand col-sm-3 col-md-2 mr-0"
                href="http://www.dappuniversity.com/bootcamp"
                target="_blank"
                rel="noopener noreferrer"
            >
                Dapp University's Blockchain Marketplace
        </a>
            <ul className="navbar-nav px-3">
                <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
                    <small className="text-white"><span id="account">{account}</span></small>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;