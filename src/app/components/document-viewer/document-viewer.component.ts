import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-document-viewer',
  imports: [],
  templateUrl: './document-viewer.component.html',
  styleUrl: './document-viewer.component.scss',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class DocumentViewerComponent {

}
