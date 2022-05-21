import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { CONTRACT_ABI, CONTRACT_ADDRESS} from '../utils/contractConfig'
import axios from 'axios';

function Footer() {

  const [totalSupply, setTotalSupply] = useState(0);
  const [circulatingSupply, setCirculatingSupply] = useState(0)
  const [ poundPrice, setPoundprice ] = useState(0);
  

  useEffect(() =>{
    async function getCirculatingSupply() {
      const provider = new ethers.providers.JsonRpcProvider('https://speedy-nodes-nyc.moralis.io/fd883a5568037e2a20cb09de/bsc/mainnet');
      const contract = new ethers.Contract(CONTRACT_ADDRESS,CONTRACT_ABI, provider);
      const supply = await contract.getCirculatingSupply();     
      setCirculatingSupply(ethers.utils.formatEther(supply));

    }

    getCirculatingSupply();  
  },[circulatingSupply])

  useEffect(() =>{
    async function getTotalSupply() {
      const provider = new ethers.providers.JsonRpcProvider('https://speedy-nodes-nyc.moralis.io/fd883a5568037e2a20cb09de/bsc/mainnet');
      const contract = new ethers.Contract(CONTRACT_ADDRESS,CONTRACT_ABI, provider);
      const supply = await contract.totalSupply();     
      setTotalSupply(ethers.utils.formatEther(supply));

    }

    getTotalSupply();  
  },[totalSupply])

  useEffect(() => {
    const interval = setInterval(async() => {
      let tokenData = await axios.get('https://api.pancakeswap.info/api/v2/tokens/0xbC6246f22f5D6A883E5acCB69016655e1744393C');
      let price = tokenData.data.data['price'];
      setPoundprice(parseFloat(price));


    }, 10000);
    return () => clearInterval(interval);
  }, [poundPrice]);

 
  return (
    
<div className="Footer">
  {/* Footer Section Start */}
  <div className="bg-[#232323] pb-4   xl:px-0 px-4">
  <div className="bg-gradient-to-r from-[#6760CF] to-[#00CAA4] w-full h-[1px] bg-opacity-20" />
    <div className="container mx-auto lg:max-w-5xl pt-14">
      <div className="grid md:grid-cols-2 grid-cols-1 md:gap-4">
        <div className="p-[1px] max-w-md bg-gradient-to-r from-[#6760CF] to-[#00CAA4] rounded-3xl bg-opacity-20 md:mb-0 mb-5">
          <div className="bg-[#232323] p-4 rounded-3xl">
            <div className="mb-4" style={{ boder: "1px solid #ccc" }}>
              <img className="w-56" src="images/logo.svg" alt="" />
            </div>
            <div className="bg-gradient-to-r from-[#6760CF] to-[#00CAA4] rounded-3xl mt-6 mb-5 -mx-4 h-[1px] bg-opacity-20" />
            <div className="text-sm leading-normal">
              <div className="flex text-white">
                <div className="w-40">Total supply:</div>
                <div>{totalSupply}</div>
              </div>
              <div className="flex text-white">
                <div className="w-40">Circulating supply:</div>
                <div>{circulatingSupply}.</div>
              </div>
              
              <div className="flex text-white">
                <div className="w-40">Market Cap:</div>
                <div>{(totalSupply * poundPrice).toFixed(6)}</div>
              </div>
              <div className="bg-gradient-to-r from-[#6760CF] to-[#00CAA4] rounded-3xl mt-4 -mx-4 h-[1px] bg-opacity-20" />
              <div className="text-white pt-3">
                Current Fixed APY: 56.142,23% (1,75% Every day)
              </div>
            </div>
          </div>
        </div>
        <div className="">
          <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
            <div className="w-32">
              <div className="font-semibold text-white text-base leading-normal mb-2">
                Sitemap
              </div>
              <div>
                <a
                  href="/dashboard"
                  className="text-white hover:text-white text-base leading-normal opacity-90"
                >
                  Dashboard
                </a>
              </div>
              <div>
                <a
                  href="https://pancakeswap.finance/swap?outputCurrency=0xbC6246f22f5D6A883E5acCB69016655e1744393C"
                  target="_blank"
                  className="text-white hover:text-white text-base leading-normal opacity-90"
                >
                  Buy $POUND
                </a>
              </div>
              <div>
                <a
                  href="/calculator"
                  className="text-white hover:text-white text-base leading-normal opacity-90"
                >
                  Calculator
                </a>
              </div>
              {/* <div>
                <a
                  href="#"
                  className="text-white text-base leading-normal opacity-90"
                >
                  Earn
                </a>
              </div> */}
              <div>
                <a
                  href="https://pounder-protocol.gitbook.io/docs/" target="_blank"
                  className="text-white text-base leading-normal opacity-90 hover:text-white"
                >
                  Docs
                </a>
              </div>
            </div>
            <div className="span-col-2">
              <div className="font-semibold text-white mb-2">Follow Us</div>
              <div className="flex items-center pt-2">
                <a href="https://twitter.com/PounderProtocol" target="_blank" className="cursor-pointer mr-3">
                  <img className="w-4" src="images/twitter-icon.svg" alt="" />
                </a>
                <a href="https://t.me/PounderProtocol" target="_blank" className="cursor-pointer mr-3">
                  <img className="w-4" src="images/send-icon.svg" alt="" />
                </a>
                <a href="https://www.facebook.com/PounderProtocol-104801368866236/" target="_blank" className="cursor-pointer mr-3">
                  <img className="w-4" src="images/facebook-icon.svg" alt="" />
                </a>
                <a href="https://www.instagram.com/pounderprotocol/" target="_blank" className="cursor-pointer mr-3">
                  <img className="w-4" src="images/instagram-icon.svg" alt="" />
                </a>
                <a href="https://discord.gg/4mTPwy9j4y" target="_blank" className="cursor-pointer mr-3">
                  <img className="w-4" src="images/discord-icon.svg" alt="" />
                </a>
              </div>
              <div className="pt-1">
                <a
                  href="https://pancakeswap.finance/swap?outputCurrency=0xbC6246f22f5D6A883E5acCB69016655e1744393C"
                  target="_blank"
                  className="text-white hover:text-white hover:no-underline text-sm font-medium rounded-full hover:scale-105 transition transform duration-500 px-5 py-3 mt-4 border-white border white mx-auto inline-block text-center"
                  style={{
                    background:
                      "linear-gradient(90deg, #992BD4 0%, #00CAA4 99.94%, #00CAA4 100.01%)"
                  }}
                >
                  Buy $POUND
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="text-xs font-light opacity-60 text-white pt-5 text-center border-t border-gray-500 mt-7">
      © 2022 POUNDER. All rights Reserved
    </div>
  </div>
</div>

  );
}

export default Footer;
