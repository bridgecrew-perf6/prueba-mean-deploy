import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  url_api = 'http://localhost:4000/api/productos/';

  constructor(
    private http: HttpClient
  ) { }

  getProductos(): Observable<any> {
    return this.http.get(this.url_api);
  }

  eliminarProducto(id: string): Observable<any> {
    return this.http.delete(this.url_api + id);
  }

  guardarProducto(producto: Producto): Observable<any> {
    return this.http.post(this.url_api, producto);
  }

  obtenerProducto(id: string): Observable<any> {
    return this.http.get(this.url_api + id);
  }

  editarProducto(id: string, producto: Producto): Observable<any> {
    return this.http.put(this.url_api + id, producto);
  }

}
