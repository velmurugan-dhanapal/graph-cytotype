import { Component, OnInit } from '@angular/core';
import { Task as Task } from '../../Task'
import { TASKS } from '../../mock-tasks'
import { TaskService } from '../../services/task';
@Component({
  selector: 'app-tasks',
  standalone: false,
  templateUrl: './tasks.html',
  styleUrl: './tasks.css'
})
export class Tasks implements OnInit {
  tasks: Task[] = TASKS;
  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.taskService.getTask().subscribe(
      {
        next: (tasks: Task[]) => { return this.tasks = tasks },
        error: (err) => { console.error('There is as error in getTask' + err) },
        complete: () => { console.log('getTask complete method called') }
      }
    )
  }

  deleteTask(task: Task) {
    this.taskService.deleteTask(task).subscribe(
      {
        next: (task: Task) => {
          this.tasks = this.tasks.filter(
            (t) => t.id !== task.id
          )
        },
        error: (err) => { console.error(err) },
        complete: () => { console.log('This is on Complete method') }
      }
    )
  }

  toggleTask(task: Task) {
    task.reminder = !task.reminder;
    this.taskService.updateToggleTask(task).subscribe({
      next: (task) => {
        console.log(task.id)
      }
    })
  }

  addTask(task: Task) {
    this.taskService.addTask(task).subscribe({
      next: (task: Task) => {
        this.tasks.push(task)
      },
      error: (err) => { console.error(err) },
      complete: () => { console.log('Saved Sucessfully for the task '+ task.id)}
    })
  }
  
}
