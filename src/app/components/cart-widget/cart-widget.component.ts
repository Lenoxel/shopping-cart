import { Component, ChangeDetectionStrategy } from "@angular/core";
import { Observable } from "rxjs";
import { CartService } from "../../services/cart.service";
import { CartItem } from "../../core/interfaces/cart-item.interface";

@Component({
  selector: "cart-widget",
  templateUrl: "cart-widget.component.html",
  styleUrls: ["cart-widget.component.css"],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class CartWidgetComponent {
  cartItems$: Observable<CartItem[]>;
  total$: Observable<number>;

  constructor(public cartService: CartService) {
    this.cartItems$ = cartService.getCartUpdates();
    this.total$ = cartService.getTotalUpdates();
  }
}
