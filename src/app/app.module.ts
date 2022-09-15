import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AuthModule, AuthHttpInterceptor } from '@auth0/auth0-angular';
import { AgGridModule } from 'ag-grid-angular';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MenuModule } from './menu/menu.module';
import { ModuloExperimentosModule } from './modulo-experimentos/modulo-experimentos.module'

import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MenuModule,
    AuthModule.forRoot({
      domain: environment.CLIENT_DOMAIN,
      clientId: environment.CLIENT_ID,

      audience: environment.AUDIENCE,

      // Request this scope at user authentication time
      scope: 'read:current_user',

      // Specify configuration for the interceptor              
      httpInterceptor: {
        allowedList: [
          {
            // Match any request that starts 'https://jackercito-dev.eu.auth0.com/api/v2/' (note the asterisk)
            uri: environment.URI,
            tokenOptions: {
              // The attached token should target this audience
              audience: environment.AUDIENCE,

              // The attached token should have these scopes
              scope: 'read:current_user'
            }
          }
        ]
      }
    }),
    ModuloExperimentosModule,
    AgGridModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
