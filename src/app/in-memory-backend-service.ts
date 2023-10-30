import { InMemoryDbService } from "angular-in-memory-web-api";

export interface ApiProduct {
  id: number;
  name: string;
  price: number;
  type?: string;
}

interface ApiCartItem {
  id: number;
  product: ApiProduct;
  amount: number;
  subtotal: number;
}

export class InMemoryBackendService implements InMemoryDbService {
  getDefaultProducts(): ApiProduct[] {
    return [
      { id: 1, name: "iPhone", price: 500, type: "promo" },
      { id: 2, name: "PlayStation", price: 250, type: "outlet" },
      { id: 3, name: "8K OLED TV", price: 300 },
      { id: 4, name: "4K Ultrabook", price: 600 },
      { id: 5, name: "iPad PRO", price: 600, type: "default" },
    ];
  }

  getDefaultCart(products: ApiProduct[]): ApiCartItem[] {
    const [iphone, playStation] = products;

    return [
      { id: 1, product: iphone, amount: 1, subtotal: iphone.price },
      {
        id: 2,
        product: playStation,
        amount: 2,
        subtotal: playStation.price * 2,
      },
    ];
  }

  createDb() {
    const products = this.getDefaultProducts();
    const cart = this.getDefaultCart(products);
    return {
      products,
      cart,
    };
  }
}
