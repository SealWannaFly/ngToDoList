import { Component, OnInit } from '@angular/core';
import {HttpService, Task} from '../../../../common/entities/services/http.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.css']
})
export class EditFormComponent implements OnInit {
  priorities = ['Low', 'Medium', 'High'];

  message = 'Загрузка...';
  editForm: FormGroup;

  task: Task;

  constructor(
    private httpService: HttpService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.editForm = new FormGroup({
      text: new FormControl('', Validators.required),
      priority: new FormControl('High', null)
    });

    this.route.params.subscribe((params: Params) => {
      this.httpService.getTaskById(+params.id).subscribe(task => {
        if (task){
          this.task = task;
          this.editForm.patchValue({
            text: this.task.text,
            priority: this.task.priority
          });
        } else {
          this.message = 'Время соединения вышло! Через 5 секунд вы вернетесь назад';
          setTimeout (() => {
            this.router.navigateByUrl('/');
          }, 5000);
        }
      });
    });
  }

  onSubmit(): void {
    this.task.text = this.editForm.value.text;
    this.httpService.updateTask(this.task.id, this.task.text, this.task.priority).subscribe(task => {
      this.router.navigateByUrl('/');
    });
  }
}
