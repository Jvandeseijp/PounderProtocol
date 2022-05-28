import React, { useState, useEffect } from "react";
// import './App.css';

function Swap() {
  const [swapForm, setswapForm] = useState({
    crypto: "",
    cryptoValue: 0.0,
    currency: "",
    currencyValue: 0.0,
  });

  //   const handleChange = (e) => {
  //     let value = e.target.value;
  //     setFormData({
  //       ...formData,
  //       [e.target.name]: value,
  //     });

  const handleChange = (e) => {
    setswapForm({
      ...swapForm,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    console.log(swapForm);
  }, [swapForm]);

  return (
    <div className="Dashboard">
      <div className="container lg:max-w-5xl mx-auto py-5 text-white relative">
        <div className=" flex justify-center ">
          
        </div>
      </div>
    </div>
  );
}

export default Swap;
