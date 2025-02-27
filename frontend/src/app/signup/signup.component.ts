import { Component } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  email: string = '';
  password: string = '';

  onEmailChange(event: Event) {
    this.email = (event.target as HTMLInputElement).value;
  }

  onPasswordChange(event: Event) {
    this.password = (event.target as HTMLInputElement).value;
  }

  async onSignup(event: Event) {
    event.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:5000/api/v1/auth/signup', {
        email: this.email,
        password: this.password
      });
      localStorage.setItem('token', response.data.token);
      alert('Signup successful!');
    } catch (error) {
      console.error('Error:', error);
      alert('Signup failed!');
    }
  }
}
