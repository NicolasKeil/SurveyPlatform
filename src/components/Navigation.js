
import React from 'react';

import {ethers} from 'ethers';




 
  const Navigation = ({ account, setAccount }) => {
    const connectHandler = async () => {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = ethers.utils.getAddress(accounts[0])
        setAccount(account);
    }

  
  
  
  return (
    <div className='navbar'>
        <header className='headline'> SurveyPlatform</header> 

            {account ? (
                <button
                    type="button"
                    className='blue-button'
                >
                    {account.slice(0, 6) + '...' + account.slice(38, 42)}
                </button>

            ) : (
                <button
                    type="button"
                    className='blue-button'
                    onClick={connectHandler}
                >
                    Connect
                </button>
            )}

        
    </div>
  );
};

export default Navigation;


