import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit{

  displayedColumns: string[] = ['Id', 'Product Name', 'Name', 'Address', 'Contact No.', 'Status', 'Action'];
  dataSource: any[] = [];

  constructor(private productService: ProductService){}
  ngOnInit(): void {
    this.getAllOrderDetailsForAdmin();
  }

  getAllOrderDetailsForAdmin(){
    this.productService.getAllOrderDetailsForAdmin().subscribe(
      (resp: any[]) => {
        console.log(resp);
        this.dataSource = resp;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  markAsDelivered(orderId: any){
    console.log(orderId);
    this.productService.markAsDelivered(orderId).subscribe(
      (resp) => {
        this.getAllOrderDetailsForAdmin();
        console.log(resp);
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
