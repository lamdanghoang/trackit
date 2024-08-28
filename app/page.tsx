"use client";
import React, { useEffect, useState } from "react";
import { WalletName, useWallet } from '@aptos-labs/wallet-adapter-react';
import { fetchAssetBalance, fetchTopHolder } from "@/utils/getData";
import { Pagination } from "antd";
import type { PaginationProps } from 'antd';

interface BalanceDataType {
  owner_address: string;
  amount: number;
  is_frozen: boolean;
  storage_id: string;
  metadata: {
    asset_type: string;
    creator_address: string;
    decimals: number;
    icon_uri: string | null;
    name: string;
    project_uri: string | null;
    symbol: string;
    token_standard: string;
    maximum_v2: string | null;
    supply_v2: string | null;
  };
}

interface HolderDataType {
  amount: number;
  owner_address: string;
  asset_type: string;
  is_frozen: boolean;
  is_primary: boolean;
  last_transaction_timestamp: string;
  last_transaction_version: number;
  storage_id: string;
  token_standard: string;
  metadata: {
    icon_uri: string | null;
    maximum_v2: string | null;
    project_uri: string | null;
    supply_aggregator_table_handle_v1: string | null;
    supply_aggregator_table_key_v1: string | null;
    supply_v2: string | null;
    name: string | null;
    symbol: string | null;
    token_standard: string | null;
    last_transaction_version: number
    last_transaction_timestamp: string | null;
    decimals: number;
    creator_address: string | null;
    asset_type: string | null;
  }
}

interface TableAssetDataType {
  name: string;
  symbol: string;
  amount: number;
  price: string;
  percentChangeFor24h: string;
  value: string;
}

const table_head = [
  'Asset',
  'Symbol',
  'Quantity',
  'Price',
  'Change (24h)',
  'Value'
]

const topHolderTableHead = [
  'Rank',
  'Address',
  'Aptos Balance',
  'Percentage',
]

const getTableData = (data: BalanceDataType[]) => {
  // This function will transform the balance data and potentially fetch additional info
  return data.map((item) => {
    // Extract relevant information from each balance item
    const name = item.metadata.name;
    const symbol = item.metadata.symbol;
    const amount = item.amount;
    const price = '';
    const percentChangeFor24h = '';
    const value = '';

    // Fetch price and change data from an external API (replace with your logic)
    // const priceResponse = await fetch(`https://your-api.com/price/${symbol}`);
    // const priceData = await priceResponse.json();
    // const price = priceData.currentPrice;
    // const percentChangeFor24h = priceData.change24h;

    // Calculate the value based on balance and price
    // const value = (Number(balance) * Number(price)).toFixed(2);

    return {
      name,
      symbol,
      amount,
      price,
      percentChangeFor24h,
      value,
    };
  });
};

export default function Home() {
  const { connect, disconnect, account, connected } = useWallet();
  const [aptBalance, setAptBalance] = useState<number>();
  const [currentAddress, setCurrentAddress] = useState();
  const [tableData, setTableData] = useState<TableAssetDataType[] | []>();
  const [topHolderData, setTopHolderData] = useState<HolderDataType[] | []>();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      if (account?.address) {
        const data = await fetchAssetBalance(account?.address);
        const processedData = getTableData(data);
        const aptosBalance = processedData.filter(token => token.symbol === 'APT');
        setAptBalance(aptosBalance[0].amount);
        setTableData(processedData);

        const holderData = await fetchTopHolder(10);
        setTopHolderData(holderData);
      }
    };

    fetchData();
  }, [account?.address]);

  const onChange: PaginationProps['onChange'] = (page) => {
    console.log(page);
    setCurrentPage(page);
  };

  return (
    <main className="flex-grow px-20 py-8">
      <section className="flex flex-col gap-6">
        <div>
          <div className="text-2xl leading-normal font-semibold">Your Account</div>
          <div>{account?.address}</div>
        </div>
        <div className="bg-white p-4 rounded-lg">
          <h2 className="mb-1 text-xs leading-normal font-bold text-[#76808f]">Aptos Balance</h2>
          <div className="flex justify-between items-end">
            <p className="text-xl font-semibold leading-6	">{aptBalance ? aptBalance / 100000000 : '--'} APT</p>
            <p className="text-xs ">5 $</p>
          </div>
        </div>
        <div>
          <div className="relative flex flex-col gap-4 px-6 py-4 w-full h-full text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
            <h2 className="text-sm">ASSETS HOLDING</h2>
            <p className="text-sm	text-[#aeb4bc]">A Total of {tableData?.length} tokens</p>
            <table className="w-full text-left table-auto min-w-max">
              <thead>
                <tr>
                  {table_head.map((head, index) => (

                    <th key={index} className="p-4 border-b border-slate-300 bg-customBlue">
                      <p className="block text-sm font-normal leading-none text-white">
                        {head}
                      </p>
                    </th>

                  ))}
                </tr>
              </thead>
              <tbody>
                {tableData?.map((token, index) => {
                  return (
                    <tr key={index} className="">
                      <td className="p-4 border-b border-slate-200">
                        <p className="block text-sm">
                          {token.name}
                        </p>
                      </td>
                      <td className="p-4 border-b border-slate-200">
                        <p className="block text-sm">
                          {token.symbol}
                        </p>
                      </td>
                      <td className="p-4 border-b border-slate-200">
                        <p className="block text-sm">
                          {Number(token.amount / 100000000).toFixed(3)}
                        </p>
                      </td>
                      <td className="p-4 border-b border-slate-200">
                      </td>
                      <td className="p-4 border-b border-slate-200">
                      </td>
                      <td className="p-4 border-b border-slate-200">
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            {/* <Pagination align="center" current={currentPage} onChange={onChange} total={50} /> */}
          </div>
        </div>

        <div>
          <div className="relative flex flex-col gap-4 px-6 py-4 w-full h-full text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
            <h2 className="text-sm">TOP HOLDERS</h2>
            <p className="text-sm	text-[#aeb4bc]">A Total of {topHolderData?.length} holders</p>
            <table className="w-full text-left table-auto min-w-max">
              <thead>
                <tr>
                  {topHolderTableHead.map((head, index) => (
                    <th key={index} className="p-4 border-b border-slate-300 bg-customBlue">
                      <p className="block text-sm font-normal leading-none text-white">
                        {head}
                      </p>
                    </th>

                  ))}
                </tr>
              </thead>
              <tbody>
                {topHolderData?.map((token, index) => {
                  return (
                    <tr key={index} className="">
                      <td className="p-4 border-b border-slate-200">
                        <p className="block text-sm">
                          {index + 1}
                        </p>
                      </td>
                      <td className="p-4 border-b border-slate-200">
                        <p className="block text-sm">
                          {token.owner_address}
                        </p>
                      </td>
                      <td className="p-4 border-b border-slate-200">
                        <p className="block text-sm">
                          {Number(token.amount / 100000000).toFixed(2)} APT
                        </p>
                      </td>
                      <td className="p-4 border-b border-slate-200">
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            {/* <Pagination align="center" current={currentPage} onChange={onChange} total={50} /> */}
          </div>
        </div>
      </section>
    </main >
  );
}
