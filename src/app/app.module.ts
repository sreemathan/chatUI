import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NbThemeModule, NbLayoutModule, NbChatModule } from '@nebular/theme';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { DataServiceService } from './data-service.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
	HttpClientModule,
	BrowserAnimationsModule,
	NbThemeModule.forRoot({ name: 'default' }),
	NbChatModule,
	NbLayoutModule,
	NbEvaIconsModule,
	
  ],
  providers: [DataServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
