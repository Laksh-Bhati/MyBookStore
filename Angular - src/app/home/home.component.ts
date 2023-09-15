import { AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from '../_services/product.service';
import { HttpErrorResponse } from '@angular/common/http';
import { map } from 'rxjs';
import { Product } from '../_model/product.model';
import { ImageProcessingService } from '../image-processing.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  showLoadButton = false;
  pageNumber: number = 0;
  productDetails: Product[] = [];

  constructor(private productService: ProductService,
    private imageProcessingService: ImageProcessingService,
    private router: Router) { }

  ngOnInit(): void {
    this.getAllProducts();   
  }
 
  public getAllProducts(searchKey: string = ""){
    this.productService.getAllProducts(this.pageNumber, searchKey)
    .pipe(
      map((x: Product[], i) => x.map((product: Product) => this.imageProcessingService.createImages(product!)))
    )
    .subscribe(
      (resp: Product[]) => {
        console.log(resp);
        resp.forEach(p => this.productDetails.push(p));
        if(resp.length == 8){
          this.showLoadButton = true;
        }else{
          this.showLoadButton = false;
        }
      }, (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }


 public myPix = new Array("/assets/images/Fool.jpg", "/assets/images/RichPoor.jpg",
                          "/assets/images/OpBook.jpg", "/assets/images/Tbate.jpg",
                          "/assets/images/SLeveling.jpg", "/assets/images/Guts.jpg",
                          "/assets/images/JLaw.jpg", "/assets/images/Guts2.jpg",
                          "/assets/images/sun.jpg", "/assets/images/sung.jpg",
                          "/assets/images/Asta.jpg", "/assets/images/Jujutsu.jpg",
                          "/assets/images/Op1.jpg", "/assets/images/Beru.jpg",
                          "/assets/images/Hell.jpg", "/assets/images/Aot.jpg",
                          "/assets/images/Bleach.jpg", "/assets/images/Miyamoto1.jpg",
                          "/assets/images/Jk.jpg", "/assets/images/Bleach2.jpg",
                          "/assets/images/SLeveling2.jpg", "/assets/images/OnePiece2.jpg",
                          "/assets/images/BC1.jpg", "/assets/images/OnePiece3.jpg",
                          "/assets/images/Berserk1.jpg", "/assets/images/Sword.jpg",
                          "/assets/images/GOH.jpg", "/assets/images/GOH1.jpg",
                          "/assets/images/Tbate1.jpg", "/assets/images/Tbate2.jpg",
                          "/assets/images/Tbate3.jpg", "/assets/images/Tbate4.jpg",
                          "/assets/images/Berserk2.jpg", "/assets/images/Opm3.jpg",
                          "/assets/images/Naruto1.jpg", "/assets/images/Asta1.jpg",
                          "/assets/images/Asta2.jpg", "/assets/images/Asta3.jpg",
                          "/assets/images/Opm1.jpg", "/assets/images/Opm2.jpg",
                          "/assets/images/MHA.jpg", "/assets/images/MHA1.jpg",
                          "/assets/images/MHA2.jpg", "/assets/images/MHA3.jpg",
                          "/assets/images/ROR1.jpg", "/assets/images/ROR2.jpg",
                          "/assets/images/Wolverine.jpg", "/assets/images/Wolverine1.jpg",
                          "/assets/images/Wolverine2.jpg", "/assets/images/Igris.jpg",
                          "/assets/images/TR.jpg", "/assets/images/TR1.jpg",
                          "/assets/images/Ace.jpg", "/assets/images/Gear5.jpg",
                          "/assets/images/Sukuna.jpg", "/assets/images/Vinsmoke.jpg",
                          "/assets/images/Vinsmoke1.jpg", "/assets/images/Levi.jpg",
                          "/assets/images/Levi1.jpg", "/assets/images/Goh2.jpg",
                          "/assets/images/LONB.jpg", "/assets/images/LONB1.jpg",
                          "/assets/images/LONB2.jpg", "/assets/images/Lookism.jpg",
                          "/assets/images/Lookism1.jpg", "/assets/images/Lookism2.jpg", 
                          "/assets/images/Lookism3.jpg");

 public random(){
  return Math.floor(Math.random() * this.myPix.length);
 }

  showProductDetails(productId: any){
    this.router.navigate(['/productViewDetails', {productId: productId}])
  }

  public loadMoreProduct(){
    this.pageNumber = this.pageNumber + 1;
    this.getAllProducts();
  }

  searchByKeyword(searchkeyword: any){
    this.pageNumber = 0;
    this.productDetails = [];
    this.getAllProducts(searchkeyword);
  }

}



