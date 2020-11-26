import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs';
import { Task } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class TransferService {
  private task: Task;

  public isNew$ = new BehaviorSubject(false);

  constructor(
    private router: Router
  ) { }

  setTask(task): void{
    this.task = task;
    this.isNew$.next(true);
  }

  getTask(): Task{
    const buf: Task = this.task;
    this.clearTask();
    this.isNew$.next(false);
    return buf;
  }

  clearTask(): void{
    this.task = undefined;
  }
}
