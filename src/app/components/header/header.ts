import { Component, OnInit } from '@angular/core';
import { UiService } from '../../services/ui';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header implements OnInit {
  showAddTask!: boolean;
  subscription!: Subscription;
  protected title: string = 'Task Tracker';

  constructor(private uiService: UiService,private router:Router) {

    this.uiService.onToggle().subscribe({
      next: (value: boolean) => { this.showAddTask = value },
      error: (err) => { console.error(err) },
      complete: () => { console.log('header constructor') }
    })
  }
  ngOnInit(): void {
  }

  toggleAddTask() {
    this.uiService.toggleAddTask()
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  hasRoute(route:string){
    return this.router.url === route;
  }
}
