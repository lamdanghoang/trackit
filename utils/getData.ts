const url = 'https://web3.nodit.io/v1/ethereum/mainnet/token/getTokensOwnedByAccount';
const apiKey: string = process.env.NEXT_PUBLIC_NODIT_API_KEY || '';

export const getTokenByAccount = async (account: string, pageIndex: number) => {
    const options = {
        method: 'POST',
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            'X-API-KEY': apiKey
        },
        body: JSON.stringify({
            accountAddress: account,
            withCount: true,
            rpp: 9,
            page: pageIndex
        })
    };

    try {
        const response = await fetch(url, options);
        console.log(response);
        const result = await response.json();
        console.log(result);
        return result;
    } catch (error) {
        throw new Error('Cannot fetch data. Try again later.');
    }
}