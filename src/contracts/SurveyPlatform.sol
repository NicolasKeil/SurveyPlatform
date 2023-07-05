// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract SurveyPlatform {
    address public platformOwner;
    string public topic;

    string public answerOne ;
    string public answerTwo;
    string public answerThree;
    string public answerFour;

    bool topicSet = false; 
    bool AnswersSet = false;
    
    mapping (address => bool) public voted;
    mapping(string => uint256) public voteCounts;

    modifier onlyOwner(){
        require(msg.sender == platformOwner);
        _;
    }

    modifier topicAnswersSet (){
        require(topicSet == true);
        require(AnswersSet == true);
        _;
    }

    

    constructor () {
        platformOwner = msg.sender;
    }

    function setTopic (string memory _topic) external {
        require(msg.sender == platformOwner, "You must be the Owner of SurveyPlatform to set the topic!");
        topic = _topic;
        topicSet = true;
    }



    function setAnswerOne (
        string memory _answerOne
    ) external onlyOwner {
        require (topicSet);
        answerOne = _answerOne;
    }

    function voteAnswerOne ()
    external   {
        require(!voted[msg.sender]);
        voted[msg.sender] = true;
        voteCounts[answerOne]++;
        
    }

    function getCountsAnswerOne () public view returns (uint256) {
        return voteCounts[answerOne];
    }




    function setAnswerTwo (
        string memory _answerTwo
    ) external onlyOwner {
        require (topicSet);
        answerTwo = _answerTwo;
    }

    function voteAnswerTwo ()
    external   {
        require(!voted[msg.sender]);
        voteCounts[answerTwo]++; 
        voted[msg.sender] = true;
    }

    function getCountsAnswerTwo () public view returns (uint256) {
        return voteCounts[answerTwo];
    }




    function setAnswerThree (
        string memory _answerThree
    ) external onlyOwner {
        require (topicSet);
        answerThree = _answerThree;
    }

    function voteAnswerThree ()
    external   {
        require(!voted[msg.sender]);
        voteCounts[answerThree]++;
        voted[msg.sender] = true;
    }

    function getCountsAnswerThree () public view returns (uint256) {
        return voteCounts[answerThree];
    }




    function setAnswerFour (
        string memory _answerFour
    ) external onlyOwner {
        require (topicSet);
        answerFour = _answerFour;
    }

    function voteAnswerFour ()
    external  {
        require(!voted[msg.sender]);
        voteCounts[answerFour]++;
        voted[msg.sender] = true;
    }

    function getCountsAnswerFour () public view returns (uint256) {
        return voteCounts[answerFour];
    }

    
}

