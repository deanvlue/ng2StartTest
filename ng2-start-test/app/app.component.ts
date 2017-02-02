import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `

    <header> 
      <nav class="navbar navbar-inverse">
        <div class="navbar-header">
          <a href="/" class="navbar-brand"> My angular 2 App! </a>
        </div>
      </nav>
    </header>

    <div class="jumbotron">
      <h1>Welcome to our App</h1>
      <p>{{ message }}</p>
    </div>

    <div *ngFor="let user of users">
      {{user.name}}-{{user.username}}
    </div>

    <footer class="text-center">
      Copyright &copy; 2017
    </footer>
  `,
  styles:[`
    .jumbotron {box-shadow: 0 2px 0 rgba(0,0,0,0.2);}
  `]
})

export class AppComponent{
  message = "Hello!";
  users=[
    {
      id: 25,
      name: 'Chris',
      username: 'devil003'
    },
    {
      id: 26,
      name: 'Tommy',
      username: 'tckalous'
    },
    {
      id: 27,
      name: 'Rom',
      username: 'fruitypebbles'
    },
    {
      id: 28,
      name: 'Jay',
      username: 'jmytwt'
    }
  ];
}