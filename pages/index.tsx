'use client'

// functionality imports:
import React from 'react';
import Image from 'next/image';
import type { NextPage } from 'next';
import {
  useAccount,
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from 'wagmi';

// form imports:
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

// component imports:
import { ConnectButton } from '@rainbow-me/rainbowkit';
import FlipCard, { BackCard, FrontCard } from '../@/components/ui/FlipCard';
import { Button } from '../@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../@/components/ui/form";
import { Input } from "../@/components/ui/input";


// IMPORTANT, MUST DEFINE:

// ABI:
const abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_gumballinit",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_gumballadd",
        type: "uint256",
      },
    ],
    name: "addFreshGumballs",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getGumball",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getNumberOfGumballs",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;


const Home: NextPage = () => {
  const { address, isConnected } = useAccount();


const { writeContract } = useWriteContract();
async function getAGumball() {
  await writeContract({
    address: "0x6df511640a9ed4615A4679246E561f711FABDD61",
    abi,
    functionName: "getGumball",
    args: [],
  });
}

function ViewingGumball() {
  const { data } = useReadContract({
    abi,
    address: "0x6df511640a9ed4615A4679246E561f711FABDD61",
    functionName: "getNumberOfGumballs",
  });
  return data;
}

const contractConfig = {
  address: '0x86fbbb1254c39602a7b067d5ae7e5c2bdfd61a30',
  abi,
} as const;

const viewingGumball = ViewingGumball()?.toString();
// END OF IMPORTANT DEFINITIONS

return (
  <div className="page">
    <div className="container">
      <div style={{ flex: '1 1 auto' }}>
        <div style={{ padding: '24px 24px 24px 0' }}>
          <h1>Cooked Meter</h1>
          <p style={{ margin: '12px 0 24px' }}>
            0 minted so far!
          </p>
          <ConnectButton />
        </div>
      </div>

      <div style={{ flex: '0 0 auto' }}>
        <FlipCard>
          <FrontCard>
            <div className='mb-50'>
              <Image
                layout="responsive"
                src="/microchip-towel.png"
                width="500"
                height="500"
                alt="RainbowKit Demo NFT"
              />
            </div>
            <h1 style={{ marginTop: 24 }}>Microchip Towel NFT</h1>
            <ConnectButton />
          </FrontCard>
          <BackCard>
            <div style={{ padding: 24 }}>
              <Image
                src="/nft.png"
                width="80"
                height="80"
                alt="RainbowKit Demo NFT"
                style={{ borderRadius: 8 }}
              />
              <h2 style={{ marginTop: 24, marginBottom: 6 }}>NFT Minted!</h2>
              <p style={{ marginBottom: 24 }}>
                Your NFT will show up in your wallet in the next few minutes.
              </p>
              <p style={{ marginBottom: 6 }}>
                View on{' '}
                <a href={``}>
                  Etherscan
                </a>
              </p>
              <p>
                View on{' '}
                <a href={``}>
                  Opensea
                </a>
              </p>
            </div>
          </BackCard>
        </FlipCard>

        {/* Render card only if connected */}
        {isConnected && (
          <div className="m-2 grid grid-cols-2 grid-rows- gap-2">
            <div className="grid grid-cols-1 grid-rows-4 gap-1">
              <div className="">
                <div className="col">
                  <Card>
                    <CardHeader>
                      <CardTitle>IT WORKED</CardTitle>
                      <CardDescription>
                        <p>Number of Gumballs: {viewingGumball}</p>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button className="p-2" onClick={() => getAGumball()}>
                        Get a Gumball
                      </Button>
                    </CardContent>
                    <CardFooter>{/* Additional content */}</CardFooter>
                  </Card>
                </div>
              </div>
            </div>
            <div className="col-auto">{/* Additional content */}</div>
          </div>
        )}
      </div>
    </div>
  </div>
);
};

export default Home;