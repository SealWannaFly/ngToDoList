import {Component, OnInit} from '@angular/core';
import {TransferService} from '../../../../common/entities/services/transfer.service';
import {Router} from '@angular/router';
import {HttpService, Task} from '../../../../common/entities/services/http.service';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.css'],
})
export class ToDoListComponent implements OnInit {
  priorities = ['all', 'done', 'canceled'];

  newTask: Task;
  tasks: Task[] = [];
  error = '';
  filterParams = {
    priority: [],
    result: 'all'
  };
  asc = false;

  constructor(private httpService: HttpService,
              private transferService: TransferService,
              private router: Router) {
    this.router.navigateByUrl('/add-form');
  }

  ngOnInit(): void {
    this.httpService.getTasks()
      .subscribe(tasks => {
        this.tasks = tasks;
      }, error => {
        this.error = 'Ошибка при загрузке';
      });

    this.transferService.isNew$.subscribe(isOpen => {
      if (isOpen){
        this.newTask = this.transferService.getTask();
        this.addTask();
      }}, error => {
      this.error = error.message;
    });
  }

  addTask(): void{
    if (this.newTask){
      this.newTask.creationDate = new Date();
      this.httpService.addTask(this.newTask)
        .subscribe(task => {
          this.tasks.push(task);
          this.newTask = undefined;
        }, error => {
          this.error = error.message;
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
      }, error => {
        this.error = error.message;
      });
  }


  deleteTask(id: number): void{
    this.httpService.deleteTask(id)
        .subscribe(() => {
        this.tasks = this.tasks.filter(task => task.id !== id);
      }, error => {
          this.error = error.message;
        });
  }

  // mat-checkbox returns Object
  onCheckboxChange(event): void {
    if (event.source.name === 'priority'){
      if (event.checked){
        this.filterParams.priority.push(event.source.value);
      }else{
        this.filterParams.priority = this.filterParams.priority.filter(param => param !== event.source.value);
      }
    }

    if (event.source.name === 'result'){
      if (event.checked){
        this.filterParams.result = event.source.value;
      }else{
        this.filterParams.priority = this.filterParams.priority.filter(param => param !== event.source.value);
      }
    }
  }

  filterTasks(): Task[]{
    return this.tasks.filter(task => ((task.result === this.filterParams.result || this.filterParams.result === 'all')
      && (this.filterParams.priority.includes(task.priority.toLowerCase()) || this.filterParams.priority.length === 0)));
  }
}
