"use client";
import React, { useEffect, useState } from "react";
import { WalletName, useWallet } from '@aptos-labs/wallet-adapter-react';
import { fetchAssetBalance } from "@/utils/getData";
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

interface TableDataType {
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
  const [balanceData, setBalanceData] = useState<BalanceDataType[] | []>();
  const [tableData, setTableData] = useState<TableDataType[] | []>();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      if (account?.address) {
        const data = await fetchAssetBalance(account?.address);
        const processedData = getTableData(data);
        setTableData(processedData);
      }
    };

    fetchData();
  }, [account?.address]);

  const onChange: PaginationProps['onChange'] = (page) => {
    console.log(page);
    setCurrentPage(page);
  };

  return (
    <main className="flex-grow p-10">
      <section className="">
        <div className="">
          <div className="text-2xl leading-normal font-semibold">Account</div>
          <div>{account?.address}</div>
        </div>
        <div className="bg-card p-4 rounded-lg">
          <h2 className="text-xs leading-normal font-bold text-[#76808f]">Aptos Balance</h2>
          <div className="flex justify-between">
            <p className="text-xl font-semibold leading-6	">23835758.71509017 APT</p>
            <p className="text-xs ">$ 140,630,976.41</p>
          </div>
        </div>
        <div>
          <div className="relative flex flex-col w-full h-full text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
            <h2 className="text-sm">ASSETS HOLDING</h2>
            <p className="text-sm	text-[#aeb4bc]">A Total of 20 tokens</p>
            <table className="w-full text-left table-auto min-w-max">
              <thead>
                <tr>
                  {table_head.map((head, index) => (

                    <th key={index} className="p-4 border-b border-slate-300 bg-slate-50">
                      <p className="block text-sm font-normal leading-none text-slate-500">
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
                        <p className="block text-sm text-slate-800">
                          {token.name}
                        </p>
                      </td>
                      <td className="p-4 border-b border-slate-200">
                        <p className="block text-sm text-slate-800">
                          {token.symbol}
                        </p>
                      </td>
                      <td className="p-4 border-b border-slate-200">
                        <p className="block text-sm text-slate-800">
                          {token.amount}
                        </p>
                      </td>
                      <td className="p-4 border-b border-slate-200">
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            <Pagination align="center" current={currentPage} onChange={onChange} total={50} />;
          </div>
        </div>
      </section>
    </main >
  );
}
