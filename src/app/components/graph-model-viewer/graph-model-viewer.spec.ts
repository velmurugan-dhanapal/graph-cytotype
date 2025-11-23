import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphModelViewer } from './graph-model-viewer';

describe('GraphModelViewer', () => {
  let component: GraphModelViewer;
  let fixture: ComponentFixture<GraphModelViewer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GraphModelViewer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraphModelViewer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
