import { NgFor } from '@angular/common';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [NgFor],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  products: any[] = [];
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
