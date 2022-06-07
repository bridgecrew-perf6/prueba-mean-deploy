import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent implements OnInit {

  titulo: string = 'Crear producto';
  id: string | null;

  productoForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private productoService: ProductoService,
    private aRouter: ActivatedRoute
  ) {
    this.productoForm = this.formBuilder.group({
      producto: ['', Validators.required],
      categoria: ['', Validators.required],
      ubicacion: ['', Validators.required],
      precio: ['', Validators.required]
    });
    this.id = aRouter.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.esEditar();
  }

  agregarProducto() {
    const producto: Producto = {
      nombre: this.productoForm.get('producto')?.value,
      categoria: this.productoForm.get('categoria')?.value,
      ubicacion: this.productoForm.get('ubicacion')?.value,
      precio: this.productoForm.get('precio')?.value
    }

    if (this.id !== null) {
      // editar producto
      this.productoService.editarProducto(this.id, producto).subscribe(
        data => {
          this.toastr.success('El producto se ha actualizado con éxito', 'Producto Actualizado!');
          this.router.navigate(['/']);
        },
        err => {
          console.log(err);
          this.productoForm.reset();
        }
      );
    }
    else {
      // crear producto
      this.productoService.guardarProducto(producto).subscribe(
        data => {
          this.toastr.success('El producto se ha registrado con éxito', 'Producto Registrado!');
          this.router.navigate(['/']);
        },
        err => {
          console.log(err);
          this.productoForm.reset();
        }
      );
    }
  }

  esEditar() {
    if (this.id !== null) {
      this.titulo = 'Editar producto';
      this.productoService.obtenerProducto(this.id).subscribe(
        data => {
          this.productoForm.setValue({
            producto: data.nombre,
            categoria: data.categoria,
            ubicacion: data.ubicacion,
            precio: data.precio
          })
        },
        err => console.log(err)
      );
    }
  }

}
