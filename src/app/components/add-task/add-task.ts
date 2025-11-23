import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UiService } from '../../services/ui';
import { Subscription } from 'rxjs';
import { Task } from '../../Task';


@Component({
  selector: 'app-add-task',
  standalone: false,
  templateUrl: './add-task.html',
  styleUrl: './add-task.css'
})
export class AddTask implements OnInit {

  text!: string;
  day!: string;
  reminder!: boolean;

  @Output()
  onAddTask = new EventEmitter();
  showAddTask!: boolean;
  subscription!: Subscription;

  constructor(private uiService: UiService) {

    this.subscription = this.uiService.onToggle().subscribe({
      next: (value: boolean) => { this.showAddTask = value },
      error: (err) => { console.error(err) },
      complete: () => { console.log('AddTask constructor') }
    })

  }
  ngOnInit(): void {
  }

  onSubmit() {
    if (!this.text) {
      alert('Please add a task!');
      return;
    }

    const newTask: Task = {
      text: this.text,
      day: this.day,
      reminder: this.reminder
    };

    this.onAddTask.emit(newTask);

    this.text = '';
    this.day = '';
    this.reminder = false;
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
