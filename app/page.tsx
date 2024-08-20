"use client";
import React, { useState } from "react";
import { WalletName, useWallet } from '@aptos-labs/wallet-adapter-react';
import { getTokenByAccount } from "@/utils/getData";
import { Pagination } from "antd";
import type { PaginationProps } from 'antd';

const table_head = [
  'Asset',
  'Symbol',
  'Quantity',
  'Price',
  'Change (24h)',
  'Value'
]

export default function Home() {
  const { connect, disconnect, account, connected } = useWallet();
  const address = account?.address;
  const [currentPage, setCurrentPage] = useState(1);

  const onChange: PaginationProps['onChange'] = (page) => {
    console.log(page);
    setCurrentPage(page);
  };

  if (address) {
    // const data = getTokenByAccount("0xA7CdED275218A6D0E0b36391ddEb7986D2aea755", 1);
    // console.log('Data: ', data);
  }

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
                  {table_head.map(head => (

                    <th className="p-4 border-b border-slate-300 bg-slate-50">
                      <p className="block text-sm font-normal leading-none text-slate-500">
                        {head}
                      </p>
                    </th>

                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="">
                  <td className="p-4 border-b border-slate-200">
                    <p className="block text-sm text-slate-800">
                      John Michael
                    </p>
                  </td>
                  <td className="p-4 border-b border-slate-200">
                    <p className="block text-sm text-slate-800">
                      Manager
                    </p>
                  </td>
                  <td className="p-4 border-b border-slate-200">
                    <p className="block text-sm text-slate-800">
                      23/04/18
                    </p>
                  </td>
                  <td className="p-4 border-b border-slate-200">
                  </td>
                </tr>
              </tbody>
            </table>
            <Pagination align="center" current={currentPage} onChange={onChange} total={50} />;
          </div>
        </div>
      </section>
    </main >
  );
}
