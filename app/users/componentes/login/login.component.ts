import { Component, Input, OnInit } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { Location, CommonModule } from '@angular/common';

import { FormGroup, 
  FormsModule, 
  NonNullableFormBuilder, 
  ReactiveFormsModule, 
  Validators} from '@angular/forms';


import { TagHeadComponent } from '../../../shared/components/list-table/tag-head/tag-head.component'
import { FormUtilsService } from './../../../shared/form/form-utils.service';
import { UsersLoginService } from './../../services/users-login.service';
import { UsersLoginRequestDTO } from '../../model/usersLoginRequestDTO';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    TagHeadComponent,
    RouterOutlet,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class UsersLoginComponent implements OnInit {
  title = "AcmeCorp | Login";

  form!: FormGroup;
  @Input() usersLoginRequestDTO: UsersLoginRequestDTO = {
    email: '',
    password: ''
  };

  constructor(
    private service: UsersLoginService,
    private formBuilder: NonNullableFormBuilder,
    private location: Location,
    public formUtils: FormUtilsService,
    private router: Router,

  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(100)
      ]],
      email:  ["",
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20),
          Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
        ]
      ],
      pass_hash: ["",
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(40)
        ]
      ],
    });
    console.log("UsersLoginComponent::ngOnInit");
  }

  onSubmit(formParam: FormGroup) {
    this.usersLoginRequestDTO.email = formParam.value.email;
    this.usersLoginRequestDTO.password = formParam.value.pass_hash;

    if (formParam.value.email != '' && formParam.value.pass_hash != '' ) {
      this.service.login(this.usersLoginRequestDTO);
      this.router.navigate([`users/list`]);
    } else {
      this.formUtils.validateAllFormFields(formParam);
    }
  }

  onCancel() {
    this.location.back();
  }

}
