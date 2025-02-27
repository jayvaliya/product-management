import { Component } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  onEmailChange(event: Event) {
    this.email = (event.target as HTMLInputElement).value;
  }

  onPasswordChange(event: Event) {
    this.password = (event.target as HTMLInputElement).value;
  }

  async onLogin(event: Event) {
    event.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:5000/api/v1/auth/login', {
        email: this.email,
        password: this.password
      });
      localStorage.setItem('token', response.data.token);
      alert('Login successful!');
      window.location.href = '/';
    } catch (error) {
      console.error('Error:', error);
      alert('Login failed!');
    }
  }
}
