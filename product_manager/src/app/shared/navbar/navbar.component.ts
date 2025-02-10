import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  standalone: true,
  imports: [
    CommonModule,
    ModalComponent
  ],
})

export class NavbarComponent {
  isModalOpen = false;
  products: any[] = [];
  apiUrl = 'http://localhost:3001/products-test';

  private http = inject(HttpClient);

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.http.get<any[]>(this.apiUrl).subscribe((data) => {
      this.products = data;
    });
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  saveProduct(product: any) {
    this.http.get<any[]>(this.apiUrl).subscribe((data) => {
      const lastId = data.length > 0 ? Math.max(...data.map(p => p.id)) : 0;
      const newProduct = {
        id: lastId + 1,
        name: product.name,
        price: product.price,
        category: product.category,
        description: product.description
      };

      if (newProduct.name && newProduct.price && newProduct.category && newProduct.description) {
        this.http.post(this.apiUrl, newProduct).subscribe(() => {
          this.loadProducts();
          this.closeModal();
        });
      } else {
        console.error("Produto inválido! Todos os campos devem estar preenchidos.");
      }
    });
  }
}
