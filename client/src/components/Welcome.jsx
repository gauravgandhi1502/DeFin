import React, {useContext} from "react";
import { AiFillPlayCircle } from "react-icons/ai";
// import {SiEthereum} from "react-icons/si";
// import {BsInfoCircle} from "react-icons/bs";

import { TransactionContext } from "../context/TransactionContext";
import {Loader} from './';

const Input = ({placeholder, name, type, value, handleChange}) => (
    <input 
        placeholder={placeholder}
        type = {type}
        step = "0.0001"
        value= {value}
        onChange = {(e) => handleChange(e, name)}
        className = "my-2 w-full rounded-full p-2 outline-none bg-transparent border-none text-sm white-glassmorphism"
    />
);

const Welcome = () => {
    const { connectWallet, currentAccount, formData, sendTransaction, handleChange, isLoading } = useContext(TransactionContext);

    const handleSubmit = (e) => {
        const { addressTo, amount, keyword, message} = formData;

        e.preventDefault();

        if(!addressTo || !amount || !keyword || !message)
            return;
        
        sendTransaction();
    }

    const shortenAddress = (address) => `${address.slice(0, 10)}...${address.slice(address.length - 10)}`

    return (
        <div className="flex w-full justify-center items-center">
            <div className="flex md:flex-row flex-col items-start justify-between md:p-20 py-12 px-4">
                <div className="flex flex-1 justify-start flex-col md:mr-10">
                    <h1 className="text-3xl sm:text-5xl text-white py-1">
                        Crypto and Twitter? What??
                    </h1>
                    <p className="text-white text-left mt-5 font-white md:w-9/12 w-11/12 text-base">
                        Explore the crypto world with a peculiar concept integrating crypto with your favourite social media at <b>Twiss</b>
                    </p>
                    {!currentAccount && (
                        <button 
                            type="button"
                            onClick={connectWallet}
                            className="w-40 flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3
                            rounded-full cursor-pointer hover:bg-[#2546bd]"
                        >
                            <p className="text-white text-base font-semibold">Connet Wallet</p>
                        </button>
                    )}
                </div>

                <div className="flex flex-col flex-1 items-center justify-start w-full md:mt-0 mt-10">
                    {/* <div className="p-3 justify-end items-start flex-col rounded-xl h-40 sm:w-72 w-full my-5 eth-card white-glassmorphism"> */}
                        {/* <div className="flex justify-between flex-col w-full h-full">
                            <div className="flex justify-between items-start">
                                <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
                                    <SiEthereum fontSize={25} color="#fff"/>
                                </div>
                                <BsInfoCircle fontSize={20} color="#fff"/>
                            </div>
                            <div>
                            <p className="text-white font-semobold text-lg mt-1"><b>Ethereum</b></p>
                            </div>
                        </div> */}
                    {/* </div> */}
                    <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
                        <p className="text-white "><b>Your Address: </b>{shortenAddress(currentAccount)}</p>
                        <Input placeholder="Receiver's Address" name="addressTo" type="text" handleChange={handleChange} />
                        <Input placeholder="Amount" name="amount" type="number" handleChange={handleChange} />
                        <Input placeholder="Tweet Keyword" name="keyword" type="text" handleChange={handleChange} />
                        <Input placeholder="Message" name="message" type="text" handleChange={handleChange} />

                        {/* <div className="h-[1px] w-full bg-gray-400 my-2"/> */}

                        {isLoading ? (
                            <Loader />
                        ) : (
                            <button
                                type="button"
                                onClick={handleSubmit}
                                className="text-white w-40 mt-2 p-2 border-[#3d4f7c] rounded-full cursor-pointer bg-[#2952e3] hover:bg-[#2546bd]" 
                            >
                                Send
                            </button>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Welcome; 