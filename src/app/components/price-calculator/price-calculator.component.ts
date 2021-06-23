import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/interfaces/Product';
import { PriceItem } from 'src/app/interfaces/PriceItem';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-price-calculator',
  templateUrl: './price-calculator.component.html',
  styleUrls: ['./price-calculator.component.css']
})
export class PriceCalculatorComponent implements OnInit {

  formGroup: FormGroup;
  products: Product[] = [];
  priceItem: PriceItem | null = null;

  constructor(private formBuilder: FormBuilder, private productService: ProductService, private _snackBar: MatSnackBar) {
    this.formGroup = this.formBuilder.group({
      product: ['', Validators.required],
      quantity: [1, Validators.pattern("\\d+$")],
    })
  }

  ngOnInit(): void {
    this.getProducts()
  }

  onClick() {

    const productId: number = this.formGroup.controls['product'].value;
    const quantity: number = this.formGroup.controls['quantity'].value;
    console.log(productId, quantity)

    this.productService.getPrice(productId, quantity).subscribe(
      (response: any) => {
        console.log("Price Item: ", response)
        this.priceItem = response;
      }, error => {
        this._snackBar.open(error.error.errorMessage, "Close")
      }
    );
  }

  getProducts() {
    this.productService.getProducts().subscribe(
      (response: any) => {
        this.products = response;
        console.log("Product list: ", this.products)
      }, error => {
        this._snackBar.open(error.error.errorMessage, "Close")
      })
  }
}
