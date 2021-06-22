import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';

export interface Product {
  name: string;
  id: number;
}

export interface PriceItem {
  quantity: number;
  price: number;

}

@Component({
  selector: 'app-price-list',
  templateUrl: './price-list.component.html',
  styleUrls: ['./price-list.component.css']
})
export class PriceListComponent implements OnInit {

  formGroup: FormGroup;
  products: Product[] = [];
  priceList: PriceItem[] = []
  displayedColumns: string[] = ['quantity', 'price'];


  constructor(private formBuilder: FormBuilder, private productService: ProductService) {
    this.formGroup = this.formBuilder.group({
      product: []
    })
  }

  ngOnInit(): void {
    this.getProducts()
  }

  onSubmit() {

    const productId = this.formGroup.controls['product'].value;
    console.log(productId)

    this.productService.getPriceList(productId).subscribe(
      (response: any) => {
        console.log(response)
        this.priceList = response;
      }, error => {
        console.log(error)
      }
    );
  }

  getProducts() {
    this.productService.getProducts().subscribe(
      (response: any) => {

        this.products = response;
        console.log(this.products)
      }, error => {
        console.log(error)
      })
  }

}
