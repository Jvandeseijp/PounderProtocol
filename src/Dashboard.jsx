import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./App.css";
import Calculator from "./pages/Calculator";
import Referral from "./pages/Referral";
import Swap from "./pages/Swap";
import { ethers } from "ethers";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from './utils/contractConfig';

// import Docs from "./pages/Docs";

function Dashboard() {
	let location = useLocation();
	let navigate = useNavigate();
  const [openTab, setOpenTab] = useState(1);
  

  
	useEffect(() => {
		if(location.pathname.includes('dashboard')){
			setOpenTab(1);
		}else if(location.pathname.includes('swap')){
      setOpenTab(2);			
		}else if(location.pathname.includes('calculator')){
      setOpenTab(3);			
		}else if (location.pathname.includes("earn")) {
			setOpenTab(4)
		// }else if (location.pathname.includes("docs")) {
		// 	setOpenTab(5)
    }else{
			setOpenTab(1)
		}
  }, [location]);
	
  
	
	const handleTabClick = (_slug) => {
		navigate(`/${_slug}`);
	}

  return (
    <>
      <div
        className="bg-center bg-cover w-full pb-10 lg:min-h-[calc(100vh-78.5px)]"
        style={{
          backgroundImage:
            "linear-gradient(to left, rgb(0 0 0 / 32%), rgb(0 0 0 / 59%)), url(images/bg-nw.jpg)",
        }}
      >
        <div className="container mx-auto py-3">
          <Tabs color="bg-gradient-to-r from-bluePurple to-PeacockGreen" openTab={openTab} setOpenTab={setOpenTab} handleTabClick={handleTabClick} />
        </div>
      </div>
    </>
  );
}

const Tabs = ({ color, openTab, setOpenTab, handleTabClick }) => {
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full">
          <ul
            className="max-w-3xl mx-auto flex mb-0 list-none overflow-auto pt-3 pb-4 px-3 flex-row justify-between md:px-10"
            role="tablist"
          >
            <li className="-mb-px mr-2 last:mr-0 min-w-[150px] text-center">
              <button
                className={
                  "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded-full border border-white border-opacity-50 block leading-normal w-full " +
                  (openTab === 1 ? "text-white " + color : "text-white")
                }
                onClick={(e) => {
                  e.preventDefault();
                  handleTabClick("dashboard");
                }}
                data-toggle="tab"
                // href="#link1"
                role="tablist"
              >
                Dashboard
              </button>
            </li>
            <li className="-mb-px mr-2 last:mr-0 min-w-[150px] text-center">
              <button
                className={
                  "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded-full border border-white border-opacity-50 block leading-normal w-full " +
                  (openTab === 2 ? "text-white " + color : "text-white")
                }
                onClick={(e) => {
                  e.preventDefault();
                  handleTabClick("swap");
                }}
                data-toggle="tab"
                // href="#link2"
                role="tablist"
              >
                Swap
              </button>
            </li>
            <li className="-mb-px mr-2 last:mr-0 min-w-[150px] text-center">
              <button
                className={
                  "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded-full border border-white border-opacity-50 block leading-normal w-full " +
                  (openTab === 3 ? "text-white " + color : "text-white")
                }
                onClick={(e) => {
                  e.preventDefault();
                  handleTabClick("calculator");
                }}
                data-toggle="tab"
                // href="#link3"
                role="tablist"
              >
                Calculator
              </button>
            </li>
            {/* <li className="-mb-px mr-2 last:mr-0 min-w-[150px] text-center">
              <button
                className={
                  "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded-full border border-white border-opacity-50 block leading-normal w-full " +
                  (openTab === 4 ? "text-white " + color : "text-white")
                }
                onClick={(e) => {
                  e.preventDefault();
                  handleTabClick("earn");
                }}
                data-toggle="tab"
                // href="#link4"
                role="tablist"
              >
                Earn
              </button>
            </li> */}
            <li className="-mb-px mr-2 last:mr-0 min-w-[150px] text-center">
              <a href="https://pounder-protocol.gitbook.io/docs/" target="_blank"
                className={
                  "hover:text-white hover:no-underline text-xs font-bold uppercase px-5 py-3 shadow-lg rounded-full border border-white border-opacity-50 block leading-normal w-full " +
                  (openTab === 5 ? "text-white " + color : "text-white")
                }
                // onClick={(e) => {
                //   e.preventDefault();
                //   handleTabClick("docs");
                // }}
                data-toggle="tab"
                // href="#link5"
                role="tablist"
              >
                Docs
              </a>
            </li>
          </ul>
          <div className="relative flex flex-col min-w-0 w-full">
            <div className="px-4 py-5 flex-auto">
              <div className="tab-content tab-space">
                <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                  <DashboardTab />
                </div>
                <div
                  className={openTab === 2 ? "block" : "hidden"}
                  id="link2"
                >
                  <Swap/>
                </div>
                <div className={openTab === 3 ? "block" : "hidden"} id="link3">
                  <Calculator />
                </div>
                <div className={openTab === 4 ? "block" : "hidden"} id="link4">
                  <Referral />
                </div>
                {/* <div className={openTab === 5 ? "block" : "hidden"} id="link4">
                  <Docs />
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

function DashboardTab() {

  const [totalSupply, setTotalSupply] = useState(0);
  
  useEffect(() =>{
    async function getTotalSupply() {
      const provider = new ethers.providers.JsonRpcProvider('https://speedy-nodes-nyc.moralis.io/fd883a5568037e2a20cb09de/bsc/mainnet');
      const contract = new ethers.Contract(CONTRACT_ADDRESS,CONTRACT_ABI, provider);
      const supply = await contract.totalSupply();
      console.log(supply);
      console.log(ethers.utils.formatEther(supply))
      setTotalSupply(ethers.utils.formatEther(supply));

    }

    getTotalSupply();  
  },[totalSupply])

 
  return (
    <div className="Dashboard">
      <div>
        <div className="container lg:max-w-5xl mx-auto py-5 text-white relative">
          <h1 className="md:text-5xl text-3xl font-bold text-center md:leading-normal">
            Your Personal Dashboard
          </h1>
          
          <p className="text-xl text-center mb-3">Keep track of Growth</p>
        </div>
        <div className="container mx-auto">
          <div
            className="mb-6 col-span-12 border border-gray-200 p-4 lg:p-12 rounded-2xl text-center mx-auto md:max-w-full"
            data-aos="zoom-in"
            data-aos-duration={1000}
            style={{ backgroundColor: "#222" }}
          >
            <div className="grid sm:grid-cols-3 grid-cols-1 text-white gap-8">
              <div>
                <h1 className="text-xl font-thin">Market Cap</h1>
                <p className="font-bold text-lg">$ 0</p>
              </div>
              <div>
                <h1 className="text-xl font-thin">POUND Price</h1>
                <p className="font-bold text-lg">$ 0</p>
              </div>
              <div>
                <h1 className="text-xl font-thin">Next Rebase</h1>
                <p className="font-bold text-lg">00 : 30 : 00</p>
              </div>
              <div>
                <h1 className="text-xl font-thin">Circulating Supply</h1>
                <p className="font-bold text-lg">{totalSupply}</p>
              </div>
              <div>
                <h1 className="text-xl font-thin">Backed Liquidity</h1>
                <p className="font-bold text-lg">0 %</p>
              </div>
              <div>
                <h1 className="text-xl font-thin">Average POUND Holding</h1>
                <p className="font-bold text-lg">$ 0</p>
              </div>
            </div>
          </div>
          <div className="grid lg:grid-cols-12 gap-6 text-white">
            <div
              className="lg:col-span-4 border border-gray-200 p-4 rounded-2xl text-center"
              data-aos="zoom-in"
              data-aos-duration={1000}
              style={{ backgroundColor: "#222" }}
            >
              <div className="mb-10">
                <h3 className="text-xl font-bold text-white my-2 md:my-4 text-left">
                  General Buy/Sell Details
                </h3>

                <div className="justify-between flex mb-1">
                  <p className="font-thin">Buy Tax</p>
                  <p>13%</p>
                </div>
                <div className="justify-between flex mb-1">
                  <p className="font-thin">Sell Tax</p>
                  <p>18%</p>
                </div>
                <div className="justify-between flex mb-1">
                  <p className="font-thin">Transfer Tax</p>
                  <p>13%</p>
                </div>
                {/* <div className="mb-1">
                  <p className="font-thin"></p>
                  <p>869.23B $POUND</p>
                </div> */}
                {/* <div className=" mb-1">
                  <p className="font-thin"></p>
                  <p>1.50M $POUND</p>
                </div> */}
              </div>
              {/* <div className="mb-10">
                <h3 className="text-xl font-bold text-white my-2 md:my-4 text-left">
                  Your Current Tax Bracket
                </h3>

                <div className="justify-between flex mb-1">
                  <p className="font-thin">Sell Tier 1 (+0%)</p>
                  <p>Total Sell Tax= 20%</p>
                </div>
                <div className="justify-between flex mb-1">
                  <p className="font-thin">Transfer Tier 1 (+0%)</p>
                  <p>Total Transfer Tax= 13%</p>
                </div>
              </div> */}
            </div>
            <div
              className="lg:col-span-8 border border-gray-200 p-4 lg:p-12 rounded-2xl text-center"
              data-aos="zoom-in"
              data-aos-duration={1000}
              style={{ backgroundColor: "#222" }}
            >
              <div>
                <div className="grid sm:grid-cols-3 grid-cols-1 gap-8">
                  <div>
                    <h1 className="text-xl font-thin">Your Balance</h1>
                    <p className="font-bold text-lg">$ 0</p>
                    <p className="text-xs font-thin">10.000,98 POUND</p>
                  </div>
                  <div>
                    <h1 className="text-xl font-thin">Daily Earnings</h1>
                    <p className="font-bold text-lg">$ 0</p>
                    <p className="text-xs font-thin">10.000,98 POUND</p>
                  </div>
                  <div>
                    <h1 className="text-xl font-thin">Next Reward</h1>
                    <p className="font-bold text-lg">$ 0</p>
                    <p className="text-xs font-thin">10.000,98 POUND</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
