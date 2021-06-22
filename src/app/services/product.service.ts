import { Injectable } from '@angular/core';
import {
  HttpClient,
} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) {}

  getProducts(){
    return this.httpClient.get("http://localhost:8086/v1/products");
  }

  getPriceList(productId: number){
    return this.httpClient.get(`http://localhost:8086/v1/products/${productId}/price-list`);
  }
}
