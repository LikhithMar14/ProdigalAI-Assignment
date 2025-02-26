import { NextResponse } from "next/server";

//Implemented Mock NextJs route

export async function GET(request: Request) {
    const mockData = [
        {
            id: 1,
            title: "Dummy Product 1",
            price: 29.99,
            description: "This is a mock product description.",
            category: "electronics",
            image: "https://via.placeholder.com/150",
            rating: { rate: 4.5, count: 120 }
        },
        {
            id: 2,
            title: "Dummy Product 2",
            price: 49.99,
            description: "Another mock product description.",
            category: "clothing",
            image: "https://via.placeholder.com/150",
            rating: { rate: 3.8, count: 89 }
        }
    ];

    return NextResponse.json(mockData);
}
