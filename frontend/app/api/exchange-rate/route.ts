import { NextResponse } from "next/server";

type TwelveDataQuoteResponse = {
    symbol?: string;
    close?: string;
    previous_close?: string;
    change?: string;
    percent_change?: string;
    high?: string;
    low?: string;
    datetime?: string;
    code?: number;
    message?: string;
    status?: string;
};

export async function GET() {
    const apiKey = process.env.TWELVE_DATA_API_KEY;

    if (!apiKey) {
        return NextResponse.json(
            { message: "Twelve Data API key is not configured." },
            { status: 500 },
        );
    }

    const url = new URL("https://api.twelvedata.com/quote");

    url.searchParams.set("symbol", "USD/JPY");
    url.searchParams.set("apikey", apiKey);

    try {
        const response = await fetch(url, {
            cache: "no-store",
        });

        if (!response.ok) {
            return NextResponse.json(
                { message: "Failed to fetch exchange-rate data." },
                { status: response.status },
            );
        }

        const data = (await response.json()) as TwelveDataQuoteResponse;

        if (data.status === "error") {
            return NextResponse.json(
                {
                    message: data.message ?? "Twelve Data returned an error.",
                },
                { status: data.code ?? 502 },
            );
        }
        if (
            data.close === undefined ||
            data.change === undefined ||
            data.percent_change === undefined ||
            data.high === undefined ||
            data.low === undefined
        ) {
            return NextResponse.json(
                { message: "Exchange-rate data is incomplete." },
                { status: 502 },
            );
        }
        const exchangeRate = {
            pair: data.symbol ?? "USD/JPY",
            price: Number(data.close),
            change: Number(data.change),
            changePercent: Number(data.percent_change),
            dayHigh: Number(data.high),
            dayLow: Number(data.low),
            updatedAt: data.datetime ?? new Date().toISOString(),
        };

        return NextResponse.json(exchangeRate);
    } catch (error) {
        console.error("Exchange-rate API error:", error);

        return NextResponse.json(
            { message: "Unexpected server error." },
            { status: 500 },
        );
    }
}