import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/dtos/Product';
import { PriceItem } from 'src/app/dtos/PriceItem';


@Component({
  selector: 'app-price-calculator',
  templateUrl: './price-calculator.component.html',
  styleUrls: ['./price-calculator.component.css']
})
export class PriceCalculatorComponent implements OnInit {

  formGroup: FormGroup;
  products: Product[] = [];
  priceItem: PriceItem = { 'quantity': 0, 'price': "0" };
  isProductSelected: boolean = false;
  isQuantityValid: boolean = true;

  constructor(private formBuilder: FormBuilder, private productService: ProductService) {
    this.formGroup = this.formBuilder.group({
      product: [],
      quantity: [1, Validators.pattern("\\d+$")],
    })
  }

  ngOnInit(): void {
    this.getProducts()
  }

  onSelectionChange() {
    this.isProductSelected = true
  }

  onChange(){
    if(this.formGroup.controls['quantity'].errors) {
      this.isQuantityValid = false
    } else {
      this.isQuantityValid =true
    }
  }

  onClick() {

    const productId: number = this.formGroup.controls['product'].value;
    const quantity: number = this.formGroup.controls['quantity'].value;

    this.productService.getPrice(productId, quantity).subscribe(
      (response: any) => {
        console.log("Price Item: ",response)
        this.priceItem = response;
      }, error => {
        console.log(error)
      }
    );
  }

  getProducts() {
    this.productService.getProducts().subscribe(
      (response: any) => {
        this.products = response;
        console.log("Product list: ",this.products)
      }, error => {
        console.log(error)
      })
  }

}
