import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { BehaviorSubject } from 'rxjs';
import { HomePage } from './home.page';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';


describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let de: DebugElement;

  const FirestoreStub = {
    collection: (name: string) => ({
      doc: (_id: string) => ({
        valueChanges: () => new BehaviorSubject({ foo: 'bar' }),
        set: (_d: any) => new Promise((resolve, _reject) => resolve()),
      }),
      snapshotChanges: () => ({ subscribe: () => { } })
    }),
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HomePage
      ],
      imports: [
        IonicModule.forRoot(),
        FormsModule
      ],
      providers: [
        { provide: AngularFirestore, useValue: FirestoreStub },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    de = fixture.debugElement.query(By.css('.big-circle'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have big circle', () => {
    fixture.detectChanges();
    const circle = de.nativeElement;
    expect(circle).toBeTruthy();
  });

  it('should have "TODO" title', () => {
    fixture.detectChanges();
    const todo: HTMLImageElement = fixture.debugElement.query(By.css('.todo-text')).nativeElement;
    expect(todo.innerText).toContain('TODO');
  });

  it('should show have add button', () => {
    fixture.detectChanges();
    const addBtn: HTMLImageElement = fixture.debugElement.query(By.css('ion-fab-button')).nativeElement;
    expect(addBtn).toBeTruthy();
  });
});
