import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { JwtInterceptor, ErrorInterceptor } from './helpers';
import { AppComponent } from './app.component';
import { AlertComponent } from './components';
import { HomeComponent } from './pages/home';
import { ClubComponent } from './components/club/club.component';
import { ClubListComponent } from './components/club-list/club-list.component';

@NgModule({
    declarations: [AppComponent, AlertComponent, HomeComponent, ClubComponent, ClubListComponent],
    imports: [BrowserModule, AppRoutingModule, HttpClientModule],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
