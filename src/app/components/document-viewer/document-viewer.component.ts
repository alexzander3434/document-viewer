import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import {
  BehaviorSubject,
  map,
  Observable,
  of,
  shareReplay,
  startWith,
  switchMap,
} from "rxjs";
import { DocumentService, IDocument } from "./services";
import { CommonModule } from "@angular/common";
import { ZoomControlService } from "../zoom-control";
import { TuiDataList, TuiDropdown, TuiIcon } from "@taiga-ui/core";
import { TuiDataListDropdownManager } from "@taiga-ui/kit";
import { TuiActiveZone } from "@taiga-ui/cdk/directives/active-zone";

@Component({
  selector: "document-viewer",
  imports: [
    CommonModule,
    TuiDropdown,
    TuiDataList,
    TuiDataListDropdownManager,
    TuiIcon,
    TuiActiveZone,
  ],
  templateUrl: "./document-viewer.component.html",
  styleUrl: "./document-viewer.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentViewerComponent {
  private readonly route = inject(ActivatedRoute);

  private readonly zoomService = inject(ZoomControlService);

  private readonly documentService = inject(DocumentService);

  private readonly defaultWidth = 794;

  readonly contextOpen = false;

  readonly documentZoomedWidth$: Observable<string> =
    this.zoomService.zoomAmount$.pipe(
      map((zoomAmount) => {
        return (this.defaultWidth / 100) * (zoomAmount || 0) + "px";
      }),
      startWith(this.defaultWidth + "px")
    );

  readonly documentData$: Observable<IDocument | null> =
    this.route.paramMap.pipe(
      map((params) => params?.get("id") || null),
      switchMap((id) =>
        id ? this.documentService.getDocumentDataById(id) : of(null)
      ),
      startWith(null),
      shareReplay({ refCount: true, bufferSize: 1 })
    );

  readonly loading$ = this.documentData$.pipe(map((data) => !!data));

  ngOnInit(): void {}

  addNote(event: MouseEvent): void {
    console.log("event", event);
  }

  onActiveZone($event: boolean): void {
    console.log("$event", $event);
  }
}
