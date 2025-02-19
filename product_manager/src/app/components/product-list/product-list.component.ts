// Imports
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ModalComponent } from '../../shared/modal/modal.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ModalComponent
  ],
})

export class ProductListComponent {
  Math = Math;

  isModalOpen = false;
  isModalProductOpen = false;
  isSuccessModalOpen = false;

  products: any[] = [];
  filteredProducts: any[] = [];
  paginatedProducts: any[] = [];
  categories: string[] = ["Geladeira", "Maquina de Lavar", "Fogão", "Micro-ondas", "Forno", "Portáteis"];

  currentPage = 1;
  itemsPerPage = 8;
  totalItems = 0;
  searchTerm: string = '';
  selectedCategory: string | null = null;
  selectedProduct: any = null;

  apiUrl = 'http://localhost:3001/products-test';

  private http = inject(HttpClient);

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.http.get<any[]>(this.apiUrl).subscribe({
      next: (data) => {
        this.products = data;
        this.applyFilter();
      },
      error: (err) => {
        console.error('Erro ao buscar produtos:', err);
      }
    });
  }

  toggleCategory(category: string) {
    if (this.selectedCategory === category) {
      this.selectedCategory = null;
    } else {
      this.selectedCategory = category;
    }
    this.applyFilter();
  }


  resetCategoryFilter() {
    this.selectedCategory = null;
    this.applyFilter();
  }

  // Fltro aprimorado para escrita e por categoria
  applyFilter() {
    console.log('Buscando por:', this.searchTerm, 'Categoria:', this.selectedCategory);

    const search = (this.searchTerm || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

    this.filteredProducts = this.products.filter(product => {
      const productName = (product.name || '')
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');

      const productCategory = (product.category || '')
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');

      const matchesSearch = productName.includes(search);
      const matchesCategory = this.selectedCategory
        ? productCategory === this.selectedCategory
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
        : true;

      return matchesSearch && matchesCategory;
    });

    this.totalItems = this.filteredProducts.length;
    this.updatePagination();
  }




  updatePagination() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedProducts = this.filteredProducts.slice(startIndex, endIndex);
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.updatePagination();
  }

  nextPage() {
    if (this.currentPage < Math.ceil(this.totalItems / this.itemsPerPage)) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  openProductModal(product: any) {
    this.selectedProduct = product;
    this.isModalProductOpen = true;
  }

  closeProductModal() {
    this.isModalProductOpen = false;
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }



  saveProduct(product: any) {
    // Validação: impede envio de produto vazio
    if (!product.name || !product.price || !product.category || !product.description) {
      console.warn("Preencha todos os campos antes de salvar o produto.");
      return;
    }

    const newProduct = {
      name: product.name,
      price: product.price,
      category: product.category,
      description: product.description
    };

    console.log("Enviando produto:", newProduct);

    this.http.post(this.apiUrl, newProduct).subscribe({
      next: (response) => {
        console.log("Produto salvo com sucesso:", response);
        this.loadProducts();
        this.closeModal();
        this.openSuccessModal();
      },
      error: (err) => {
        console.error("Erro ao salvar produto:", err);
      }
    });
  }


  openSuccessModal() {
    this.isSuccessModalOpen = true;
    setTimeout(() => {
      this.closeSuccessModal();
    }, 3000);
  }

  closeSuccessModal() {
    this.isSuccessModalOpen = false;
  }

}
