import { Component, computed, effect, Injector, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../models/task.model';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
@Component({
  selector: 'app-home',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  tasks = signal<Task[]>([]);

  newTaskCtrl = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required],
  });
  injector = inject(Injector);


  trackTask() {
    effect(() => {
      const task = this.tasks();
      console.log(task);
      localStorage.setItem('tasks', JSON.stringify(task));
    }, { injector: this.injector });
  }
 ngOnInit() {
  const storage = localStorage.getItem('tasks');
  if (storage) {
    const tasks = JSON.parse(storage);
    this.tasks.set(tasks);
  }
  this.trackTask();
 }
  filter = signal<'all' | 'pending' | 'completed'>('all');
  tasksFiltered = computed(() => {
    const filter = this.filter();
    const tasks = this.tasks();
    if (filter === 'pending') {
      return tasks.filter((task) => !task.completed);
    }
    if (filter === 'completed') {
      return tasks.filter((task) => task.completed);
    }
    return tasks;
  });

  changeHandler() {
    if (this.newTaskCtrl.valid) {
      const value = this.newTaskCtrl.value.trim();
      if (value !== '') {
        this.addTask(value);
        this.newTaskCtrl.setValue('');
      }
    }
  }

  addTask(title: string) {
    const newTask: Task = {
      id: Date.now(),
      title,
      completed: false,
    };
    this.tasks.update((tasks) => [...tasks, newTask]);
  }

  deleteTask(index: number) {
    this.tasks.update((tasks) => tasks.filter((_, i) => i !== index));
  }

  updateTask(index: number) {
    this.tasks.update((tasks) =>
      tasks.map((task, i) => {
        if (i === index) {
          return {
            ...task,
            completed: !task.completed,
          };
        }
        return task;
      })
    );
  }
  updateTaskEditingMode(index: number) {
    this.tasks.update((prevState) => {
      return prevState.map((task, i) => {
        if (i === index) {
          return {
            ...task,
            editing: !task.editing,
          };
        }
        return {
          ...task,
          editing: false,
        };
      });
    });
  }

  updateTaskText(index: number, event: Event) {
    const input = event.target as HTMLInputElement;
    this.tasks.update((prevState) => {
      return prevState.map((task, i) => {
        if (i === index) {
          return {
            ...task,
            title: input.value,
            editing: false,
          };
        }
        return task;
      });
    });
  }

  changeFilter(filter: 'all' | 'pending' | 'completed') {
    this.filter.set(filter);
  }
}
