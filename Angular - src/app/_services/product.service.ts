import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../_model/product.model';
import { OrderDetails } from '../_model/order-details.model';
import { MyOrderDetails } from '../_model/order.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient : HttpClient) { }

  public createTransaction(amount: any){
    return this.httpClient.get("http://localhost:9010/createTransaction/"+amount);
  }

  public markAsDelivered(orderId: any){
    return this.httpClient.get("http://localhost:9010/markOrderAsDelivered/"+orderId);
  }

  public getMyOrders(): Observable<MyOrderDetails[]> {
    return this.httpClient.get<MyOrderDetails[]>("http://localhost:9010/getOrderDetails")
  }

  public getAllOrderDetailsForAdmin(): Observable<MyOrderDetails[]> {
    return this.httpClient.get<MyOrderDetails[]>("http://localhost:9010/getAllOrderDetails")
  }


  public addProduct(product: FormData){
    return this.httpClient.post<Product>("http://localhost:9010/addNewProduct", product);
  }

  public getAllProducts(pageNumber: any, searchKeyword: string=""){
    return this.httpClient.get<Product[]>("http://localhost:9010/getAllProducts?pageNumber=" + pageNumber + "&searchKey=" + searchKeyword);
  }

  public getProductDetailsById(productId: any){
    return this.httpClient.get<Product>("http://localhost:9010/getProductDetailsById/"+productId);
  }

  public deleteProduct(productId: number){
    return this.httpClient.delete("http://localhost:9010/deleteProductDetails/"+productId);
  }

  public getProductDetails(isSingleProductCheckout: any, productId: any){
    return this.httpClient.get<Product[]>("http://localhost:9010/getProductDetails/"+isSingleProductCheckout+"/"+productId)
  }

  public placeOrder(orderDetails: OrderDetails){
    return this.httpClient.post("http://localhost:9010/placeOrder", orderDetails)
  }

  public addToCart(productId: any){
    return this.httpClient.get("http://localhost:9010/addToCart/"+productId);
  }

  // public getCartDetails(){
  //   return this.httpClient.get("http://localhost:9010/getCartDetails")
  // }
}
