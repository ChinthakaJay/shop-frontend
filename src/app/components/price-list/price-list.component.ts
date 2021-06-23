import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import {Product} from 'src/app/dtos/Product';
import {PriceItem} from 'src/app/dtos/PriceItem';

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

    const productId: number = this.formGroup.controls['product'].value;
    console.log(productId)

    this.productService.getPriceList(productId).subscribe(
      (response: any) => {
        console.log("Price list: ",response)
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
        console.log("Product list: ",this.products)
      }, error => {
        console.log(error)
      })
  }

}
