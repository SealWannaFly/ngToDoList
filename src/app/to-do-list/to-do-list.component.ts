import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TransferService} from '../transfer.service';
import {Router} from '@angular/router';
import {HttpService, Task} from '../http.service';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.css'],
})
export class ToDoListComponent implements OnInit {
  newTask: Task;

  tasks: Task[] = [];

  constructor(private httpService: HttpService,
              private transferService: TransferService,
              private router: Router) {
    this.router.navigateByUrl('/add-form');
  }

  ngOnInit(): void {
    this.httpService.getTasks()
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
      this.newTask.creationDate = new Date();
      this.httpService.addTask(this.newTask)
        .subscribe(task => {
          this.tasks.push(task);
          this.newTask = undefined;
        });
    }
  }

  setResult(id: number, result: string): void {
    const task: Task = this.tasks.filter(t => t.id === id)[0];
    let resultDate: Date = new Date();

    if (task.result === result){
      result = '';
      resultDate = null;
    }

    this.httpService.setResult(id, result, resultDate)
      .subscribe(t => {
        task.result = t.result;
        task.resultDate = t.resultDate;
      });
  }


  deleteTask(id: number): void{
    this.httpService.deleteTask(id)
      .subscribe(() => {
        this.tasks = this.tasks.filter(task => task.id !== id);
      });
  }
}
