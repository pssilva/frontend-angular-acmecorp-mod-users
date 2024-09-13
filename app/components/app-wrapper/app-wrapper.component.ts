import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { AppHeaderComponent } from '../app-header/app-header.component'
import { AppSidebarComponent } from '../app-sidebar/app-sidebar.component'
import { AppMainComponent } from '../app-main/app-main.component'
import { AppFooterComponent } from '../app-footer/app-footer.component'

@Component({
  selector: 'app-wrapper-diretiva',
  standalone: true,
  imports: [RouterOutlet, AppHeaderComponent, AppSidebarComponent, AppMainComponent, AppFooterComponent],
  templateUrl: './app-wrapper.component.html',
  styleUrl: './app-wrapper.component.scss'
})
export class AppWrapperComponent {

}
