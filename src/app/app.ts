import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Random } from './components/random/random';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Random],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('angular-random-integers');
}
