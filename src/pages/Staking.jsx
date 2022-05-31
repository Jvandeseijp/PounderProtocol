import React, {useState, useEffect} from "react";
import { useMoralis } from "react-moralis";
import { ethers } from "ethers";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "../utils/contractConfig";
import { STAKING_ADDRES, STAKING_ABI } from "../utils/stakingconfig";
import axios from "axios";

const Staking = () => {

  const {account, Moralis} =useMoralis();
  const [stakeDuration, setStakeDuration] = useState(0);
  const [tokenStakeAmount, setTokenStakeAmount] = useState(0);
  const [userBalance, setUserBalance] = useState(0);
  const [lockedPounds, setLockedPounds] = useState(0);
  const [rewardsPounds, setRewardsPounds] = useState(0);
  const [price, setPrice] = useState (0)
  const [currentUser, setCurrentUser] = useState({
        'depositAmount':0,
        'reWardsAmount':0,
        'releasTimestamp': 0,
        'isTwoYearLocked': false
  })
  const[btnState, setBtnState] = useState(false);


  useEffect(() => {
   
      async function fetchPrice() {
      let tokenData = await axios.get(
        "https://api.pancakeswap.info/api/v2/tokens/0xbC6246f22f5D6A883E5acCB69016655e1744393C"
      );
      let price = tokenData.data.data["price"];
      setPrice(parseFloat(price));
    }

    fetchPrice();
  }, [price]);


  useEffect(() => {
    async function getUserSpecs() {
      const provider = new ethers.providers.JsonRpcProvider(
        "https://speedy-nodes-nyc.moralis.io/fd883a5568037e2a20cb09de/bsc/mainnet"
      );
      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        CONTRACT_ABI,
        provider
      );
      const balance = await contract.balanceOf(account);
      setUserBalance(ethers.utils.formatEther(balance));
      
    }

    if (account) getUserSpecs();
  }, [account]);


  useEffect(() => {
    async function getUserDeposits() {
      const provider = new ethers.providers.JsonRpcProvider(
        "https://speedy-nodes-nyc.moralis.io/fd883a5568037e2a20cb09de/bsc/mainnet"
      );
      const contract = new ethers.Contract(
        STAKING_ADDRES,
        STAKING_ABI,
        provider
      );
      const balance = await contract.depositStructs(account);
      console.table(
        {
          'depositAmount':ethers.utils.formatEther(balance['depositAmount']),
          'reWardsAmount':ethers.utils.formatEther(balance['returnAmount']),
          'releasTimestamp': ethers.BigNumber.from(balance['releasTimestamp']),
          'isTwoYearLocked': balance['isTwoYearLocked']
          
        }
      )
      
      if(balance){
      setLockedPounds(ethers.utils.formatEther(balance['depositAmount']));
      setRewardsPounds(ethers.utils.formatEther(balance['returnAmount']));
      setCurrentUser({
        'depositAmount':ethers.utils.formatEther(balance['depositAmount']),
        'reWardsAmount':ethers.utils.formatEther(balance['returnAmount']),
        'releasTimestamp': ethers.BigNumber.from(balance['releasTimestamp']),
        'isTwoYearLocked': balance['isTwoYearLocked']
        
      })
    }
    }

    if (account) getUserDeposits();
  }, [account]);

 

  const handleRadioSelect = (e) => {

    setStakeDuration(parseInt(e.target.value));

  }

  const handleStakeAmountChange = (e) => {
    setTokenStakeAmount(e.target.value);
  }

  const handleSubmit = async(event) => {
    const duration = stakeDuration == 12 ? "stakeTokensOneYear" : "stakeTokensTwoYears"

    const sendOptions = {
      contractAddress: STAKING_ADDRES,
      functionName: duration,
      abi: STAKING_ABI,
      params: {
        token: CONTRACT_ADDRESS,
        amount: Moralis.Units.ETH(tokenStakeAmount)
      },
    };
    try{
      const transaction = Moralis.executeFunction(sendOptions);
      console.log(transaction.hash);

      await transaction.wait()


    }catch(e){
      console.log(e)
    }
    

    event.preventDefault();

  }
  const handleApprove = async(event) => {

    const sendOptions = {
      contractAddress: CONTRACT_ADDRESS,
      functionName: 'approve',
      abi: CONTRACT_ABI,
      params: {
        spender: STAKING_ADDRES,
        value: Moralis.Units.ETH(tokenStakeAmount)
      },
    };
    try{
      Moralis.executeFunction(sendOptions)
      setTimeout(()=>{
        setBtnState(true);

      },15000)
       

    }
    
    catch(e){
      console.log(e);
    }
    

    event.preventDefault();

  }

  return (
    <div className="grid grid-cols-12 w-full  text-white">
      <div className="col-span-12 ">
        <div className="flex flex-col justify-center">
          <div className="text-3xl mt-2 self  justify-center font-bold">
            <h2 style={{textAlign: 'center', fontSize: '36px'}}>Lock your tokens and get a Higher APY</h2>
          </div>
          <div style={{marginTop:'10px'}} className="flex justify-center text-sm mb-6  font-Montserrat font-thin">
            The longer you stake, the more you earn!
          </div>
          <div className="grid grid-cols-2 justify-items-center w-full ">
            <div >
              <form style={{backgroundColor:'rgb(32 32 32)', borderWidth:'1px', borderRadius: 15}} className="p-3" onSubmit={!btnState? handleApprove : handleSubmit}>
                <div>
                  <h2 style={{fontSize:22}} className="mb-2 font-bold">Locking period</h2>
                  <div className="mb-2">
                    <div className="flex justify-between ">
                      <p className="text-[14px] ">Lock for 12 months:</p>
                      <p className="text-[14px] ">168.426 % APY</p>
                    </div>
                    <div className="flex justify-between ">
                      <p className="text-[14px] ">Lock for 24 months:</p>
                      <p className="text-[14px]">421.066 % APY</p>
                    </div>
                  </div>
                  <div className="flex">
                    <div>
                      <input type="radio" name="duration" value='12' onClick={handleRadioSelect}/>
                      <label className="ml-1 font-thin">12 months</label>
                    </div>
                    <div className="ml-5">
                      <input type="radio" name="duration" value='24' onClick={handleRadioSelect}/>
                      <label className="ml-1 font-thin">24 months</label>
                    </div>
                  </div>
                  <div className=" text-[12px] mb-6 ">
                    <p></p>
                  </div>
                  <div className="flex flex-col">
                    <div className="mb-10">
                      <h2 className="mb-1 font-bold" style={{fontSize:22}}>Token Amount</h2>
                      <input
                        className="px-3 py-1 w-3/4   text-xs rounded-2xl mx-2 mb-1 "
                        placeholder="Token Amount"
                        value={tokenStakeAmount}                        
                        onChange={handleStakeAmountChange}
                        style={{'color':'black'}}
                      />
                      {account?
                      <p className="text-[12px]" style={{marginTop: 10}}>Balance: {parseFloat(userBalance).toFixed(2)} POUND</p>
                      :
                      ""
                      }
                    </div>
                    <button style={{
                   background:"linear-gradient(90deg, #992BD4 0%, #00CAA4 99.94%, #00CAA4 100.01%)",
                   paddingTop: '0.9rem',
                   paddingBottom: '0.9rem',
                   paddingRight: '1.0rem',
                   paddingLeft: '1.0rem',
                   maxWidth: '150px',
                   borderRadius: 22,
                   fontSize: 13,
                   
                }}
                className="self-center mb-8 bg-PeacockGreen px-5 font-bold text-xs py-1  border border-white rounded-lg">
                      {!btnState? 'Approve' : 'Submit'}
                    </button>
                  </div>
                  <div>
                    <ul className=" ml-6 list-disc text-[12px] mb-4 ">
                      <li className="">
                        You need to lock a minimum amount of 1000 POUND
                      </li>
                      <li> You can lock a maximum of 25000 POUND</li>
                    </ul>
                  </div>
                </div>
              </form>
            </div>
            <div style={{borderWidth: 2, borderRadius: 5}} className="border bg-black border-white w-full rounded-lg ml-5">
             
             {account?
              <form style={{backgroundColor:'rgb(32 32 32)', borderWidth:'1px', borderRadius: 15}}className="p-3 ">
                <div>

                  <div>
                    <p className="font-bold">Your Rewards</p>
                          
                  </div>

                  <div className="border mt-2 border-white rounded-lg py-1 px-2">
                    <p className=" mt-2 text-[12px]">POUND Locked</p>
                    <p className=" mt-2  ">{lockedPounds} POUND</p>
                    <p className=" mt-1 text-[12px] ">{new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                      }).format(lockedPounds * price)}</p>
                  </div>
                  <p style={{marginTop:10}} className="text-[12px]">
                    Locked untill: {Date(parseInt(currentUser['releasTimestamp'], 16))}
                    </p>
                </div>
                <div className="flex flex-col">
                  <div className="border mt-2 border-white rounded-lg py-1 px-2">
                    <p className=" mt-2 text-[12px]">Pending POUND Rewards</p>
                    <p className=" mt-2  ">{parseFloat(rewardsPounds).toFixed(2)} POUND</p>
                    <p className=" mt-1 text-[12px] ">{new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                      }).format(rewardsPounds * price)}</p>
                  </div>
                  <p className="text-[12px]">
                    {/*Lock until: Fri Jan 27 2023 14:02:35*/}
                  </p>
                  <button disabled='true' className=" rounded-xl w-fit text-white px-2 py-1 self-center mt-5 border-white border bg-PeacockGreen font-bold text-[10px]"
                  style={{
                    background:"linear-gradient(90deg, #992BD4 0%, #00CAA4 99.94%, #00CAA4 100.01%)",
                    paddingTop: '1.0rem',
                    paddingBottom: '1.0rem',
                    paddingRight: '1.0rem',
                    paddingLeft: '1.0rem',
                    maxWidth: '150px',
                    borderRadius: 22,
                    fontSize: 13

                
                  }}>
                    Claim Rewards
                  </button>
                  <div className="mt-16">
                    <div className="flex justify-between text-[12px]">
                      <p>Current APY:</p>
                      <p>{currentUser['isTwoYearLocked']? '168.426' : '421.066'}%</p>
                    </div>
                    <div className="flex justify-between text-[12px]">
                      
                    </div>
                    <div className="flex justify-between text-[12px]">
                      <p>Claimable:</p>
                      <p>{rewardsPounds} POUND</p>
                    </div>
                  </div>
                </div>
              </form>
              :
              <div style={{'display':'flex', 'justifyContent':'center', 'marginTop':'40%'}}>
              <h2>Connect to Metamask first</h2>
              </div>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Staking;
