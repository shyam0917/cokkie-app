import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MainListPage } from './main-list.page';

describe('MainListPage', () => {
  let component: MainListPage;
  let fixture: ComponentFixture<MainListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MainListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
