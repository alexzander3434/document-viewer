import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentNoteComponent } from './document-note.component';

describe('DocumentNoteComponent', () => {
  let component: DocumentNoteComponent;
  let fixture: ComponentFixture<DocumentNoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentNoteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
