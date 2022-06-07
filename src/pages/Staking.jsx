import React, { useState, useEffect } from "react";
import { useMoralis } from "react-moralis";
import { ethers } from "ethers";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "../utils/contractConfig";
import { STAKING_ADDRES, STAKING_ABI } from "../utils/stakingconfig";
import axios from "axios";

const Staking = () => {
  const { account, Moralis } = useMoralis();
  const [stakeDuration, setStakeDuration] = useState(12);
  const [tokenStakeAmount, setTokenStakeAmount] = useState(1000);
  const [userBalance, setUserBalance] = useState(0);
  const [lockedPounds, setLockedPounds] = useState(0);
  const [rewardsPounds, setRewardsPounds] = useState(0);
  const [price, setPrice] = useState(0);
  const [userAllowance, setUserAllowance] = useState(0);

  const [currentUser, setCurrentUser] = useState({
    depositAmount: 0,
    reWardsAmount: 0,
    releasTimestamp: 0,
    isTwoYearLocked: false,
  });
  const [btnState, setBtnState] = useState(false);

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

      const [balance, allowance] = [
        await contract.balanceOf(account),
        await contract.allowance(account, STAKING_ADDRES),
      ];

      setUserAllowance(parseFloat(ethers.utils.formatEther(allowance)));

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

      if (balance) {
        setLockedPounds(ethers.utils.formatEther(balance["depositAmount"]));
        setRewardsPounds(ethers.utils.formatEther(balance["returnAmount"]));
        setCurrentUser({
          depositAmount: ethers.utils.formatEther(balance["depositAmount"]),
          reWardsAmount: ethers.utils.formatEther(balance["returnAmount"]),
          releasTimestamp: ethers.BigNumber.from(balance["releasTimestamp"]),
          isTwoYearLocked: balance["isTwoYearLocked"],
        });
      }
    }

    if (account) getUserDeposits();
  }, [account]);

  const handleRadioSelect = (e) => {
    setStakeDuration(parseInt(e.target.value));
  };

  const handleStakeAmountChange = (e) => {
    setTokenStakeAmount(e.target.value);
  };

  const handleSubmit = async (event) => {
    const duration =
      stakeDuration == 12 ? "stakeTokensOneYear" : "stakeTokensTwoYears";

    const sendOptions = {
      contractAddress: STAKING_ADDRES,
      functionName: duration,
      abi: STAKING_ABI,
      params: {
        token: CONTRACT_ADDRESS,
        amount: Moralis.Units.ETH(tokenStakeAmount),
      },
    };
    try {
      await Moralis.executeFunction(sendOptions);
    } catch (e) {
      console.log(e);
    }

    event.preventDefault();
  };
  const handleApprove = async () => {
    const readOptions = {
      contractAddress: CONTRACT_ADDRESS,
      functionName: "allowance",
      abi: CONTRACT_ABI,
      params: {
        owner_: account,
        spender: STAKING_ADDRES,
      },
    };

    const sendOptions = {
      contractAddress: CONTRACT_ADDRESS,
      functionName: "approve",
      abi: CONTRACT_ABI,
      params: {
        spender: STAKING_ADDRES,
        value: Moralis.Units.ETH(tokenStakeAmount),
      },
    };
    try {
      console.log("................ ");
      console.log(userAllowance);
      const tx = await Moralis.executeFunction(sendOptions);
      tx.wait(5);
      setTimeout(() => {
        console.log(`new amount: ${tokenStakeAmount}`);
        setUserAllowance(tokenStakeAmount);
      }, 12000);
    } catch (e) {
      console.log(e);
    }

    console.log("close");
  };

  return (
    <div className="grid grid-cols-12 w-full  text-white">
      <div className="col-span-12 ">
        <div className="flex flex-col justify-center">
          <div className="text-3xl mt-2 self  justify-center font-bold">
            <h2 style={{ textAlign: "center", fontSize: "36px" }}>
              Lock your tokens and get a Higher APY
            </h2>
          </div>
          <div
            style={{ marginTop: "10px" }}
            className="flex justify-center text-sm mb-6  font-Montserrat font-thin"
          >
            The longer you stake, the more you earn!
          </div>
          <div className="grid grid-cols-2 justify-items-center w-full  gap-10">
            <div class="border bg-[#171717] border-white w-full rounded-2xl px-8 py-6">
              <form className=" h-full">
                <div class=" h-full flex flex-col">
                  <h3 className="font-bold text-2xl">Locking Period</h3>

                  <div className="mb-8 mt-4">
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
                      <input
                        type="radio"
                        name="duration"
                        value="12"
                        onClick={handleRadioSelect}
                      />
                      <label className="ml-1 font-thin">12 months</label>
                    </div>
                    <div className="ml-5">
                      <input
                        type="radio"
                        name="duration"
                        value="24"
                        onClick={handleRadioSelect}
                      />
                      <label className="ml-1 font-thin">24 months</label>
                    </div>
                  </div>
                  <p className="text-[12px] mt-2 italic block">
                    Locked untill:{" "}
                    {Date(parseInt(currentUser["releasTimestamp"], 16))}
                  </p>

                  <div className="flex flex-col mt-10 ">
                    <div className="mb-10">
                      <h2 className="mb-1 font-bold" style={{ fontSize: 22 }}>
                        Token Amount
                      </h2>
                      <input
                        type="number"
                        min="1000"
                        max="25000"
                        className="px-3 py-3 w-full my-2 text-xs rounded-2xl  text-black "
                        placeholder="Token Amount"
                        value={tokenStakeAmount}
                        onChange={handleStakeAmountChange}
                      />
                      {account ? (
                        <p className="text-[12px]" style={{ marginTop: 10 }}>
                          Balance: {parseFloat(userBalance).toFixed(2)} POUND
                        </p>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>

                  <div class="mt-auto pt-10">
                    <button
                      disabled={true}
                      className=" rounded-full w-fit text-white px-3  py-3 self-center  border-white border mx-auto block font-bold cursor-pointer mb-20 min-w-[160px]"
                      type="button"
                      style={{
                        background:
                          "linear-gradient(90deg, #992BD4 0%, #00CAA4 99.94%, #00CAA4 100.01%)",
                      }}
                    >
                      Submit
                    </button>
                    <ul className=" ml-6 list-disc text-[12px] ">
                      <li className="">
                        You need to lock a minimum amount of 1000 POUND
                      </li>
                      <li> You can lock a maximum of 25000 POUND</li>
                    </ul>
                  </div>
                </div>
              </form>
            </div>
            <div className="border bg-[#171717] border-white w-full rounded-2xl px-8 py-6">
              <form className=" h-full">
                {!account ? (
                  <h3
                    style={{
                      justifyContent: "center",
                      display: "flex",
                      marginTop: "40px",
                    }}
                  >
                    Connect To Metamask First!
                  </h3>
                ) : (
                  <div className=" h-full flex flex-col">
                    <div>
                      <div>
                        <h3 className="font-bold text-2xl">Your Rewards</h3>
                      </div>

                      {/* Pound Locked */}
                      <div className="border mt-4 border-white rounded-lg py-1 px-2">
                        <p className=" mt-2 text-[12px]">POUND Locked</p>
                        <p className=" mt-2 text-2xl font-semibold">
                          {lockedPounds} POUND
                        </p>
                        <p className=" mt-1 text-[12px] ">
                          {new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "USD",
                          }).format(lockedPounds * price)}
                        </p>
                      </div>
                      <p className="text-[12px] mt-2 italic">
                        Locked untill:{" "}
                        {Date(parseInt(currentUser["releasTimestamp"], 16))}
                      </p>
                    </div>

                    {/* Pending Pound */}
                    <div className="flex flex-col mt-4 h-full">
                      <div className="border mt-2 border-white rounded-lg py-1 px-2">
                        <p className=" mt-2 text-[12px]">
                          Pending POUND Rewards
                        </p>
                        <p className=" mt-2 text-2xl font-semibold">
                          {parseFloat(rewardsPounds).toFixed(2)} POUND
                        </p>
                        <p className=" mt-1 text-[12px] ">
                          {new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "USD",
                          }).format(rewardsPounds * price)}
                        </p>
                      </div>
                      <p className="text-[12px] mt-2 italic">
                        Locked untill:{" "}
                        {Date(parseInt(currentUser["releasTimestamp"], 16))}
                      </p>

                      <div className="mt-auto pt-10">
                        <button
                          disabled={true}
                          className=" rounded-full w-fit text-white px-3  py-3 self-center  border-white border mx-auto block font-bold cursor-pointer mb-20 min-w-[160px] mt-6 "
                          type="button"
                          style={{
                            background:
                              "linear-gradient(90deg, #992BD4 0%, #00CAA4 99.94%, #00CAA4 100.01%)",
                          }}
                        >
                          Claim Rewards
                        </button>
                        <div className="flex justify-between text-[12px]">
                          <p>Current APY:</p>
                          <p>
                            {currentUser["isTwoYearLocked"]
                              ? "168.426"
                              : "421.066"}
                            %
                          </p>
                        </div>
                        <div className="flex justify-between text-[12px]"></div>
                        <div className="flex justify-between text-[12px]">
                          <p>Claimable:</p>
                          <p>{rewardsPounds} POUND</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Staking;
