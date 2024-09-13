import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppHeaderComponent } from '../app/components/app-header/app-header.component'
import { AppSidebarComponent } from '../app/components/app-sidebar/app-sidebar.component'
import { AppMainComponent } from '../app/components/app-main/app-main.component'
import { AppFooterComponent } from '../app/components/app-footer/app-footer.component'

import { AppWrapperComponent } from '../app/components/app-wrapper/app-wrapper.component'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, 
    AppWrapperComponent, 
    AppHeaderComponent, 
    AppSidebarComponent,
    AppMainComponent,
    AppFooterComponent,
    HttpClientModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'AcmeCorp | Dashboard';
}
