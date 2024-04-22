import BannerWrapper from './Banner.style';
import{addReferrals} from './../../../services/Api/api'

import DocumentIcon from '../../../assets/images/icons/document-text.svg';
import PresaleLiveTextIcon from '../../../assets/images/icons/presale-live-text.svg';
import Abstrac1 from '../../../assets/images/banner/abstrac-1.png';
import Abstrac2 from '../../../assets/images/banner/abstrac-2.png';

import { FiArrowDownRight } from 'react-icons/fi';
import { HiArrowLeft } from 'react-icons/hi2';


import { Box, Button } from '@mui/material';
import SmoothSlider from '../../../components/smooth-slider/SmoothSlider';
import Progressbar from '../../../components/progressbar/Progressbar';
import Timer from '../../../components/countdown/Countdown';
import Dropdown from '../../../components/dropdown/Dropdown';
import { useState, useEffect, useCallback } from 'react';

import Data from '../../../assets/data/bannarV1';
import {
    useAccount,
    useBalance,
    readContracts,
    useNetwork,
    useSwitchNetwork,
} from 'wagmi';
import { ActiveChain, presaleContractConfig } from '../../../contracts/config';
import { waitForTransaction } from '@wagmi/core';
import { formatUnits, parseGwei, parseUnits } from 'viem';
import { readContract, writeContract } from 'wagmi/actions';
import { presaleContractAddress } from '../../../contracts/config';
import PresaleContractAbi from '../../../contracts/PresaleContractAbi.json';
import { tokenContractAddress } from '../../../contracts/config';
import ReferalLink from '../../ReferalLink';
import { Container, Typography } from '@mui/material';
import Loading from '../../../components/Loding';
import Toastify from '../../../components/Tostify';
import axios from 'axios';
import { fetchToken, fetchBalance } from '@wagmi/core';
import TokenInfoWrapper from './TokenInfo.style';
import moment from 'moment';
import DownCounter from '../../../components/countdown/Countdown';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { Link } from 'react-router-dom';

import kyc from '../../../assets/images/KYC123.png';
import Referrals from '../../../components/referrals/Referrals';

const Banner = () => {
    const [loading, setLoading] = useState(false);
    const [alertState, setAlertState] = useState({
        open: false,
        message: '',
        severity: undefined,
    });
    const showToast = (msg, type) => {
        return setAlertState({
            open: true,
            message: msg,
            severity: type,
        });
    };
    const { chain } = useNetwork();

    const [userBalance, setUserBalance] = useState('0');
    const [isBuyNow, setIsBuyNow] = useState(false);
    const [totalSupply, setTotalSupply] = useState(0);
    const { openConnectModal } = useConnectModal();
    const { switchNetwork } = useSwitchNetwork();
    const [tokenName, setTokenName] = useState('-');
    const [tokenSymbol, setTokenSymbol] = useState('-');
    const [currentPrice, setCurrentPrice] = useState(0);
    const [nextPrice, setNextPrice] = useState(0);
    const [paymentUsd, setPaymentUsd] = useState(0);
    const [stageEnd, setStageEnd] = useState(0);
    const [totalTokens, settotalTokens] = useState(0);
    const [paymentAmount, setPaymentAmount] = useState(0);
    const [buyAmount, setBuyAmount] = useState(0);
    const [tokenSold, setTokenSold] = useState(0);
    const [tokenPercent, setTokenPercent] = useState(0);
    const [bnbCurrentPrice, setbnbCurrentPrice] = useState(0);
    const [bnbToToken, setbnbToToken] = useState(0);
    const [phase, setphase] = useState(0);
    const [bonus,setBonus]=useState(0);
    // const phase = "0";
    const { address, isConnected } = useAccount();

    async function init() {
        try {
            const phase = await readContract({
                ...presaleContractConfig,
                functionName: 'getActivePhase',
            });
            setphase(phase);
            const bonus = await readContract({
                ...presaleContractConfig,
                functionName: 'referrerPercentage',
            });
            setBonus(bonus.toString());
            const [
                {
                    data: { USD },
                },
                data,
                {
                    decimals,
                    name,
                    symbol,
                    totalSupply: { value },
                },
            ] = await Promise.all([
                axios.get(
                    'https://min-api.cryptocompare.com/data/price?fsym=BNB&tsyms=USD'
                ),
                readContracts({
                    contracts: [
                        {
                            ...presaleContractConfig,
                            functionName: 'bnbToToken',
                            args: [parseUnits('1', 18), phase],
                        },
                        {
                            ...presaleContractConfig,
                            functionName: 'presalePhases',
                            args: [phase],
                        },

                        {
                            ...presaleContractConfig,
                            functionName: 'presalePhases',
                            args: [
                                Number(phase) === 2
                                    ? phase
                                    : (Number(phase) + 1).toString(),
                            ],
                        },
                    ],
                }),
                fetchToken({
                    address: tokenContractAddress,
                }),
            ]); // The price of BNB in USD

            setbnbCurrentPrice(USD);
            setTokenSymbol(symbol);
            setTokenName(name);
            let [
                { result: bnbToTokens },
                { result: currentPhaseData },
                { result: nextPhaseData },
            ] = data;
            let [
                totalTokens,
                tokenPrice,
                vestingTime,
                releaseDuration,
                totalSold,
                phaseTime,
            ] = currentPhaseData;
            let [nexttotalTokens, nexttokenPrice] = nextPhaseData;
            let percentage = parseFloat(
                (+formatUnits(totalSold, decimals) /
                    +formatUnits(totalTokens, decimals)) *
                100
            ).toFixed(2);
            setNextPrice(
                +parseFloat(1 / +formatUnits(nexttokenPrice, 8)).toFixed(5)
            );
            setTotalSupply(formatUnits(value, decimals));
            setTokenSold(
                parseFloat(formatUnits(totalSold, decimals)).toFixed(2)
            );
            setbnbToToken(
                +parseFloat(formatUnits(bnbToTokens, decimals)).toFixed(2)
            );
            settotalTokens(
                +parseFloat(formatUnits(totalTokens, decimals)).toFixed(2)
            );
            settotalTokens(
                +parseFloat(formatUnits(totalTokens, decimals)).toFixed(2)
            );
            setCurrentPrice(
                +parseFloat(1 / +formatUnits(tokenPrice, 8)).toFixed(5)
            );
            setTokenPercent(percentage);
            setStageEnd(+moment.unix(Number(phaseTime)).format('x'));
            if (address) {
                const { formatted: bnbBalance } = await fetchBalance({
                    address,
                });
                setUserBalance(parseFloat(bnbBalance).toFixed(5));
            }
        } catch (error) {
            console.log('Error fetching BNB price:', error);
        }
    }
    useEffect(() => {
        init();
    }, [address]);

    const handlePaymentInput = (e) => {
        let _inputValue = e.target.value;
        if (_inputValue > 0) {
            setPaymentUsd(parseFloat(_inputValue * bnbCurrentPrice).toFixed(2));
            setBuyAmount(parseFloat(bnbToToken * _inputValue).toFixed(2));
        } else {
            setPaymentUsd(0);
        }
        setPaymentAmount(_inputValue);
    };

    const buyToken = useCallback(async () => {
        try {
            setLoading(true);
            let refAddress = localStorage.getItem('bfm_refAddress');
            const amountInParse = parseUnits(paymentAmount.toString(), 18);
            if (refAddress) {
                const bnb = parseFloat(paymentAmount);
                console.log("amount",bnb);
                console.log("bonus",parseFloat(bonus));
                const bonusPer = parseFloat(bonus)
                const bonusBnb = bnb*bonus/100;
                console.log("bnbbonus",bonusBnb)
               
               
                const { hash } = await writeContract({
                    address: presaleContractAddress,
                    abi: PresaleContractAbi,
                    functionName: 'buyTokensWithReferral',
                    args: [phase, refAddress],
                    value: amountInParse,
                });
             const recept = await waitForTransaction({ hash });
             addReferrals({refAddress, bonusBnb})
               
                
                showToast(recept, "success");
            } else {
                const { hash } = await writeContract({
                    address: presaleContractAddress,
                    abi: PresaleContractAbi,
                    functionName: 'buyTokens',
                    args: [phase],
                    value: amountInParse,
                });
                const receipt = await waitForTransaction({ hash });

                // showToast(receipt, "success");
                // eslint-disable-next-line no-undef
            }
            showToast('Transaction Confirmed.', 'success');
            setLoading(false);
        } catch (err) {
            setLoading(false);
            // setLoading(false);

            console.log('buyToken Error', err);
            showToast(err.message, 'error');
        }
    }, [paymentAmount, phase]);

    return (
        <BannerWrapper>
            <Loading isLoading={loading} />
            <Toastify setAlertState={setAlertState} alertState={alertState} />
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-6">
                        <div className="gittu-banner-left">
                            <Typography
                                sx={{
                                    fontSize: {
                                        xs: '25px',
                                        md: '50px',
                                        fontWeight: '700',
                                        color: '#fff',
                                    },
                                }}
                            >
                                {Data.title}
                            </Typography>
                            <Typography
                                sx={{
                                    fontSize: {
                                        xs: '25px',
                                        md: '50px',
                                        fontWeight: '700',
                                        color: '#fff',
                                    },
                                }}
                            >
                                {Data.titleExtra}
                            </Typography>
                            <h5 className="mt-15">{Data.subtitle}</h5>

                            <div className="mt-40 mb-40">
                                <a
                                    className="whitepaper-btn"
                                    href="https://benefitmine-organization.gitbook.io/benefit-mine-whitepaper-vol-1/"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <img src={DocumentIcon} alt="icon" />
                                    Whitepaper
                                </a>
                            </div>

                            <ul className="gittu-banner-list">
                                <li>Total Supply: {Number(totalSupply)}</li>
                                <li>Minimun Token Purchase: 700 BFM</li>
                                <li>Maximum Token Purchase: 1,000,000 BFM</li>
                            </ul>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-start',
                                    alignItems: 'center',
                                    gap: '0px 20px',
                                    mt: 10,
                                }}
                            >
                                <Button
                                    component={Link}
                                    to="https://claim.benefitmine.io"
                                    onMouseEnter={(e) =>
                                        (e.target.style.color = '#000')
                                    }
                                    onMouseLeave={(e) =>
                                        (e.target.style.color = '#fff')
                                    }
                                    sx={{
                                        background: '#F79B20',
                                        borderRadius: '30px',

                                        maxWidth: '200px',
                                        width: '100%',
                                        color: '#fff',
                                        fontSize: '18px',
                                        fontWeight: '600',
                                        '&:hover': {
                                            background: '#fff',
                                            // color: "#000",
                                            // fontSize: "18px",
                                            // fontWeight: "600",
                                        },
                                    }}
                                >
                                    Claim Tokens
                                </Button>
                                <Button
                                    component={Link}
                                    to="/HowToBuy"
                                    sx={{
                                        background: '#F79B20',
                                        borderRadius: '30px',
                                        p: 1,
                                        maxWidth: '200px',
                                        width: '100%',
                                        color: '#fff',
                                        fontSize: '18px',
                                        fontWeight: '600',
                                        '&:hover': {
                                            background: '#fff',
                                            color: '#000',
                                            // fontSize: "18px",
                                            // fontWeight: "600",
                                        },
                                    }}
                                >
                                    How To Buy{' '}
                                </Button>
                            </Box>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="gittu-banner-right">
                            {/* <div className="overlay">
                <a href="#" className="presale-live-btn">
                  <img src={PresaleLiveTextIcon} alt="Presale live" />
                  <span className="icon">
                    <FiArrowDownRight />
                  </span>
                </a>
              </div> */}
                            <div className="gittu-banner-card">
                                <div className="gittu-banner-card-inner">
                                    <div className="bg-shape">
                                        <div className="bg-shape-img img-1">
                                            <img src={Abstrac1} alt="shape" />
                                        </div>
                                        <div className="bg-shape-img img-2">
                                            <img src={Abstrac2} alt="shape" />
                                        </div>
                                    </div>

                                    {isBuyNow ? (
                                        <div className="card-content">
                                            <button
                                                className="presale-back-btn"
                                                onClick={() =>
                                                    setIsBuyNow(!isBuyNow)
                                                }
                                            >
                                                <HiArrowLeft />
                                            </button>

                                            <div className="presale-item mb-20">
                                                <div className="presale-item-inner">
                                                    <h5 className="fw-600 text-uppercase text-white">
                                                        Balance: {userBalance}{' '}
                                                        BNB
                                                    </h5>
                                                </div>
                                                <div className="presale-item-inner">
                                                    <h5 className="fw-600 text-uppercase text-white">
                                                        Price: {currentPrice}{' '}
                                                        USD
                                                    </h5>
                                                </div>
                                            </div>

                                            <div className="presale-item mb-25">
                                                <div className="presale-item-inner">
                                                    <h6>Select Token</h6>
                                                    <Dropdown />
                                                </div>
                                                <div className="presale-item-inner">
                                                    <h6>Amount</h6>
                                                    <input
                                                        type="number"
                                                        min={currentPrice}
                                                        step={currentPrice}
                                                        name=""
                                                        id=""
                                                        placeholder="0.5"
                                                        value={paymentAmount}
                                                        onChange={
                                                            handlePaymentInput
                                                        }
                                                    />
                                                </div>
                                            </div>

                                            <div className="presale-item mb-37">
                                                <div className="presale-item-inner">
                                                    <h6>$ Amount</h6>
                                                    <input
                                                        type="text"
                                                        name=""
                                                        id=""
                                                        placeholder="0"
                                                        value={paymentUsd}
                                                        disabled
                                                    />
                                                </div>
                                                <div className="presale-item-inner">
                                                    <h6>
                                                        Get Amount ({' '}
                                                        {tokenSymbol} )
                                                    </h6>
                                                    <input
                                                        type="text"
                                                        name=""
                                                        id=""
                                                        placeholder="0"
                                                        value={buyAmount}
                                                        disabled
                                                    />
                                                </div>
                                            </div>

                                            <Button
                                                sx={{
                                                    background: '#F79B20',
                                                    borderRadius: '30px',
                                                    p: 1,
                                                    width: '100%',
                                                    color: '#fff',

                                                    fontSize: '18px',
                                                    fontWeight: '600',
                                                    '&:hover': {
                                                        background: '#fff',
                                                        color: '#000',
                                                        fontSize: '18px',
                                                        fontWeight: '600',
                                                    },
                                                }}
                                                onClick={buyToken}
                                            >
                                                {' '}
                                                Buy {tokenSymbol} now
                                            </Button>
                                        </div>
                                    ) : (
                                        <div className="card-content">
                                            <div
                                                className="presale-stage "
                                                style={{
                                                    display: 'flex',
                                                    justifyContent:
                                                        'space-between',
                                                    alignItems: 'start',
                                                    // border: '1px solid red',
                                                    flexDirection: 'column',
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        // border: '1px solid red' ,
                                                        display: 'flex',
                                                        justifyContent:
                                                            'space-between',
                                                        alignItems: 'center',
                                                        width: '100%',
                                                        height: '100px',
                                                    }}
                                                >
                                                    <p className="presale-stage-title text-uppercase">
                                                        Stage {+phase + 1}
                                                    </p>

                                                    <img
                                                        className="cert__img"
                                                        src={kyc}
                                                        onClick={() =>
                                                            window.open(
                                                                'https://github.com/cyberscope-io/kyc/blob/main/bfm/kyc.png'
                                                            )
                                                        }
                                                        alt="certificate"
                                                    />
                                                </div>
                                                <h5 className="fw-600 text-white text-uppercase">
                                                    Pre-sale ends in
                                                </h5>
                                            </div>

                                            <div className=" mb-17">
                                                <DownCounter
                                                    init={init}
                                                    stageEnd={stageEnd}
                                                />
                                            </div>

                                            <div className="mb-15">
                                                <Progressbar
                                                    done={Number(
                                                        tokenPercent
                                                    ).toFixed(0)}
                                                />
                                            </div>

                                            <div className="presale-raised fw-500 mb-25">
                                                <p className="fs-15 text-white">
                                                    Raised: {tokenSold}
                                                </p>
                                                <p className="fs-15 text-white">
                                                    Goal: {totalTokens}
                                                </p>
                                            </div>

                                            <div className="mb-35">
                                                <TokenInfoWrapper>
                                                    <li>
                                                        <p>Token Name</p>
                                                        <p>{tokenName}</p>
                                                    </li>
                                                    <li>
                                                        <p>Token Symbol</p>
                                                        <p>{tokenSymbol}</p>
                                                    </li>
                                                    <li>
                                                        <p>Current Price</p>
                                                        <p>
                                                            {currentPrice} USD
                                                        </p>
                                                    </li>
                                                    <li>
                                                        <p>Next Stage Price</p>
                                                        <p>{nextPrice} USD</p>
                                                    </li>
                                                    <li>
                                                        <p> Stage End</p>
                                                        <p>
                                                            {moment(
                                                                stageEnd
                                                            ).format('lll')}
                                                        </p>
                                                    </li>
                                                </TokenInfoWrapper>
                                            </div>

                                            <Button
                                                sx={{
                                                    background: '#F79B20',
                                                    borderRadius: '30px',
                                                    p: 1,
                                                    width: '100%',
                                                    color: '#fff',

                                                    fontSize: '18px',
                                                    fontWeight: '600',
                                                    '&:hover': {
                                                        background: '#fff',
                                                        color: '#000',
                                                        fontSize: '18px',
                                                        fontWeight: '600',
                                                    },
                                                }}
                                                onClick={() =>
                                                    !isConnected
                                                        ? openConnectModal()
                                                        : +chain?.id !==
                                                            +ActiveChain
                                                            ? switchNetwork?.(
                                                                ActiveChain
                                                            )
                                                            : setIsBuyNow(!isBuyNow)
                                                }
                                            >
                                                {!isConnected
                                                    ? 'Connect Wallet'
                                                    : +chain?.id !==
                                                        +ActiveChain
                                                        ? 'Wrong Network'
                                                        : `Buy ${tokenSymbol} now`}
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Container maxWidth="lg">
                <ReferalLink />
            </Container>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '20px',
                alignItems: 'center',
                flexDirection: 'row', // Adds padding top and bottom (py-12)
                maxWidth: '6xl', // Set the maximum width
            }}>
                <Referrals />
            </div>
            <div
                className="gittu-banner-slider"
                style={{ paddingBottom: '10px', paddingTop: '100px' }}
            >
                <SmoothSlider />
            </div>
        </BannerWrapper>
    );
};

export default Banner;
