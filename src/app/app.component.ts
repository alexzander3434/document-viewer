import { TuiButton, TuiRoot } from '@taiga-ui/core';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TuiAppBar, TuiNavigation } from '@taiga-ui/layout';
import { TuiInputNumber } from '@taiga-ui/kit';
import { TuiTextfield } from '@taiga-ui/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    FormsModule,
    TuiRoot,
    TuiAppBar,
    TuiButton,
    TuiNavigation,
    TuiInputNumber,
    TuiTextfield,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'document-viewer';
}
