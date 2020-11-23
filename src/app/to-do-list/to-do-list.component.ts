import { Component, OnInit } from '@angular/core';

export interface Task{
  id: number;
  text: string;
  priority: string;
  creationDate: Date;
  resultDate: Date;
  result: string;
}

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.css']
})
export class ToDoListComponent implements OnInit {

  tasks: Task[] = [{ id: 0,
    text: 'Тестовая Задача',
    priority: 'high',
    creationDate: new Date(),
    resultDate: null,
    result: ''}];

  constructor() { }

  ngOnInit(): void {
  }

}
