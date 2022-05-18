import axios from 'axios';

export interface IBuyXForPriceY {
    buyX: number;
    forPriceY: number;
}

export interface IBuyXGetYFree {
    buyX: number;
    getY: number;
}

export enum DiscountType {
    buyXForPriceY = "buyXForPriceY",
    buyXGetYFree = "buyXGetYFree"
}

export interface IProduct {
    "id": number,
    "name": string,
    "price": number,
    "unit": string | null,
    "image": string,
    "discountType": DiscountType,
    "discountValue": IBuyXForPriceY | IBuyXGetYFree,
}

interface IProductResponse {
    products: IProduct[]
}

// fetch products list from mock API
export const getProducts = async () => {
    try {
        const res = await axios.get('/json/products.json');
        const data = res.data as IProductResponse;
        if (data == null || data.products == null)
            throw new Error("missing product info");
        return data.products;
    } catch (err) {
        if (err instanceof Error)
            throw new Error('Error in fetching products: ' + err.message);
        return [];
    }
}