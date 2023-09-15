import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { Product } from '../_model/product.model';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { ShowProductImagesDialogComponent } from '../show-product-images-dialog/show-product-images-dialog.component';
import { ImageProcessingService } from '../image-processing.service';
import { map } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-product-details',
  templateUrl: './show-product-details.component.html',
  styleUrls: ['./show-product-details.component.css']
})
export class ShowProductDetailsComponent implements OnInit{

  showLoadButton = false;
  showTable =false;
  pageNumber: number = 0;

  constructor(private productService: ProductService,
    public imagesDialog: MatDialog,
    private imageProcessingService: ImageProcessingService,
    private router: Router){}

  productDetails: Product[] = [];
  displayedColumns: string[] = ['Id', 'Book Cover', 'Name', 'Description', 'Discounted Price', 'Actual Price', 'Actions'];

  ngOnInit(): void {
    this.getAllProducts();
  }

  public getAllProducts(searchKey: string = ""){
    this.showTable = false;
    this.productService.getAllProducts(this.pageNumber, searchKey)
    .pipe(
      map((x: Product[], i) => x.map((product: Product) => this.imageProcessingService.createImages(product)))
    )
    .subscribe(
      (resp: Product[]) => {
        console.log(resp);
        resp.forEach(product => this.productDetails.push(product));
        this.showTable = true;
        if(resp.length == 8){
          this.showLoadButton = true;
        }else {
          this.showLoadButton = false;
        }
      }, (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  public loadMoreProduct(){
    this.pageNumber = this.pageNumber + 1;
    this.getAllProducts()
  }

  public deleteProduct(productId: any){
    this.productService.deleteProduct(productId).subscribe(
      (resp) => {
        this.getAllProducts();
      },
      (error:HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  showImages(product: Product){
    console.log(product);
    this.imagesDialog.open(ShowProductImagesDialogComponent, {
      data: {
        images: product.productImage
      },
      height: '500px',
      width: '800px'
    });
  }

  editProductDetails(productId: any){
    this.router.navigate(['/addNewProduct', { productId: productId}]);
  }

  public searchProductDetailsByKeyword(searchkeyword: any){
    this.pageNumber = 0;
    this.productDetails = [];
    this.getAllProducts(searchkeyword);
  }

}
