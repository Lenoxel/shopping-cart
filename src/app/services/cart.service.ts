import { CartDataService } from "./cart-data.service";
import { Injectable } from "@angular/core";
import { CartItem } from "../core/interfaces/cart-item.interface";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { Product } from "../core/interfaces/product.interface";

interface CartProducts {
  items: CartItem[];
  total: number;
}

@Injectable()
export class CartService {
  protected _products: CartProducts = {
    items: [],
    total: 0,
  };

  protected _cartState = new Subject<CartProducts>();

  constructor(protected dataService: CartDataService) {
    this.getStoredCartItems().subscribe((storedCartItems) => {
      const cartProducts = {
        items: storedCartItems,
        total: this.calculateTotal(storedCartItems),
      };
      this.updateCartState(cartProducts);
    });
  }

  getStoredCartItems() {
    return this.dataService.fetchAll();
  }

  private handleUpdateCartItems(cartProducts: CartProducts) {
    cartProducts.total = this.calculateTotal(cartProducts.items);
    this.updateCartState(cartProducts);
  }

  addProduct(product: Product) {
    const productsToUpdate: CartProducts = {
      items: [...this._products.items],
      total: this._products.total,
    };

    const alreadyExistantCartItem = productsToUpdate.items.find(
      (item) => item.product?.id === product.id
    );

    if (alreadyExistantCartItem) {
      alreadyExistantCartItem.amount += 1;
      this.calculateSubtotal(alreadyExistantCartItem);
    } else {
      const newCartItem: CartItem = {
        id: productsToUpdate.items.length + 1,
        amount: 1,
        product,
        subtotal: 0,
      };
      this.calculateSubtotal(newCartItem);
      productsToUpdate.items.push(newCartItem);
    }

    this.handleUpdateCartItems(productsToUpdate);
  }

  removeProduct(product: Product, shouldRemoveAll = false) {
    const productsToUpdate: CartProducts = {
      items: [...this._products.items],
      total: this._products.total,
    };

    const alreadyExistantCartItemIndex = productsToUpdate.items.findIndex(
      (item) => item.product?.id === product.id
    );

    if (alreadyExistantCartItemIndex === -1) {
      return;
    }

    const alreadyExistantCartItem =
      productsToUpdate.items[alreadyExistantCartItemIndex];

    if (shouldRemoveAll || alreadyExistantCartItem.amount === 1) {
      productsToUpdate.items.splice(alreadyExistantCartItemIndex, 1);
    } else {
      alreadyExistantCartItem.amount -= 1;
      this.calculateSubtotal(alreadyExistantCartItem);
    }

    this.handleUpdateCartItems(productsToUpdate);
  }

  removeAllProducts() {
    this.handleUpdateCartItems({
      items: [],
      total: 0,
    });
  }

  //HELPER METHODS

  protected updateCartState(products: CartProducts) {
    this._products = products;
    this._cartState.next(products);
  }

  protected calculateTotal(items: CartItem[]): number {
    return items.reduce((total, item) => (total += item.subtotal), 0);
  }

  protected calculateSubtotal(item: CartItem): CartItem {
    item.subtotal = item.product.price * item.amount;
    return item;
  }

  protected getProducts() {
    return this._products;
  }

  getItems() {
    return this.getProducts().items;
  }

  getItem(productId: number) {
    return this.getProducts().items.find(
      (item) => item.product.id === productId
    );
  }

  getTotal() {
    return this.getProducts().total;
  }

  getCartUpdates() {
    return this._cartState.pipe(map(() => this.getItems()));
  }

  getItemUpdates(productId: number) {
    return this._cartState.pipe(map(() => this.getItem(productId)));
  }

  getTotalUpdates() {
    return this._cartState.pipe(map((s) => s.total));
  }
}
