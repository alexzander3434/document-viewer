import { TuiButton, TuiRoot } from "@taiga-ui/core";
import { ChangeDetectionStrategy, Component, Provider } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { TuiAppBar, TuiNavigation } from "@taiga-ui/layout";
import { ZoomControlComponent } from "./components";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [
    RouterOutlet,
    TuiRoot,
    TuiAppBar,
    TuiButton,
    TuiNavigation,
    ZoomControlComponent,
  ],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = "document-viewer";
}
