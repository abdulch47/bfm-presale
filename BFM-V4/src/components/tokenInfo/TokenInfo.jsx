import React from "react";
import TokenInfoWrapper from "../../sections/banner/v4/TokenInfo.style";
import { useAccount, useContractRead } from "wagmi";
import {
  payWith,
  currentStageIdCall,
  currentStageInfoCall,
  maxStageCall,
  tokenNameCall,
  tokenSymbolCall,
} from "../../contracts/config";
import { useEffect } from "react";
import { useState } from "react";
import { formatEther } from "viem";

const TokenInfo = () => {


  const { isConnected } = useAccount();
  const { data: tokenNameData } = useContractRead({ ...tokenNameCall });
  const { data: tokenSymbolData } = useContractRead({
    ...tokenSymbolCall,
  });
  const { data: maxStageData } = useContractRead({ ...maxStageCall });
  const { data: currentStageIdData } = useContractRead({
    ...currentStageIdCall,
  });
  const { data: currentStageInfoData } = useContractRead({
    ...currentStageInfoCall,
    args: [currentStageIdData],
  });
  const { data: nextStageInfoData } = useContractRead({
    ...currentStageInfoCall,
    args: [nextStage],
  });

  useEffect(() => {
    if (isConnected) {
      if (tokenNameData) {
        setTokenName(tokenNameData);
      }

      if (tokenSymbolData) {
        setTokenSymbol(tokenSymbolData);
      }

      if (maxStageData) {
        setMaxStage(maxStageData.toString());
      }

      if (currentStageIdData) {
        setCurrentStage(currentStageIdData.toString());

        let tmp = parseInt(currentStageIdData);
        setNextStage(tmp + 1);

        if (maxStage < tmp + 1) {
          setNextStage(tmp);
        }
      }

      if (currentStageInfoData) {
        let tmp = formatEther(currentStageInfoData[2]);
        setCurrentPrice(tmp + " " + payWith);
      }

      if (nextStageInfoData) {
        let tmp = formatEther(nextStageInfoData[2]);
        setNextPrice(tmp + " " + payWith);
      }
    }
  }, [
    isConnected,
    tokenNameData,
    tokenSymbolData,
    maxStageData,
    currentStageIdData,
    currentStageInfoData,
    nextStageInfoData,
    maxStage,
  ]);

  return (
   
  );
};

export default TokenInfo;
