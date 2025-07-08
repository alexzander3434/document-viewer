import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { TuiInputNumber } from "@taiga-ui/kit";
import { TuiTextfield } from "@taiga-ui/core";
import { ZoomControlService } from "./services";
import { ReactiveFormsModule } from "@angular/forms";
import { AsyncPipe } from "@angular/common";

@Component({
  selector: "zoom-control",
  imports: [ReactiveFormsModule, TuiInputNumber, TuiTextfield, AsyncPipe],
  templateUrl: "./zoom-control.component.html",
  styleUrl: "./zoom-control.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ZoomControlComponent {
  private readonly zoomService = inject(ZoomControlService);

  readonly control = this.zoomService.zoomControl;

  readonly maximum$ = this.zoomService.defaultMaximumZoomAmount$;

  readonly minimum$ = this.zoomService.defaulMinimumZoomAmount$;

  readonly step$ = this.zoomService.defaulZoomStep$;
}
