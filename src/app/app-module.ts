import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppRoutingModule } from './app-routing-module';

import { App } from './app';
import { Header } from './components/header/header';
import { Button } from './components/button/button';
import { Tasks } from './components/tasks/tasks';
import { TaskItem } from './components/task-item/task-item';
import { AddTask } from './components/add-task/add-task';
import { RouterModule, Routes } from '@angular/router';
import { About } from './components/about/about';
import { Footer } from './components/footer/footer';
import { D3Graph } from './components/d3-graph/d3-graph';
import {GraphModelViewer} from './components/graph-model-viewer/graph-model-viewer';
import { GraphPage } from './components/graph-page/graph-page'
const appRoutes: Routes = [{
  path: '', component: Tasks,
},
{
  path: 'about', component: About,
},{
 path: 'test', component: D3Graph
},{
 path: 'graph', component: GraphPage
}
]
@NgModule({
  declarations: [
    App,
    Header,
    Button,
    Tasks,
    TaskItem,
    AddTask,
    About,
    Footer,
    D3Graph,
    GraphModelViewer,
    GraphPage
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    RouterModule.forRoot(appRoutes, { enableTracing: true })
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withInterceptorsFromDi())
  ],
  bootstrap: [App]
})
export class AppModule { }
