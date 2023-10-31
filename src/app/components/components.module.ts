import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { CartItemControlComponent } from "./cart-item/cart-item-control.component";
import { CartWidgetComponent } from "./cart-widget/cart-widget.component";
import { ProductsListComponent } from "./product-list/products-list.component";
import { CoreModule } from "../core/core.module";
import { HeaderComponent } from "./header/header/header.component";
import { ProductCardComponent } from "./product-card/product-card/product-card.component";

@NgModule({
  declarations: [
    ProductsListComponent,
    CartWidgetComponent,
    CartItemControlComponent,
    HeaderComponent,
    ProductCardComponent,
  ],
  imports: [BrowserModule, CoreModule],
  exports: [
    ProductsListComponent,
    CartWidgetComponent,
    CartItemControlComponent,
    HeaderComponent,
    ProductCardComponent,
  ],
})
export class ComponentsModule {}
