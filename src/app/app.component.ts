import { TuiButton, TuiRoot } from "@taiga-ui/core";
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Provider,
} from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { TuiAppBar, TuiNavigation } from "@taiga-ui/layout";
import { DocumentService, ZoomControlComponent } from "./components";
import { HeaderService } from "../services";

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
  private readonly headerService = inject(HeaderService);

  title = "document-viewer";

  save() {
    this.headerService.saveTrigger$.next();
  }
}
