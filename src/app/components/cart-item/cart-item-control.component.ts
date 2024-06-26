import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  OnDestroy,
} from "@angular/core";
import { Subscription } from "rxjs";

import { Product } from "../../core/interfaces/product.interface";
import { CartItem } from "../../core/interfaces/cart-item.interface";
import { CartService } from "../../services/cart.service";

@Component({
  selector: "cart-item-control",
  templateUrl: "cart-item-control.component.html",
  styleUrls: ["cart-item-control.component.css"],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class CartItemControlComponent implements OnInit, OnDestroy {
  @Input() product: Product;

  item: CartItem;
  cartItem$: Subscription;

  constructor(public cartService: CartService) {}

  ngOnInit() {
    this.item = this.cartService.getItem(this.product.id);
    this.cartItem$ = this.cartService
      .getItemUpdates(this.product.id)
      .subscribe((item) => {
        this.item = item;
      });
  }

  ngOnDestroy() {
    this.cartItem$.unsubscribe();
  }
}
