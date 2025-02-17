import { Component, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-labs',
  imports: [CommonModule],
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.css'
})
export class LabsComponent {
  welcome = 'Hola!';
  tasks = [
    'Instalar Angular CLI',
    'Crear nuevo proyecto',
    'Crear componentes',  
  ];
  name = signal('Manuel');
  age = 34;
  disabled = true;
  img = 'https://angular.io/assets/images/logos/angular/angular.png';

  person = {
    name: 'Manuel',
    age: 34,
    avatar: 'https://angular.io/assets/images/logos/angular/angular.png'
  }

  clickHandler() {
    alert('Hola, ' + this.person.name);
  }

  changeHandler(event: Event) {
    const input = event.target as HTMLInputElement; 
    const newValue = input.value;
    this.name.set(newValue);
  }

  keyHandler(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement; 
    console.log(input.value);
  }
}
