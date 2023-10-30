import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { Observable } from "rxjs";

import { ProductsService } from "../../services/products.service";
import { Product } from "../../core/interfaces/product.interface";

@Component({
  selector: "home-page",
  templateUrl: "home.component.html",
  styles: [],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class HomePageComponent implements OnInit {
  products$: Observable<Product[]>;

  constructor(public productsService: ProductsService) {
    this.products$ = this.productsService.fetchAll();
  }

  ngOnInit() {}
}
