"use client";
import React, { useEffect, useState } from "react";
import { WalletName, useWallet } from '@aptos-labs/wallet-adapter-react';
import { fetchAssetBalance, fetchTokenMetadata, fetchTopHolder, HolderDataType, TokenMetadataType } from "@/utils/getData";
import { Pagination, Select } from "antd";
import type { PaginationProps, SelectProps } from 'antd';
import Link from "next/link";

const top_holder_table_head = [
    'Rank',
    'Address',
    'Aptos Balance',
    'Percentage',
]

const getDataList = (data: TokenMetadataType[]) => {
    return data.map(item => {
        return {
            label: item.symbol,
            value: item.asset_type,
        }
    })
}

export default function HoldersPage() {
    const [topHolderData, setTopHolderData] = useState<HolderDataType[] | []>();
    const [tokenList, setTokenList] = useState<{ value: string, label: string }[]>();
    const [currentToken, setCurrentToken] = useState<string>('0x1::aptos_coin::AptosCoin');
    const [currentPage, setCurrentPage] = useState(1);


    useEffect(() => {
        const fetchData = async () => {
            if (!tokenList) {
                const list = await fetchTokenMetadata();
                const processList = getDataList(list);
                setTokenList(processList);
            }
            const holderData = await fetchTopHolder(currentToken, 10);
            setTopHolderData(holderData);
        };

        fetchData();
    }, [currentToken]);

    const searchHandler = (value: string) => {
        setCurrentToken(value);
        console.log(value)
    }

    const onChange: PaginationProps['onChange'] = (page) => {
        console.log(page);
        setCurrentPage(page);
    };

    return (
        <main className="flex-grow px-20 py-8">
            <section className="flex flex-col gap-6">
                <div className="text-2xl leading-normal font-semibold">Top Holders By Token Balance</div>
                <div>
                    <div className="relative flex flex-col gap-4 px-6 py-4 w-full h-full text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
                        <div className="flex justify-between">
                            <h2 className="text-sm">TOP HOLDERS</h2>
                            <Select
                                showSearch
                                placeholder="Select a token"
                                filterOption={(input, option) =>
                                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                }
                                options={tokenList}
                                onChange={searchHandler}
                            />
                        </div>
                        <p className="text-sm text-[#aeb4bc]">A Total of {topHolderData ? topHolderData?.length : '--'} holders</p>
                        <table className="w-full text-left table-auto min-w-max">
                            <thead>
                                <tr>
                                    {top_holder_table_head.map((head, index) => (
                                        <th key={index} className="p-4 border-b border-slate-300 bg-customBlue">
                                            <p className="block text-sm font-normal leading-none text-white">
                                                {head}
                                            </p>
                                        </th>

                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {topHolderData?.length ? topHolderData?.map((token, index) => {
                                    return (
                                        <tr key={index} className="">
                                            <td className="p-4 border-b border-slate-200">
                                                <p className="block text-sm">
                                                    {index + 1}
                                                </p>
                                            </td>
                                            <td className="p-4 border-b border-slate-200">
                                                <p className="block text-sm">
                                                    <Link href={`/account/${token.owner_address}`}>{token.owner_address}</Link>
                                                </p>
                                            </td>
                                            <td className="p-4 border-b border-slate-200">
                                                <p className="block text-sm">
                                                    {Number(token.amount / 100000000).toFixed(2)} {token.metadata.symbol}
                                                </p>
                                            </td>
                                            <td className="p-4 border-b border-slate-200">
                                            </td>
                                        </tr>
                                    )
                                }) : (
                                    <tr>
                                        <td colSpan={top_holder_table_head.length} className="text-center py-4 border-b border-slate-200">
                                            No Data
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                        {/* <Pagination align="center" current={currentPage} onChange={onChange} total={50} /> */}
                    </div>
                </div>
            </section>
        </main >
    );
}
