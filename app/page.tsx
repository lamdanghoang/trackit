"use client";
import React, { useEffect, useState } from "react";
import { WalletName, useWallet } from '@aptos-labs/wallet-adapter-react';
import { fetchAssetBalance, fetchNFTsBalance, BalanceDataType, NftDataType } from "@/utils/getData";
import { Tabs } from 'antd';

interface TableAssetDataType {
  name: string;
  symbol: string;
  amount: number;
  price: string;
  percentChangeFor24h: string;
  value: string;
}

interface TableNftDataType {
  name: string;
  amount: number;
  creator: string;
}

const tabList = [
  'Coins',
  'NFT',
]

const asset_table_head = [
  'Asset',
  'Symbol',
  'Quantity',
  'Price',
  'Change (24h)',
  'Value'
];

const nft_table_head = [
  'Name',
  'Amount',
  'Creator',
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

const getNftTableData = (data: NftDataType[]) => {
  // This function will transform the balance data and potentially fetch additional info
  return data.map((item) => {
    // Extract relevant information from each balance item
    const name = item.current_token_data.token_name;
    const amount = item.amount;
    const creator = item.current_token_data.current_collection.creator_address;

    return {
      name,
      amount,
      creator,
    };
  });
};

export default function HomePage() {
  const { connect, disconnect, account, connected } = useWallet();
  const [aptBalance, setAptBalance] = useState<number>();
  const [currentAddress, setCurrentAddress] = useState();
  const [assetData, setAssetData] = useState<TableAssetDataType[] | []>();
  const [nftData, setNftData] = useState<TableNftDataType[] | []>();
  const [selectedTab, setSelectedTab] = useState<string>('0');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      if (account?.address) {
        const assetData = await fetchAssetBalance(account?.address);
        const processedAssetData = getTableData(assetData);

        const assetBalance = processedAssetData.filter(token => token.symbol === 'APT');

        const nftData = await fetchNFTsBalance(account?.address);
        const processedNftData = getNftTableData(nftData);

        setAptBalance(assetBalance[0].amount);
        setAssetData(processedAssetData);
        setNftData(processedNftData);
      }
    };

    fetchData();
  }, [account?.address]);

  // const onChange: PaginationProps['onChange'] = (page) => {
  //   console.log(page);
  //   setCurrentPage(page);
  // };

  const tabChangeHandler = (key: string) => {
    setSelectedTab(key);
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
        <Tabs
          onChange={tabChangeHandler}
          type="card"
          items={tabList.map((val, i) => {
            return {
              label: `${val}`,
              key: String(i),
            };
          })}
        />
        {selectedTab === '0' &&
          <div className="-mt-10 relative flex flex-col gap-4 px-6 py-4 w-full h-full text-gray-700 bg-white shadow-md rounded-b-lg bg-clip-border">
            <h2 className="text-sm">ASSETS HOLDING</h2>
            <p className="text-sm	text-[#aeb4bc]">A Total of {assetData?.length} tokens</p>
            <table className="w-full text-left table-auto min-w-max">
              <thead>
                <tr>
                  {asset_table_head.map((head, index) => (

                    <th key={index} className="p-4 border-b border-slate-300 bg-customBlue">
                      <p className="block text-sm font-normal leading-none text-white">
                        {head}
                      </p>
                    </th>

                  ))}
                </tr>
              </thead>
              <tbody>
                {assetData?.length ? (assetData?.map((token, index) => {
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
                })) : (
                  <tr>
                    <td colSpan={asset_table_head.length} className="text-center py-4 border-b border-slate-200">
                      No Token
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            {/* <Pagination align="center" current={currentPage} onChange={onChange} total={50} /> */}
          </div>
        }

        {selectedTab === '1' &&
          <div className="-mt-10 relative flex flex-col gap-4 px-6 py-4 w-full h-full text-gray-700 bg-white shadow-md rounded-b-lg bg-clip-border">
            <h2 className="text-sm">NFT ASSETS</h2>
            <p className="text-sm	text-[#aeb4bc]">A Total of {nftData?.length} NFTs</p>
            <table className="w-full text-left table-auto min-w-max">
              <thead>
                <tr>
                  {nft_table_head.map((head, index) => (

                    <th key={index} className="p-4 border-b border-slate-300 bg-customBlue">
                      <p className="block text-sm font-normal leading-none text-white">
                        {head}
                      </p>
                    </th>

                  ))}
                </tr>
              </thead>
              <tbody>
                {nftData?.length ? (nftData?.map((item, index) => {
                  return (
                    <tr key={index} className="">
                      <td className="p-4 border-b border-slate-200">
                        <p className="block text-sm">
                          {item.name}
                        </p>
                      </td>
                      <td className="p-4 border-b border-slate-200">
                        <p className="block text-sm">
                          {item.amount}
                        </p>
                      </td>
                      <td className="p-4 border-b border-slate-200">
                        <p className="block text-sm">
                          {item.creator}
                        </p>
                      </td>
                    </tr>
                  )
                })) : (
                  <tr>
                    <td colSpan={nft_table_head.length} className="text-center py-4 border-b border-slate-200">
                      No NFT
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            {/* <Pagination align="center" current={currentPage} onChange={onChange} total={50} /> */}
          </div>
        }
      </section>
    </main >
  );
}
