import { Component, OnInit } from '@angular/core';
import { Product } from '../_model/product.model';
import { NgForm } from '@angular/forms';
import { ProductService } from '../_services/product.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FileHandle } from '../_model/file-handle-module';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrls: ['./add-new-product.component.css']
})
export class AddNewProductComponent implements OnInit{
    isNewProduct = true;
  //Two-Way Binding .HTML to .TS
    product: Product = {
    productId: 0,
    productName: "",
    productDescription: "",
    productDiscountedPrice: 0,
    productActualPrice: 0,
    productImage: []
  }

  constructor(private productService: ProductService, private sanitizer: DomSanitizer,
    private activatedReoute: ActivatedRoute){ }

  ngOnInit(): void {
    this.product = this.activatedReoute.snapshot.data['product'];

    if(this.product && this.product.productId){
      this.isNewProduct = false;
    }
  }

  addProduct(productForm: NgForm){

    const productFormData = this.prepareFormData(this.product);

    this.productService.addProduct(productFormData).subscribe(
      (response: Product) => {
        console.log(response);
        productForm.reset();
        this.product.productImage = [];
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  prepareFormData(product: Product): FormData{
    const formData = new FormData();

    formData.append(
      'product',
      new Blob([JSON.stringify(product)], {type: 'application/json'})
    );

    for(var i=0; i<product.productImage.length; i++){
      formData.append(
        'imageFile',
        product.productImage[i].file,
        product.productImage[i].file.name
      )
    }
    return formData;
  }

  onFileSelected(event: any){
    if(event.target.files){
      const file = event.target.files[0];

      const fileHandle: FileHandle = {
        file: file,
        url: this.sanitizer.bypassSecurityTrustUrl(
          window.URL.createObjectURL(file)
        )
      }
      this.product.productImage.push(fileHandle);
    }
  }

  removeImage(i: number){
    this.product.productImage.splice(i, 1);
  }

  fileDropped(fileHandle: FileHandle){
    this.product.productImage.push(fileHandle);
  }

}
