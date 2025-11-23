import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Task } from '../../Task';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-task-item',
  standalone: false,
  templateUrl: './task-item.html',
  styleUrl: './task-item.css'
})
export class TaskItem implements OnInit {

  @Input()
  task!: Task;
  @Output()
  onDeleteTask:EventEmitter<Task> = new EventEmitter()
  @Output()
  onToggleReminder:EventEmitter<Task> = new EventEmitter()
  faTimes = faTimes;
  constructor() { }
  ngOnInit(): void {
  }
  onDelete(task:Task) {
    this.onDeleteTask.emit(task);
  }
  toggleTask(task: Task) {
    this.onToggleReminder.emit(task);
  }
}
