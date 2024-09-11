import 'dotenv/config';

export const API_KEY = process.env.NEXT_PUBLIC_NODIT_API_KEY || '';

export const MAINNET = process.env.NEXT_PUBLIC_MAINNET_NETWORK;

export const TESTNET = process.env.NEXT_PUBLIC_TESTNET_NETWORK;

export const tokenList = [
    {
        label: "APT",
        value: "0x1::aptos_coin::AptosCoin",
    },
    {
        label: "USDC (LayerZero)",
        value: "0xf22bede237a07e121b56d91a491eb7bcdfd1f5907926a9e58338f964a01b17fa::asset::USDC",
    },
    {
        label: "USDT",
        value: "0xf22bede237a07e121b56d91a491eb7bcdfd1f5907926a9e58338f964a01b17fa::asset::USDT",
    },
    {
        label: "WETH (LayerZero)",
        value: "0xf22bede237a07e121b56d91a491eb7bcdfd1f5907926a9e58338f964a01b17fa::asset::WETH",
    },
    {
        label: "USDC (Wormhole)",
        value: "0x5e156f1207d0ebfa19a9eeff00d62a282278fb8719f4fab3a586a0a2c0fffbea::coin::T",
    },
    {
        label: "tAPT",
        value: "0x84d7aeef42d38a5ffc3ccef853e1b82e4958659d16a7de736a29c55fbbeb0114::staked_aptos_coin::StakedAptosCoin",
    },
    {
        label: "stAPT",
        value: "0xd11107bdf0d6d7040c6c0bfbdecb6545191fdf13e8d8d259952f53e1713f61b5::staked_coin::StakedAptos",
    },
    {
        label: "WETH (Wormhole)",
        value: "0xcc8a89c8dce9693d354449f1f73e60e14e347417854f029db5bc8e7454008abb::coin::T",
    },
    {
        label: "USDC (Celer)",
        value: "0x8d87a65ba30e09357fa2edea2c80dbac296e5dec2b18287113500b902942929d::celer_coin_manager::UsdcCoin",
    },
    {
        label: "SOL (Wormhole)",
        value: "0xdd89c0e695df0692205912fb69fc290418bed0dbe6e4573d744a6d5e6bab6c13::coin::T",
    },
    {
        label: "ANI",
        value: "0x16fe2df00ea7dde4a63409201f7f4e536bde7bb7335526a35d05111e68aa322c::AnimeCoin::ANI",
    },
    {
        label: "MOJO",
        value: "0x881ac202b1f1e6ad4efcff7a1d0579411533f2502417a19211cfc49751ddb5f4::coin::MOJO",
    },
    {
        label: "USDT (Celer)",
        value: "0x8d87a65ba30e09357fa2edea2c80dbac296e5dec2b18287113500b902942929d::celer_coin_manager::UsdtCoin",
    },
    {
        label: "BNB",
        value: "0x8d87a65ba30e09357fa2edea2c80dbac296e5dec2b18287113500b902942929d::celer_coin_manager::BnbCoin",
    },
    {
        label: "WBTC",
        value: "0xae478ff7d83ed072dbc5e264250e67ef58f57c99d89b447efd8a0a2e8b2be76e::coin::T",
    },
    {
        label: "MEE",
        value: "0xe9c192ff55cffab3963c695cff6dbf9dad6aff2bb5ac19a6415cad26a81860d9::mee_coin::MeeCoin",
    },
    {
        label: "GARI",
        value: "0x4def3d3dee27308886f0a3611dd161ce34f977a9a5de4e80b237225923492a2a::coin::T",
    },
    {
        label: "CAKE",
        value: "0x159df6b7689437016108a019fd5bef736bac692b6d4a1f10c941f6fbb9a74ca6::oft::CakeOFT",
    },
    {
        label: "",
        value: "",
    },
]
