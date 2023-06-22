import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/models/product';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-listar-productos',
  templateUrl: './listar-productos.component.html',
  styleUrls: ['./listar-productos.component.css']
})
export class ListarProductosComponent implements OnInit {

  listProducts:Product[] = [] ;

  


  constructor(private _productService: ProductoService, private toastr: ToastrService){

  }

  ngOnInit(): void {
    this.getProducts();
    
  }

  getProducts(){
    this._productService.getProducts().subscribe(data => {
      console.log(data);
      this.listProducts = data;
    } , error => {
      console.log(error);
    }
    )
  }

  deleteProduct(id: any){
    this._productService.deleteProduct(id).subscribe(data => {
      this.toastr.error('the product was successfully removed','removed product');
      this.getProducts();
    },error =>{
      console.log(error);

    });
  }

}
