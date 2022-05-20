import React, { useRef, useEffect } from "react";
import './App.css';
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';
import moment from "moment";


const FAQs = [
  {
    heading: 'When Do I begin to Earn rewards and How much tokens do I need to hold to start earning ?',
    content: 'You begin earning rewards the moment you purchase $POUND. It makes no difference how many tokens you have. You can earn rewards even if you only have 1$POUND.',
  },
  {
    heading: 'How does the Referral System work?',
    content: 'You can earn extra $POUND tokens by inviting friends and family to our discord community server!',
  },
  {
    heading: 'Will I Receive Staking Rewards from holding Referral Tokens only?',
    content: 'You can earn extra $POUND tokens by simply joining our Referral programme. You will receive rewards for every like, retweet or comment on our social media platforms!',
  },
  {
    heading: 'What will we do with the Treasury?',
    content: 'The treasury functions as additional financial support for the Insurance Funds. This additional support can become important in the event of an extreme price drop off of the $POUND token. The treasury is also used to fund new Pounder products, services, and projects that will expand and build up Pounder economy.',
  },
  {
    heading: 'Where can I buy $POUND tokens?',
    content: 'The $POUND token is available on PancakeSwap. Click here to buy',
  },
  {
    heading: 'How is the APY Sustained?',
    content: 'Pounder uses buy and sell taxes in order to sustain its fixed APY. This means we will never lower or raise the APY of the project. When users buy $POUND, 13% of their purchase goes towards the protocol, when they sell, 18% goes to the protocol as well. This is one of the main ways we achieve and sustain the APY, and therefor the reason why you need to pay this tax.',
  },
]



function Home() {

  const [showModal, setShowModal] = React.useState(false);
  const [releaseTimer, setReleaseTimer] = React.useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  
  const timerInstance = useRef(null);

  const getTimeRemaining = (e) => {
    let total = moment(e) - moment();
    let duration = moment.duration(total, "milliseconds");
    let seconds = duration.seconds();
    let minutes = duration.minutes();
    let hours = duration.hours();
    let days = duration.days();

    return {
      total,
      days,
      hours,
      minutes,
      seconds,
    };
  };

  const startTimer = () => {      
    let _auctionTime = moment("2022-05-3 21:00");
    let _currentDate = moment();

    if (_currentDate.isAfter(_auctionTime)) {
      setReleaseTimer({
        ...releaseTimer,
      });
      if (timerInstance.current) {
        clearInterval(timerInstance.current);
      }
      return false;
    }

    let { total, days, hours, minutes, seconds } =
      getTimeRemaining(_auctionTime);

    if (total > 0) {
      // check if less than 10 then we have added '0' at the begining of the variable for the feel
      setReleaseTimer({
        ...releaseTimer,
        days: days > 9 ? days : "0" + days,
        hours: hours > 9 ? hours : "0" + hours,
        minutes: minutes > 9 ? minutes : "0" + minutes,
        seconds: seconds > 9 ? seconds : "0" + seconds,
      });
    }
  };

  useEffect(() => {
    if (timerInstance.current) clearInterval(timerInstance.current);

    timerInstance.current = setInterval(() => {
      startTimer();
    }, 1000);
    return () => {
      clearInterval(timerInstance.current);
    };
  }, []);
  
  return (
    <div className="Home">
      <div
        className="bg-center bg-cover "
        style={{
          backgroundImage:
            "linear-gradient(to left, rgb(255 255 255 / 0%), rgb(0 0 0 / 13%)), url(images/banner-min.jpg)",
        }}
      >
        <div className="lg:h-[calc(100vh-78.5px)] py-12 xl:py-0 container lg:max-w-5xl mx-auto flex flex-col justify-center xl:px-0 px-4">
          <div className="grid md:grid-cols-2 grid-cols-1 gap-4 items-center">
            <div
              className="justify-start items-start flex-col flex"
              data-aos="fade-up"
              data-aos-duration={3000}
            >
              <div className="text-white">
                <h1 className="font-bold text-4xl leading-snug max-w-md heading font-apercubold">
                  The Best Auto-Staking and Auto-Compounding Protocol in Crypto
                </h1>
                <p className="mt-6 mb-10 max-w-md">
                  Simply Hold $POUND and watch the tokens grow in your wallet.
                  Thanks to Our Unique Rebase Algorithm.

                </p>
                <div className="inline-flex md:w-auto w-full">
                  <a
                    className="md:w-[180px] w-1/2 text-white hover:scale-105 transition transform duration-500 text-base font-medium rounded-full h-[56px] flex items-center justify-center border-white border"
                    style={{
                      background:
                        "linear-gradient(90deg, #992BD4 0%, #00CAA4 99.94%, #00CAA4 100.01%)",
                    }}
                    // onClick={() => setShowModal(true)}
                    href="https://pancakeswap.finance/swap?outputCurrency=0xbC6246f22f5D6A883E5acCB69016655e1744393C"
                    // target="_blank"
                    
                  >
                    <span>BUY $POUND</span>
                  </a>

                  <a
                    href="https://discord.gg/4mTPwy9j4y"
                    target="_blank"
                    rel="noreferrer"
                    className="md:w-[180px] w-1/2 bg-white text-black text-base hover:scale-105 transition transform duration-500 font-medium rounded-full h-[56px] flex items-center justify-center ml-6 border-white"
                  >
                    Join Discord
                  </a>
                </div>
              
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* pounder pool */}
      <div className="bg-[#232323] text-white lg:py-16 py-8 sm:px-0 px-4 sm:text-left text-center overflow-hidden">
        <h2 className="text-3xl font-bold text-center pb-8 font-apercubold">
          Pounder Protocol
        </h2>
        <div className="grid sm:grid-cols-6 grid-cols-1 sm:gap-12 gap-4 mb-8">
          <div
            className="sm:col-start-2 sm:col-span-2 text-center"
            data-aos="fade-right"
            data-aos-duration={1000}
          >
            <p className="text-lg font-normal mb-3">
              Holders do not need to stake or manually claim earnings. Our Smart
              contract awards Earnings directly to the holder's balance.
            </p>
            <h4 className="text-2xl font-medium ">You Earn every 30 Minutes</h4>
          </div>
          <div
            className="text-center sm:col-span-2 md:mt-0 mt-5"
            data-aos="fade-left"
            data-aos-duration={1000}
          >
            <span
              className="md:text-6xl text-5xl font-bold text-center hasBorderText min-h-[84px] mb-3"
              data-text="56.142,23%"
            />
            <h4 className="text-2xl font-medium text-center">Fixed APY</h4>
          </div>
        </div>
        <div className="text-center mx-auto">
          <Link
            to="/dashboard"
            className="text-white hover:text-white text-sm font-medium rounded-full hover:scale-105 transition transform duration-500 px-6 py-4 border-white border white mx-auto inline-block text-center"
            style={{
              background:
                "linear-gradient(90deg, #992BD4 0%, #00CAA4 99.94%, #00CAA4 100.01%)",
            }}
          >
            Open Dashboard
          </Link>
        </div>
      </div>

      {/* Utility of $POUND Trading Fees Start  */}
      <div
        className="bg-no-repeat py-12 md:py-20 sm:px-8 bg-cover px-4"
        style={{ backgroundImage: 'url("images/bg-nw.jpg")' }}
      >
        <div className="container mx-auto">
          <div className="mb-8 md:mb-20">
            <h2 className="text-4xl font-bold text-white text-center mb-2 font-apercubold">
              Utility of $POUND Trading Fees
            </h2>
            <p className="text-lg  text-white font-light text-center">
              Market Fees
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <div
              className="border border-gray-200 p-4 lg:p-12 rounded-2xl text-center max-w-xs mx-auto md:max-w-full"
              data-aos="zoom-in"
              data-aos-duration={1000}
              style={{ backgroundColor: "#222" }}
            >
              <div className="mb-4">
                <img
                  className="mx-auto w-[80px]"
                  src="images/card-icn1.png"
                  alt=""
                />
              </div>
              <h3 className="text-3xl font-bold text-white text-center my-3 md:my-6">
                Insurance Funds
              </h3>
              <p className="font-normal text-white text-lg">
                5% of the trading fees are redirected to the Insurance Funds
                which helps sustain and back the staking rewards provided by the
                positive rebase.
              </p>
            </div>
            <div
              className="border border-gray-200 p-4 lg:p-12 rounded-2xl text-center max-w-xs mx-auto md:max-w-full"
              data-aos="zoom-in"
              data-aos-duration={1000}
              style={{ backgroundColor: "#222" }}
            >
              <div className="mb-4">
                <img
                  className="mx-auto w-[80px]"
                  src="images/card-icn2.png"
                  alt=""
                />
              </div>
              <h3 className="text-3xl font-bold text-white text-center my-3 md:my-6">
                Treasury
              </h3>
              <p className="font-normal text-white text-lg">
                3% of the purchases and 8% of the sales are used to improve the
                token or go directly to the Treasury which supports the
                Insurance Funds.
              </p>
            </div>
            <div
              className="border border-gray-200 p-4 lg:p-12 rounded-2xl text-center max-w-xs mx-auto md:max-w-full"
              data-aos="zoom-in"
              data-aos-duration={1000}
              style={{ backgroundColor: "#222" }}
            >
              <div className="mb-4">
                <img
                  className="mx-auto w-[80px]"
                  src="images/card-icn3.png"
                  alt=""
                />
              </div>
              <h3 className="text-3xl font-bold text-white text-center my-3 md:my-6">
                Liquidity Pool
              </h3>
              <p className="font-normal text-white text-lg">
                5% of the trading fees return to the liquidity ensuring $POUND’s
                increasing collateral value.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* how does it work */}
      <div className="container mx-auto lg:my-20 my-10 xl:px-0 px-4">
        <h2 className="text-4xl font-bold text-center mb-2 font-apercubold">
          How does is work?
        </h2>
        <p className="text-center text-xl pb-20">
          A remarkable AutoStaking System
        </p>
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4">
          <div
            className="bg-white customShadow-HIW rounded-md p-6 "
            data-aos="fade-up"
            data-aos-easing="linear"
            data-aos-duration={700}
          >
            <div>
              <img
                className="mx-auto w-16 sm:-mt-16 mb-8"
                src="images/1-icon.svg"
                alt=""
              />
            </div>
            <h2 className="font-bold text-xl mb-4">POUND Token</h2>
            <p className="text-sm">
              $POUND is the native token for Staking incentives. Tax
              distribution benefits every token holder in $POUND. merely for
              holding $POUND tokens.
            </p>
          </div>
          <div
            className="bg-white customShadow-HIW rounded-md p-6"
            data-aos="fade-up"
            data-aos-easing="linear"
            data-aos-duration={1000}
          >
            <div>
              <img
                className="mx-auto w-16 sm:-mt-16 mb-8"
                src="images/2-icon.svg"
                alt=""
              />
            </div>
            <h2 className="font-bold text-xl mb-4">Easy and Safe</h2>
            <p className="text-sm">
              Crypto’s safest Paying Au- to-Staking and Auto-Com- pounding
              Protocol with the most sustainable fixed APY in the industry of
              56.142,23%. Interest rewards are com- pounded every 30 minutes for
              every BSC wallet holding any $POUND tokens.
            </p>
          </div>
          <div
            className="bg-white customShadow-HIW rounded-md p-6"
            data-aos="fade-up"
            data-aos-easing="linear"
            data-aos-duration={1200}
          >
            <div>
              <img
                className="mx-auto w-16 sm:-mt-16 mb-8"
                src="images/3-icon.svg"
                alt=""
              />
            </div>
            <h2 className="font-bold text-xl mb-4">Insurance Funds</h2>
            <p className="text-sm">
              The Insurance Funds serves as an insurance fund to achieve price
              stability and longterm sustainability of the Pounder Protocol by
              maintaining a con- sistent 1,75% daily rebase rate to all $POUND
              token hol- ders.{" "}
            </p>
          </div>
          <div
            className="bg-white customShadow-HIW rounded-md p-6"
            data-aos="fade-up"
            data-aos-easing="linear"
            data-aos-duration={1400}
          >
            <div>
              <img
                className="mx-auto w-16 sm:-mt-16 mb-8"
                src="images/4-icon.svg"
                alt=""
              />
            </div>
            <h2 className="font-bold text-xl mb-4">Fast Rebase Rewards</h2>
            <p className="text-sm">
              Fast Rebase Rewards. Other popular staking protocols pay rebasing
              rewards every 8 hours which means if you want to unstake you have
              to time it to get maximum re- wards. Pounder Protocol pays every
              30 minutes or 48 times every day, making it the fas- test
              auto-staking protocol in crypto.
            </p>
          </div>
        </div>
      </div>

      <>
        {/* faq */}
        <div
          className="bg-[#232323] text-white lg:py-16 py-12 mt-12 xl:px-0 px-4"
          id="faqs"
        >
          <h2 className="text-3xl font-bold text-center mb-2 font-apercubold">
            Frequently Asked Questions
          </h2>
          <p className="text-center mb-4">What you need to know</p>
          <div className="container mx-auto lg:max-w-5xl max-w-full pt-6">
            <Accordion allowZeroExpanded>
              {FAQs.map((item) => (
                <AccordionItem
                  key={item.uuid}
                  data-aos="fade-up"
                  data-aos-duration={1000}
                >
                  <AccordionItemHeading>
                    <AccordionItemButton>{item.heading}</AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>{item.content}</AccordionItemPanel>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
        <div className="py-16 overflow-hidden">
          <h2
            className="text-4xl font-bold text-center mb-8"
            data-aos="fade-right"
            data-aos-duration={1000}
          >
            Keep in Touch
          </h2>
          <div
            className="flex justify-center"
            data-aos="fade-left"
            data-aos-duration={1000}
          >
            <a
              href="https://twitter.com/PounderProtocol"
              className="mx-4"
              target="_blank"
            >
              <img className="" src="images/twitter.svg" alt="" />
            </a>
            <a
              href="https://t.me/PounderProtocol"
              className="mx-4"
              target="_blank"
            >
              <img className="" src="images/telegram.svg" alt="" />
            </a>
            <a
              href="https://www.facebook.com/PounderProtocol-104801368866236/"
              className="mx-4"
              target="_blank"
            >
              <img className="" src="images/facebook.svg" alt="" />
            </a>
            <a
              href="https://www.instagram.com/pounderprotocol/"
              className="mx-4"
              target="_blank"
            >
              <img className="" src="images/insta.svg" alt="" />
            </a>
            <a
              href="https://discord.gg/4mTPwy9j4y"
              className="mx-4"
              target="_blank"
            >
              <img className="w-10" src="images/discord.svg" alt="" />
            </a>
          </div>
        </div>
      </>

      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <button
                  class="text-gray-600 focus:outline-none absolute top-[15px] right-[15px] z-50 hover:text-gray-700 float-right closeModal"
                  onClick={() => setShowModal(false)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </button>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <div class="flex flex-col flex-wrap justify-center content-center p-4 z-10 relative">
                    <form id="myform" class="max-w-[350px]">
                      <div class=" m-0  p-0  text-3xl font-bold  antialiased  text-center mb-4">
                        Get Our Updates
                      </div>
                      <div class=" m-0 p-0 text-lg antialiased  text-center">
                        Find out about events and other news
                      </div>
                      <div class="mt-6 flex flex-row  flex-wrap relative rounded-full ">
                        <input
                          type="text"
                          id="email"
                          name="email"
                          class="rounded-full text-gray-600 bg-gray-200 w-full p-3 "
                          placeholder="john@mail.com"
                        />
                        <button
                          id="submit"
                          class="p-3 px-5 absolute top-[1px] bottom-[1px] right-[1px] h-[calc(100%-2px)]  text-white rounded-tr-[25px] rounded-br-[25px]"
                          style={{
                            background:
                              "linear-gradient(90deg, #992BD4 0%, #00CAA4 99.94%, #00CAA4 100.01%)",
                          }}
                          type="button"
                        >
                          Subscribe
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
                {/*footer*/}
                {/* <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Save Changes
                  </button>
                </div> */}
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </div>
  );
}

export default Home;
