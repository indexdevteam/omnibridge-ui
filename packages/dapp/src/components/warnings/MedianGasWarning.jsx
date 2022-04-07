import { Alert, AlertIcon, Flex, Text } from '@chakra-ui/react';
import { useBridgeDirection } from 'hooks/useBridgeDirection';
import React from 'react';
import { getGasPrice, getMedianHistoricalEthGasPrice } from 'stores/gasPrice';

export const MedianGasWarning = ({ noShadow = false }) => {
  const { foreignChainId } = useBridgeDirection();
  const currentPrice = getGasPrice();
  const medianPrice = getMedianHistoricalEthGasPrice();

  if (
    foreignChainId === 1 &&
    medianPrice.gt(0) &&
    medianPrice.lt(currentPrice)
  ) {
    const percent = currentPrice
      .sub(medianPrice)
      .mul(100)
      .div(medianPrice)
      .toNumber();

    return (
      <Flex align="center" direction="column" w="100%" mb="4">
        <Alert
          status="warning"
          borderRadius={5}
          boxShadow={
            noShadow ? 'none' : '0px 1rem 2rem rgba(204, 218, 238, 0.8)'
          }
        >
          <AlertIcon minWidth="20px" />
          <Text fontSize="small">
            {`The current gas price on the Ethereum Mainnet is `}
            <b>{`${percent}% above the median`}</b>
            {` for the past 7 days`}
          </Text>
        </Alert>
      </Flex>
    );
  }
  return null;
};
