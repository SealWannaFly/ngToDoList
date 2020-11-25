import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TransferService} from '../transfer.service';
import {Router} from '@angular/router';

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
  styleUrls: ['./to-do-list.component.css'],
})
export class ToDoListComponent implements OnInit {
  newTask: Task;

  tasks: Task[] = [{ id: 0,
    text: 'Тестовая Задача',
    priority: 'high',
    creationDate: new Date(),
    resultDate: null,
    result: ''}];

  constructor(private http: HttpClient,
              private transferService: TransferService,
              private router: Router) {
    this.router.navigateByUrl('/add-form');
  }

  ngOnInit(): void {
    this.http.get<Task[]>('http://127.0.0.1:3000/items')
      .subscribe(tasks => {
        this.tasks = tasks;
      });

    this.transferService.isNew$.subscribe(isOpen => {
      if (isOpen){
        this.newTask = this.transferService.getTask();
        this.addTask();
      }});
  }

  addTask(): void{
    if (this.newTask){
      this.http.post<Task>('http://127.0.0.1:3000/items', this.newTask).subscribe(task => {
        this.tasks.push(task);
        this.newTask = undefined;
      });
    }
  }
}
