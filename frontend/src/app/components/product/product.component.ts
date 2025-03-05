import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import axios from 'axios';

interface Product {
  _id: string;
  name: string;
  description: string;
  quantity: number;
  price: number;
}

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  products: Product[] = [];
  isModalOpen: boolean = false;
  selectedProduct: Product = {
    _id: '',
    name: '',
    description: '',
    quantity: 0,
    price: 0
  };
  private apiUrl = 'http://127.0.0.1:5000/api/v1/product';

  @ViewChild('name') name?: ElementRef;
  @ViewChild('description') description?: ElementRef;
  @ViewChild('quantity') quantity?: ElementRef;
  @ViewChild('price') price?: ElementRef;

  constructor() { }

  ngOnInit() {
    this.loadProducts();
  }

  async loadProducts() {
    try {
      const response = await axios.get(this.apiUrl, {
        headers: { authorization: `${localStorage.getItem('token')}` },
      });
      this.products = response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }

  async addProduct() {
    if (!this.name || !this.description || !this.quantity || !this.price) return;

    const newProduct = {
      name: this.name.nativeElement.value.trim(),
      description: this.description.nativeElement.value.trim(),
      quantity: parseInt(this.quantity.nativeElement.value, 10) || 0,
      price: parseFloat(this.price.nativeElement.value) || 0,
    };

    if (!newProduct.name || !newProduct.price || !newProduct.quantity || !newProduct.description) {
      alert('Name, Price, Quantity, and Description are required');
      return;
    }

    try {
      await axios.post(this.apiUrl, newProduct, {
        headers: { Authorization: `${localStorage.getItem('token')}` },
      });
      this.loadProducts();
      this.clearForm();
    } catch (error) {
      console.error('Error adding product:', error);
    }
  }

  clearForm() {
    if (!this.name || !this.description || !this.quantity || !this.price) return;

    this.name.nativeElement.value = '';
    this.description.nativeElement.value = '';
    this.quantity.nativeElement.value = '';
    this.price.nativeElement.value = '';
  }

  async deleteProduct(id: string) {
    if (confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`${this.apiUrl}/${id}`, {
          headers: { Authorization: `${localStorage.getItem('token')}` },
        });
        this.loadProducts();
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  }

  openModal(product: Product) {
    this.selectedProduct = { ...product };
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  async updateProduct() {
    try {
      await axios.put(
        `${this.apiUrl}/${this.selectedProduct._id}`,
        {
          name: this.selectedProduct.name,
          description: this.selectedProduct.description,
          quantity: this.selectedProduct.quantity,
          price: this.selectedProduct.price,
        },
        {
          headers: { Authorization: `${localStorage.getItem('token')}` },
        }
      );
      this.closeModal();
      this.loadProducts();
    } catch (error) {
      console.error('Error updating product:', error);
    }
  }
}