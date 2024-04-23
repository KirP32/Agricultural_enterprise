import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MyComponentComponent } from "./my-component/my-component.component";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { faVk, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';
@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, MyComponentComponent, RouterModule, FontAwesomeModule]
})
export class AppComponent {
  title = 'kursach';
  iconVK = faVk;
  insta = faInstagram;
  yotube = faYoutube;
}
