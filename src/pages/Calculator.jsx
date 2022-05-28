import React, { useState, useEffect } from "react";
// import Slider from "rsuite/Slider";
// import "rsuite/dist/rsuite.min.css";
import "rc-slider/assets/index.css";
import TooltipSlider from "../components/TooltipSlider";
import axios from "axios";
import { useMoralis } from "react-moralis";
import { ethers } from "ethers";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../utils/contractConfig";
// const Slider = require("rc-slider");

// const SliderWithTooltip = Slider.createSliderWithTooltip;
// const Range = createSliderWithTooltip(Slider.Range);
const Calculator = () => {
  const { account } = useMoralis();

  const [price, setPrice] = useState(28);
  const [userBalance, setUserbalance] = useState(0);
  const [userTokenInput, setUserTokenInput] = useState(0);
  const [poundAtEntry, setPoundAtEntry] = useState(0);
  const [livePrice, setLivePrice] = useState(0);

  const setCurrentPrice = async () => {
    let tokenData = await axios.get(
      "https://api.pancakeswap.info/api/v2/tokens/0xbC6246f22f5D6A883E5acCB69016655e1744393C"
    );
    let price = tokenData.data.data["price"];

    setPoundAtEntry(parseFloat(price));
    setLivePrice(parseFloat(price));
  };

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
      setUserbalance(ethers.utils.formatEther(balance));
    }

    if (account) getUserSpecs();
  }, [account]);

  useEffect(() => {
    async function fetchPrice() {
      let tokenData = await axios.get(
        "https://api.pancakeswap.info/api/v2/tokens/0xbC6246f22f5D6A883E5acCB69016655e1744393C"
      );
      let price = tokenData.data.data["price"];
      setLivePrice(parseFloat(price));
    }

    fetchPrice();
  }, [livePrice]);

  const handlePoundChange = (e) => {
    setPoundAtEntry(e.target.value);
  };

  const handleInputChange = (e) => {
    setUserTokenInput(e.target.value);
  };

  return (
    <>
      <div className="container lg:max-w-5xl mx-auto py-5 text-white relative">
        <h2 className="md:text-5xl text-3xl font-bold text-center md:leading-normal">
          How much can I earn?
        </h2>
        <p className="text-xl text-center mb-3">Estimate your returns</p>
      </div>

      <div className=" container  rounded-2xl lg:max-w-5xl border-2 border-white  p-8 py-10 mx-auto bg-gradient-to-r from-bluePurple to-PeacockGreen">
        <div className="mx-auto max-w-4xl">
          <div className="grid md:grid-cols-3 grid-cols-1 text-white md:mb-10 mb-5">
            <div className="text-center md:block flex items-center justify-between">
              <h4 className="font-light text-base">POUND Price</h4>
              <h2 className="font-bold text-2xl">${livePrice.toFixed(6)}</h2>
            </div>
            <div className="text-center md:block flex items-center justify-between">
              <h4 className="font-light text-base">APY</h4>
              <h2 className="font-bold text-2xl">56.142,23%</h2>
            </div>
            <div className="text-center md:block flex items-center justify-between">
              <h4 className="font-light text-base">Your Balance</h4>
              <h2 className="font-bold text-2xl">{userBalance}</h2>
            </div>
          </div>

          <div className="grid md:grid-cols-2 grid-cols-1 md:gap-4 pb-5">
            <div className="mb-4">
              <p className="font-medium text-base mb-2 text-white">
                POUND Tokens
              </p>
              <input
                className="h-12 py-2 px-4 font-medium text-sm text-gray-900 rounded-full bg-white w-full"
                value={userTokenInput}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4">
              <p className="font-medium text-base mb-2 text-white">
                Daily Interest
              </p>
              <div className="relative">
                <input
                  className="h-12 py-2 px-4 font-medium text-sm text-gray-900 rounded-full bg-white w-full"
                  placeholder="1,75 %"
                  value="1,75 %"
                />
              </div>
            </div>
            <div className="mb-8">
              <p className="font-medium text-base mb-2 text-white">
                POUND Price
              </p>
              <div className="relative">
                <input
                  className="h-12 py-2 px-4 font-medium text-sm text-gray-900 rounded-full bg-white w-full"
                  value={poundAtEntry}
                  onChange={handlePoundChange}
                />
                <button
                  className="py-2 px-3 text-sm font-bold absolute top-1/2 -translate-y-1/2 right-4"
                  onClick={setCurrentPrice}
                >
                  Current
                </button>
              </div>
            </div>

            <div className="md:col-span-2 col-span-1  relative sm:my-2 my-8">
              <TooltipSlider
                defaultValue={price}
                min={1}
                max={365}
                className="price-slider"
                tipFormatter={(value) =>
                  value > 1 ? `${value} days` : `${value} day`
                }
                onChange={(value) => {
                  setPrice(value);
                }}
              />
            </div>

            <div className="mt-4 md:col-span-2 col-span-1 md:mb-0 mb-2 flex justify-between items-center text-white">
              <p className="font-medium text-base text-left">
                Your initial investment
              </p>
              <p className="font-medium text-base text-right">
                $ {poundAtEntry * userTokenInput}
              </p>
            </div>
            <div className=" md:col-span-2 col-span-1 md:mb-0 mb-2 flex justify-between items-center text-white">
              <p className="font-medium text-base text-left">
                Current Portfolio Value
              </p>
              <p className="font-medium text-base text-right">
                {account
                  ? "$" + (livePrice * userBalance).toFixed(5)
                  : "connect to Metamask first"}
              </p>
            </div>
            <div className=" md:col-span-2 col-span-1 md:mb-0 mb-2 flex justify-between items-center text-white">
              <p className="font-medium text-base text-left">
                POUND rewards estimation
              </p>
              <p className="font-medium text-base text-right">
                {userTokenInput * 1.0175 ** price}
              </p>
            </div>
            <div className=" md:col-span-2 col-span-1 md:mb-0 mb-2 flex justify-between items-center text-white">
              <p className="font-medium text-base text-left">
                Potential return
              </p>
              <p className="font-medium text-base text-right">
                $ {(userTokenInput * 1.0175 ** price * poundAtEntry).toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Calculator;
