import { Component, OnInit } from '@angular/core';
import { Product } from '../_model/product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../_services/product.service';

@Component({
  selector: 'app-product-view-details',
  templateUrl: './product-view-details.component.html',
  styleUrls: ['./product-view-details.component.css']
})
export class ProductViewDetailsComponent implements OnInit{
  selectedProductIndex = 0;
  product: Product | any;

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private productService: ProductService){}
  
  ngOnInit(): void {
    this.product = this.activatedRoute.snapshot.data['product'];
    console.log(this.product);
  }

  changeIndex(index: any){
    return this.selectedProductIndex = index;
  }

  buyProduct(productId: any){
    this.router.navigate(['/buyProduct', {
      isSingleProductCheckOut: true, id: productId
    }]);
  }
 
  // addToCart(productId: any){
  //   this.productService.addToCart(productId).subscribe(
  //     (resp) => {
  //       console.log(resp);
  //     },
  //     (error) => {
  //       console.log(error);
  //     }
  //   );
  //   console.log(productId);
  // }

}
