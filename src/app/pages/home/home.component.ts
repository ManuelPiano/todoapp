import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Task} from '../../models/task.model';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
@Component({
  selector: 'app-home',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
tasks = signal<Task[]>([
  {
    id: Date.now(),
    title: "Crear Proyecto",
    completed: false
  },
  {
    id: Date.now(),
    title: "Crear Componentes",
    completed: false
  },
  {
    id: Date.now(),
    title: "Crear Servicios",
    completed: false
  },
  ]);

  newTaskCtrl = new FormControl('' , {
    nonNullable: true,
    validators: [
      Validators.required,
    ]
  });

  changeHandler() {
    if(this.newTaskCtrl.valid) {
      const value = this.newTaskCtrl.value.trim();
      if(value !== '') {
      this.addTask(value);
      this.newTaskCtrl.setValue('');  
      }
    }
  }

  addTask(title: string) {
    const newTask: Task = {
      id: Date.now(),
      title,
      completed: false
    };
    this.tasks.update(tasks => [...tasks, newTask]);
  }

  deleteTask(index: number) {
    this.tasks.update(tasks => tasks.filter((_, i) => i !== index));
  }

  updateTask(index: number) {
    
    this.tasks.update(tasks => tasks.map((task, i) => {
      if (i === index) {
        return {
          ...task,
          completed: !task.completed
        };
      }
      return task;
    }));

    }
}
