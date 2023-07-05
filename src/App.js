import logo from './logo.svg';
import './App.css';
import './index.css';


import { useState, useEffect } from 'react';
import { ethers, utils } from "ethers";
import abi from "./contracts/SurveyContract.json";

// Components
import Navigation from './components/Navigation.js';
import Disclaimer from './components/Disclaimer.js';



function App() {

  const contractAddress = '0x89ed3f1553d98029ac95bf34cf2fca63c89bf842';
  const contractABI = abi.abi;

  const [account, setAccount] = useState(null)
  const [error, setError] = useState(null);

  const [inputValue, setInputValue] = useState({ topic: "", answerOne: "", answerTwo: "", answerThree:"", answerFour: ""});

  const [currentTopic, setCurrentTopic] = useState(null);
  const [currentAnswerOne, setCurrentAnswerOne] = useState(null);
  const [currentAnswerTwo, setCurrentAnswerTwo] = useState (null);
  const [currentAnswerThree, setCurrentAnswerThree] = useState(null);
  const [currentAnswerFour, setCurrentAnswerFour] = useState (null);

  const [voteCountsAo, setVoteCountsAo] = useState(null);
  const [voteCountsAtw, setVoteCountsAtw] = useState (null);
  const [voteCountsAth, setVoteCountsAth] = useState(null);
  const [voteCountsAf, setVoteCountsAf] = useState (null);

  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [customerAddress, setCustomerAddress] = useState(null);

  const [canVote, setCanVote] = useState(true);




  const getVoteCounts = async () => {
    try {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const surveyplatform = new ethers.Contract(contractAddress, contractABI, signer);

        const voteCountsAo = await surveyplatform.getCountsAnswerOne();
        console.log("Vote Counts:", voteCountsAo.toString());
        setVoteCountsAo(voteCountsAo.toString())

        const voteCountsAtw = await surveyplatform.getCountsAnswerTwo();
        console.log("Vote Counts:", voteCountsAtw.toString());
        setVoteCountsAtw(voteCountsAtw.toString())

        const voteCountsAth = await surveyplatform.getCountsAnswerThree();
        console.log("Vote Counts:", voteCountsAth.toString());
        setVoteCountsAth(voteCountsAth.toString())

        const voteCountsAf = await surveyplatform.getCountsAnswerFour();
        console.log("Vote Counts:", voteCountsAf.toString());
        setVoteCountsAf(voteCountsAf.toString())
      } else {
        console.log("Can not get the Counts of the Votes!");
        setError("Please refresh the page or try to reconnect to the page. Also check the balance of Goerli Testnet ETH and check if you are connected to the right network!");
      }
    } catch (error) {
      console.log(error)
    }
  }


  const setTopicHandler = async (event) => {
    event.preventDefault();
    try {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const surveyplatform = new ethers.Contract(contractAddress, contractABI, signer);

        const txn = await surveyplatform.setTopic(utils.formatBytes32String(inputValue.topic));
        console.log("Setting the topic...");
        await txn.wait();
        console.log("Topic set", txn.hash);
        await getTopic();

      } else {
        console.log("Can not set the topic.");
        setError("Please refresh the page or try to reconnect to the page. Also check the balance of Goerli Testnet ETH and check if you are connected to the right network!");
      }
    } catch (error) {
      console.log(error)
    }
  }
  const getTopic = async () => {
    try {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const surveyplatform = new ethers.Contract(contractAddress, contractABI, signer);

        let topic = await surveyplatform.topic();
        topic = utils.parseBytes32String(topic);
        setCurrentTopic(topic.toString());
      } else {
        console.log("Can not get the current topic.");
        setError("Please refresh the page or try to reconnect to the page. Also check the balance of Goerli Testnet ETH and check if you are connected to the right network!");
      }
    } catch (error) {
      console.log(error)
    }
  }


  const voteAnswerOne = async (event) => {
    event.preventDefault();
    try {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const surveyplatform = new ethers.Contract(contractAddress, contractABI, signer);

        const txn = await surveyplatform.voteAnswerOne();
        console.log("Vote Answer 1...");
        await txn.wait();
        console.log("Answer 1 voted", txn.hash);
        await getAnswerOne();
        await getVoteCounts();
        await setIfVoted();
        setCanVote(false);
      } else {
        console.log("Can not vote the first Answer!");
        setError("Please refresh the page or try to reconnect to the page. Also check the balance of Goerli Testnet ETH and check if you are connected to the right network!");
      }
    } catch (error) {
      console.log(error)
    }
  }
  const setAnswerOneHandler = async (event) => {
    event.preventDefault();
    try {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const surveyplatform = new ethers.Contract(contractAddress, contractABI, signer);

        const txn = await surveyplatform.setAnswerOne(utils.formatBytes32String(inputValue.answerOne));
        console.log("Setting Answer 1...");
        await txn.wait();
        console.log("Answer 1 set", txn.hash);
        await getAnswerOne();

      } else {
        console.log("Can not set the first Answer.");
        setError("Please refresh the page or try to reconnect to the page. Also check the balance of Goerli Testnet ETH and check if you are connected to the right network!");
      }
    } catch (error) {
      console.log(error)
    }
  }
  const getAnswerOne = async () => {
    try {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const surveyplatform = new ethers.Contract(contractAddress, contractABI, signer);

        let answerOne = await surveyplatform.answerOne();
        answerOne = utils.parseBytes32String(answerOne);
        setCurrentAnswerOne(answerOne.toString());
      } else {
        console.log("Can not fetch the first Answer!");
        setError("Please refresh the page or try to reconnect to the page. Also check the balance of Goerli Testnet ETH and check if you are connected to the right network!");
      }
    } catch (error) {
      console.log(error)
    }
  }


  const voteAnswerTwo = async (event) => {
    event.preventDefault();
    try {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const surveyplatform = new ethers.Contract(contractAddress, contractABI, signer);

        const txn = await surveyplatform.voteAnswerTwo();
        console.log("Vote Answer 2...");
        await txn.wait();
        console.log("Answer 2 voted", txn.hash);
        await getAnswerTwo();
        await getVoteCounts();
        await setIfVoted();
        setCanVote(false);
      } else {
        console.log("Can not vote the second Answer.");
        setError("Please refresh the page or try to reconnect to the page. Also check the balance of Goerli Testnet ETH and check if you are connected to the right network!");
      }
    } catch (error) {
      console.log(error)
    }
  }
  const setAnswerTwoHandler = async (event) => {
  event.preventDefault();
  try {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const surveyplatform = new ethers.Contract(contractAddress, contractABI, signer);

      const txn = await surveyplatform.setAnswerTwo(utils.formatBytes32String(inputValue.answerTwo));
      console.log("Setting Answer 2...");
      await txn.wait();
      console.log("Answer 2 set", txn.hash);
      await getAnswerTwo();

    } else {
      console.log("Can not set the second Answer.");
      setError("Please refresh the page or try to reconnect to the page. Also check the balance of Goerli Testnet ETH and check if you are connected to the right network!");
    }
  } catch (error) {
    console.log(error)
  }
  }
  const getAnswerTwo = async () => {
  try {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const surveyplatform = new ethers.Contract(contractAddress, contractABI, signer);

      let answerTwo = await surveyplatform.answerTwo();
      answerTwo = utils.parseBytes32String(answerTwo);
      setCurrentAnswerTwo(answerTwo.toString());
    } else {
      console.log("Can not fetch the second Answer.");
      setError("Please refresh the page or try to reconnect to the page. Also check the balance of Goerli Testnet ETH and check if you are connected to the right network!");
    }
  } catch (error) {
    console.log(error)
  }
  }


  const voteAnswerThree = async (event) => {
    event.preventDefault();
    try {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const surveyplatform = new ethers.Contract(contractAddress, contractABI, signer);

        const txn = await surveyplatform.voteAnswerThree();
        console.log("Vote Answer 3...");
        await txn.wait();
        console.log("Answer 3 voted", txn.hash);
        await getAnswerThree();
        await getVoteCounts();
        await setIfVoted();
        setCanVote(false);
      } else {
        console.log("Can not the third Answer.");
        setError("Please refresh the page or try to reconnect to the page. Also check the balance of Goerli Testnet ETH and check if you are connected to the right network!");
      }
    } catch (error) {
      console.log(error)
    }
  }
  const setAnswerThreeHandler = async (event) => {
  event.preventDefault();
  try {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const surveyplatform = new ethers.Contract(contractAddress, contractABI, signer);

      const txn = await surveyplatform.setAnswerThree(utils.formatBytes32String(inputValue.answerThree));
      console.log("Setting Answer 3...");
      await txn.wait();
      console.log("Answer 3 set", txn.hash);
      await getAnswerThree();

    } else {
      console.log("Can not the third Answer!");
      setError("Please refresh the page or try to reconnect to the page. Also check the balance of Goerli Testnet ETH and check if you are connected to the right network!");
    }
  } catch (error) {
    console.log(error)
  }
  }
  const getAnswerThree = async () => {
  try {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const surveyplatform = new ethers.Contract(contractAddress, contractABI, signer);

      let answerThree = await surveyplatform.answerThree();
      answerThree = utils.parseBytes32String(answerThree);
      setCurrentAnswerThree(answerThree.toString());
    } else {
      console.log("Can not fetch the third Answer!");
      setError("Please refresh the page or try to reconnect to the page. Also check the balance of Goerli Testnet ETH and check if you are connected to the right network!.");
    }
  } catch (error) {
    console.log(error)
  }
  }


  const voteAnswerFour = async (event) => {
    event.preventDefault();
    try {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const surveyplatform = new ethers.Contract(contractAddress, contractABI, signer);

        const txn = await surveyplatform.voteAnswerFour();
        console.log("Vote Answer 4...");
        await txn.wait();
        console.log("Answer 4 voted", txn.hash);
        await getAnswerFour();
        await getVoteCounts();
        await setIfVoted();
        setCanVote(false);
      } else {
        console.log("Can not votre the fourth Answer!");
        setError("Please refresh the page or try to reconnect to the page. Also check the balance of Goerli Testnet ETH and check if you are connected to the right network!.");
      }
    } catch (error) {
      console.log(error)
    }
  }
  const setAnswerFourHandler = async (event) => {
  event.preventDefault();
  try {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const surveyplatform = new ethers.Contract(contractAddress, contractABI, signer);

      const txn = await surveyplatform.setAnswerFour(utils.formatBytes32String(inputValue.answerFour));
      console.log("Setting Answer 4...");
      await txn.wait();
      console.log("Answer 4 set", txn.hash);
      await getAnswerFour();

    } else {
      console.log("Can not set the fourth Answer!");
      setError("Please refresh the page or try to reconnect to the page. Also check the balance of Goerli Testnet ETH and check if you are connected to the right network!.");
    }
  } catch (error) {
    console.log(error)
  }
  }
  const getAnswerFour = async () => {
  try {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const surveyplatform = new ethers.Contract(contractAddress, contractABI, signer);

      let answerFour = await surveyplatform.answerFour();
      answerFour = utils.parseBytes32String(answerFour);
      setCurrentAnswerFour(answerFour.toString());
    } else {
      console.log("Can not fetch the fourth Answer!");
      setError("Please refresh the page or try to reconnect to the page. Also check the balance of Goerli Testnet ETH and check if you are connected to the right network!.");
    }
  } catch (error) {
    console.log(error)
  }
  }



  const checkIfWalletIsConnected = async () => {
    try {
      if (window.ethereum) {
        // const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
        // const account = accounts[0];
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        
        const account = ethers.utils.getAddress(accounts[0])
       
        setAccount(account);
        setIsWalletConnected(true);
        setCustomerAddress(account);
        console.log("Account Connected: ", account);
      } else {
        setError("Please install a MetaMask wallet to use our bank.");
        console.log("No Metamask detected");
      }
    } catch (error) {
      console.log(error);
    }
  }

  const setIfVoted = async () => {
    try {
      if(window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const surveyplatform = new ethers.Contract(contractAddress, contractABI, signer); 

        const canVote = await surveyplatform.voted(account);
        setCanVote(!canVote);
        console.log(!canVote);
      } else {
        console.log("Can not check if the Customer has already voted!");
        setError("Please refresh the page or try to reconnect to the page. Also check the balance of Goerli Testnet ETH and check if you are connected to the right network!.");
      }
    } catch (error) {
      console.log(error)
    }
  }    

  const getOwner = async () => {
    try {
      if(window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const surveyplatform = new ethers.Contract(contractAddress, contractABI, signer); 

        let platformOwner = await surveyplatform.platformOwner();
        setIsOwner(platformOwner);
      } else {
        console.log("Can not get the address of the onwer!");
        setError("Please refresh the page or try to reconnect to the page. Also check the balance of Goerli Testnet ETH and check if you are connected to the right network!.");
      }
    } catch (error) {
      console.log(error)
    }
  }    
  
  
  const handleInputChange = (event) => {
    setInputValue(prevFormData => ({ ...prevFormData, [event.target.name]: event.target.value }));
  }


  useEffect(() => {
    checkIfWalletIsConnected();
    getTopic();
    getAnswerOne();
    getAnswerTwo();
    getAnswerThree();
    getAnswerFour();
    getVoteCounts();
    setIfVoted();
    getOwner(); 
    setCustomerAddress();
  },[isWalletConnected])


  return isWalletConnected ? (
    <body >
    
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
                    onClick={checkIfWalletIsConnected}
                >
                    Connect
                </button>
            )}
    </div>

        <div className="container">
         { isOwner==account ? (<form > <input type="text" onChange={handleInputChange} name="topic" placeholder="Enter a Topic" value={inputValue.topic}/> <button onClick={setTopicHandler}> Set Topic </button> </form>) : (<p></p>) } 
          
          <header className='topic'>{currentTopic}</header>
          {canVote ? (<p></p>) : (<p>Thanks for voting👍. Your vote counts!</p>)}

            <div className="row">
            {isOwner==account ? (<form><input type='text' onChange={handleInputChange} name='answerOne' placeholder="Enter Answer 1" value={inputValue.answerOne}/> <button onClick={setAnswerOneHandler}> Answer 1 </button> </form>) : (<p></p>) } 
            {canVote  ? (<button className='button' onClick={voteAnswerOne}> {currentAnswerOne}</button>) : (<p></p>) } 

            
            {canVote  ? (<button className='button' onClick={voteAnswerTwo}> {currentAnswerTwo}</button>) : (<p></p>) } 
            {isOwner==account ? (<form> <input type='text' onChange={handleInputChange} name='answerTwo' placeholder="Enter Answer 2" value={inputValue.answerTwo}/><button onClick={setAnswerTwoHandler}> Answer 2 </button></form>) : (<p></p>) } 
            </div>
            
            <div className="row">
            {isOwner==account ? (<form> <input type='text' onChange={handleInputChange} name='answerThree' placeholder="Enter Answer 3" value={inputValue.answerThree}/><button onClick={setAnswerThreeHandler}> Answer 3 </button></form>) : (<p></p>) } 
            {canVote ? (<button className='button' onClick={voteAnswerThree}> {currentAnswerThree}</button>) : (<p></p>) } 

            {canVote ? (<button className='button' onClick={voteAnswerFour}> {currentAnswerFour}</button>) : (<p></p>) } 
            {isOwner==account ? (<form><input type='text' onChange={handleInputChange} name='answerFour' placeholder="Enter Answer 4" value={inputValue.answerFour}/><button onClick={setAnswerFourHandler}> Answer 4 </button></form>) : (<p></p>) } 

            </div>
        </div>

      <div className='row-count'> 
        <form className='counts'>
          <p> <u>{currentAnswerOne}</u>: {voteCountsAo}  </p>
          <p> <u>{currentAnswerTwo}</u>: {voteCountsAtw}  </p>
          <p> <u>{currentAnswerThree}</u>: {voteCountsAth}  </p>
          <p> <u>{currentAnswerFour}</u>: {voteCountsAf}  </p>
        </form>
      </div>

      <Disclaimer/>

      <d className='color-splash-connect'></d>

    </body>
    
    ): (

    <main>
    <div >
      <Navigation account={account} setAccount={setAccount}  />
      <Disclaimer/>
    </div>
      
    <div className='container'> 
      <p className='row'> Please connect your Meta🦊Mask to see the content of the page. Please use the Goerli Network.</p> 
    </div>

    <div className='color-splash'></div>
   
    
    </main> )
}

export default App;
