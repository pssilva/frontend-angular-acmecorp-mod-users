import { Component, Input, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Location, CommonModule } from '@angular/common';

import { TagHeadComponent } from '../../../shared/components/list-table/tag-head/tag-head.component'
import { Users } from '../../model/users';
import { FormUtilsService } from './../../../shared/form/form-utils.service';
import { UsersService } from '../../services/users.service';

import { FormGroup, 
  FormsModule, 
  NonNullableFormBuilder, 
  ReactiveFormsModule, 
  Validators} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { UsersRequestDTO } from '../../model/usersRequestDTO';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterOutlet,
    TagHeadComponent,
    ReactiveFormsModule, MatFormFieldModule, 
    MatInputModule, MatSelectModule, 
    MatOptionModule, MatButtonModule, MatIconModule,
     MatSelectModule, MatOptionModule, MatButtonModule, 
     MatIconModule, FormsModule, CommonModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class UsersResiterComponent  implements OnInit {
  title = "AcmeCorp | Registro de Usuário";

  form!: FormGroup;
  @Input() usersRequestDTO: UsersRequestDTO = {
    email: '',
    password: '',
    id: '',
    name: ''
  };
  
  @Input() user: Users = {
    _id: '',
    name: '',
    email: '',
    password:''
  };
  
  constructor(
    private service: UsersService,
    private formBuilder: NonNullableFormBuilder,
    private router: Router,
    private location: Location,
    public formUtils: FormUtilsService
  ) { }

  ngOnInit(): void {

    console.log("UsersResiterComponent::ngOnInit() this.user = ", this.user);
    //const user_snap = this.router.snapshot.data['user'];
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
  }

  onSubmit(formParam: FormGroup) {

    console.log("UsersResiterComponent::onSubmit() formParam = ", formParam);

    this.usersRequestDTO.email = formParam.value.email;
    this.usersRequestDTO.name = formParam.value.name;
    this.usersRequestDTO.password = formParam.value.pass_hash;

    if (formParam.value.email != '' && formParam.value.pass_hash != '' ) {
      this.service.resiter(this.usersRequestDTO)
        .subscribe({
          next: userCreated => {
              console.log("Resposta PUT :: AuthController::register ", JSON.parse(JSON.stringify(userCreated)) );
              this.router.navigate([`users/login`]);
          },
          error: error => {
              console.info('There was an error!', error);
          }
        }); 
    } else {
      this.formUtils.validateAllFormFields(formParam);
    }
  }

  onCancel() {
    this.location.back();
  }

}
