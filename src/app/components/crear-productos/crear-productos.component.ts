import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ToastrService } from 'ngx-toastr';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-crear-productos',
  templateUrl: './crear-productos.component.html',
  styleUrls: ['./crear-productos.component.css']
})
export class CrearProductosComponent {
  productForm: FormGroup;
  title = 'Create Product';
  id: string | null;

  constructor(private fb: FormBuilder, private router: Router, private toastr: ToastrService, private _productService: ProductoService, private aRouter: ActivatedRoute){
    this.productForm = this.fb.group({
      product:['', Validators.required],
      category:['', Validators.required],
      ubication:['', Validators.required],
      price:['', Validators.required],

    })
    this.id = this.aRouter.snapshot.paramMap.get('id');
  }


  ngOnInit(): void {
    this.isUpdate();
  }

  addProduct(){

    const PRODUCT: Product = {
      name: this.productForm.get('product')?.value,
      category: this.productForm.get('category')?.value,
      ubication: this.productForm.get('ubication')?.value,
      price: this.productForm.get('price')?.value,
    }

    if(this.id !== null){
      // Update Product
      console.log(PRODUCT);
      this._productService.updateProduct(this.id,PRODUCT).subscribe(data => {
        this.toastr.info('Product successfully updated!', 'Product Updated!');
        this.router.navigate(['/']);
      }, error =>{
        console.log(error);
        this.productForm.reset();
      });
    } else {
      // Create Product
      this._productService.saveProduct(PRODUCT).subscribe(data => {
        this.toastr.success('The product was registered successfully!', 'Registered Product!');
        this.router.navigate(['/']);
      }, error =>{
        console.log(error);
        this.productForm.reset();
      });
    }

    
  }

  isUpdate(){

    if(this.id !== null ){
      this.title = 'Update Product';
      this._productService.getProduct(this.id).subscribe(data => {
        this.productForm.setValue({
      product: data.name,
      category: data.category,
      ubication: data.ubication,
      price: data.price,
        })


      });
    }

  }

}
