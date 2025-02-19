import { Component, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-labs',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.css'
})
export class LabsComponent {
  welcome = 'Hola!';
  tasks = signal([
    'Instalar Angular CLI',
    'Crear nuevo proyecto',
    'Crear componentes',  
  ]);
  name = signal('Manuel');
  age = 34;
  disabled = true;
  img = 'https://angular.io/assets/images/logos/angular/angular.png';

  person = signal({
    name: 'Manuel',
    age: 34,
    avatar: 'https://angular.io/assets/images/logos/angular/angular.png'
  })

  clickHandler() {
    alert('Hola, ' + this.person.name);
  }

  changeHandler(event: Event) {
    const input = event.target as HTMLInputElement; 
    const newValue = input.value;
    this.name.set(newValue);
  }

  keyHandler(event: Event) {
    const input = event.target as HTMLInputElement; 
    this.name.set(input.value);
  }

  colorCtrl = new FormControl();
  widthCtrl = new FormControl(50, {
    nonNullable: true,
  });


  constructor() {
    this.colorCtrl.valueChanges.subscribe(value => {
      console.log(value);
    });
  }
}
