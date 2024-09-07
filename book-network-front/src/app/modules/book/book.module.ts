import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BookRoutingModule } from './book-routing.module';
import { MenuComponent } from './components/menu/menu.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BookRoutingModule, RouterModule
  ]
})
export class BookModule { }
