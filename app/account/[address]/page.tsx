'use client'

import { fetchTransactionByAccount, TableTransactionDataType, fetchAssetBalance, BalanceDataType } from '@/utils/getData';
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react';

const table_head = [
    'Version #',
    'Hash',
    'Age',
    'Sender',
    'Amount',
];

function timestampToString(timestamp: string) {
    const date = new Date(+timestamp / 1000);
    const monthNames = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    const
        month = monthNames[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
}


const getTransactionTableData = (data: any[]) => {
    // This function will transform the data and potentially fetch additional info
    return data.reverse().map((item) => {
        const version: string = item.version;
        const hash: string = item.hash;
        const shortHash: string = `${hash.slice(0, 5)}...${hash.slice(-6)}`;
        const timestamp: string = item.timestamp;
        const date = timestampToString(timestamp);
        const sender: string = item.sender;
        const shortSender: string = `${sender.slice(0, 4)}...${sender.slice(-7)}`;
        const amount: number = +(item.payload.arguments[1]) / 100000000;

        return {
            version,
            hash,
            shortHash,
            timestamp,
            date,
            sender,
            shortSender,
            amount,
        };
    });
};

const getTableData = (data: BalanceDataType[]) => {
    // This function will transform the balance data and potentially fetch additional info
    return data.map((item) => {
        // Extract relevant information from each balance item
        const name = item.metadata?.name;
        const symbol = item.metadata?.symbol;
        const amount = item.amount;
        const price = '';
        const percentChangeFor24h = '';
        const value = '';

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

export default function AccountPage() {
    const params = useParams<{ address: string }>();
    const [aptBalance, setAptBalance] = useState<number>();
    const [transactionData, setTransactionData] = useState<TableTransactionDataType[] | []>();

    useEffect(() => {
        const fetchData = async () => {
            if (params.address) {
                const assetData = await fetchAssetBalance(params.address);
                const processedAssetData = getTableData(assetData);
                const assetBalance = processedAssetData.filter(token => token.symbol === 'APT');

                const transactionData = await fetchTransactionByAccount(params.address, 10);
                const processedData = getTransactionTableData(transactionData);

                setTransactionData(processedData);
                setAptBalance(assetBalance[0].amount);
            }
        }

        fetchData();
        console.log(transactionData);
    }, [params.address]);

    return (
        <main className="flex-grow px-20 py-8">
            <section className="flex flex-col gap-6">
                <div>
                    <div className="text-2xl leading-normal font-semibold">Account</div>
                    <div>{params.address}</div>
                </div>
                <div className="bg-white p-4 rounded-lg">
                    <h2 className="mb-1 text-xs leading-normal font-bold text-[#76808f]">Aptos Balance</h2>
                    <div className="flex justify-between items-end">
                        <p className="text-xl font-semibold leading-6">{aptBalance ? (aptBalance / 100000000) : '--'} APT</p>
                        {/* <p className="text-xs ">5 $</p> */}
                    </div>
                </div>
                <div>
                    <div className="relative flex flex-col gap-4 px-6 py-4 w-full h-full text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
                        <h2 className="text-sm">TRANSACTIONS</h2>
                        <p className="text-sm	text-[#aeb4bc]">Latest {transactionData?.length} transactions</p>
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
                                {transactionData?.map((item, index) => {
                                    return (
                                        <tr key={index} className="">
                                            <td className="p-4 border-b border-slate-200">
                                                <p className="block text-sm">
                                                    {item.version}
                                                </p>
                                            </td>
                                            <td className="p-4 border-b border-slate-200">
                                                <p className="block text-sm">
                                                    {item.shortHash}
                                                </p>
                                            </td>
                                            <td className="p-4 border-b border-slate-200">
                                                <p className="block text-sm">
                                                    {item.date}
                                                </p>
                                            </td>
                                            <td className="p-4 border-b border-slate-200">
                                                <p className="block text-sm">
                                                    {item.shortSender}
                                                </p>
                                            </td>
                                            <td className="p-4 border-b border-slate-200">
                                                <p className="block text-sm">
                                                    {item.amount || '0'} APT
                                                </p>
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