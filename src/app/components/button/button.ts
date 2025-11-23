import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: false,
  templateUrl: './button.html',
  styleUrl: './button.css'
})
export class Button implements OnInit {
  @Input()
  text!: string;
  @Input()
  color!: string;
  @Output()
  btnClick = new EventEmitter()
  constructor() { }
  ngOnInit(): void {
  }
  onClick() {
    console.log('onClick')
    this.btnClick.emit();
  }
}
