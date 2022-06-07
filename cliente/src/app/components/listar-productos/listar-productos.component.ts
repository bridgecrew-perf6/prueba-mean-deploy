import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-listar-productos',
  templateUrl: './listar-productos.component.html',
  styleUrls: ['./listar-productos.component.css']
})
export class ListarProductosComponent implements OnInit {

  listaProductos: Producto[] = [];

  constructor(
    private productoService: ProductoService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.obtenerProductos();
  }

  obtenerProductos() {
    this.productoService.getProductos().subscribe(
      data => {
        console.log(data)
        this.listaProductos = data;
      },
      err => console.log(err)
    );
  }

  eliminarProducto(id: any) {
    this.productoService.eliminarProducto(id).subscribe(
      data => {
        this.toastr.error('El producto se ha eliminado con éxito', 'Producto eliminado');
        this.obtenerProductos();
      },
      err => console.log(err)
    );
  }

}
