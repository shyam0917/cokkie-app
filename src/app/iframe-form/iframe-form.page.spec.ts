import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { IframeFormPage } from './iframe-form.page';

describe('IframeFormPage', () => {
  let component: IframeFormPage;
  let fixture: ComponentFixture<IframeFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IframeFormPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IframeFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
