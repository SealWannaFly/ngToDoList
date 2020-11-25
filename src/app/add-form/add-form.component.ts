import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TransferService} from '../transfer.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.css']
})
export class AddFormComponent implements OnInit {
  form: FormGroup;

  constructor(
    private transferService: TransferService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      text: new FormControl('', Validators.required),
      priority: new FormControl('High', null)
    });
  }

  onSubmit(): void {
    this.transferService.setTask(this.form.value);
    this.router.navigateByUrl('/to-do-list');

    this.form.patchValue({
      text: '',
      priority: 'High'
    });
  }
}
