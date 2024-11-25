import {Component, OnInit, provideZoneChangeDetection} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule, Validators} from "@angular/forms";
import {MatButton, MatIconButton} from "@angular/material/button";
import {
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow, MatRowDef, MatTable
} from "@angular/material/table";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {DateAdapter, MatNativeDateModule, MatOption} from "@angular/material/core";
import {MatSelect} from "@angular/material/select";
import {NgForOf} from "@angular/common";
import {SideBarComponent} from "../side-bar/side-bar.component";
import {SharedModules} from '../modules';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from '@angular/material/datepicker';
import {MatCheckbox} from '@angular/material/checkbox';
import {ToastService} from 'angular-toastify';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-add-item',
  standalone: true,
  imports: [
    SharedModules,
    SideBarComponent,
    MatDatepicker,

    MatNativeDateModule,
  ],
  providers:[ToastService],
  templateUrl: './add-item.component.html',
  styleUrl: './add-item.component.css'
})
export class AddItemComponent implements OnInit {
  mode?: string ;
  inventoryForm: FormGroup;
  itemTypes = ['TV', 'Fridge', 'Washing Machine', 'Laptop'];
  brands = ['Samsung', 'LG', 'Innovex', 'Sony'];

  constructor(private route: ActivatedRoute,private fb: FormBuilder,private router: Router,private http: HttpClient,private _toastService: ToastService) {
    this.inventoryForm = this.fb.group({
      itemType: ['', Validators.required],
      itemName: ['', [Validators.required, Validators.maxLength(50)]],
      itemBrand: ['', Validators.required],
      itemDescription: ['', [Validators.maxLength(200)]],
      itemPrice: ['', [Validators.required, Validators.min(0)]],
      itemExpireDate: [{ value: '', disabled: false }],
      notApplicable: [false],
      id:0
    });

    this.inventoryForm.get('notApplicable')?.valueChanges.subscribe((isNotApplicable) => {
      if (isNotApplicable) {
        this.inventoryForm.get('itemExpireDate')?.disable();
        this.inventoryForm.get('itemExpireDate')?.reset();
        this.inventoryForm.get('itemExpireDate')?.setValue(null)
      } else {
        this.inventoryForm.get('itemExpireDate')?.enable();
      }
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      let temp_mode:string = params['mode']
      if (temp_mode=='Add') {
        this.mode = 'Add';
        this.inventoryForm.reset()

      }else if(temp_mode=='edit') {
        this.mode = 'Edit';
        this.inventoryForm.get('itemName')?.setValue(params['name']);
        this.inventoryForm.get('itemBrand')?.setValue(params['brand']);
        this.inventoryForm.get('itemPrice')?.setValue(params['price']);
        this.inventoryForm.get('itemType')?.setValue(params['type']);
        this.inventoryForm.get('itemDescription')?.setValue(params['description']);
        this.inventoryForm.get('id')?.setValue(params['id']);

        if (params['expire']) {
          this.inventoryForm.get('expireDate')?.setValue(params['expire']);
        }
      }

    });
  }
  save() {
    if (this.inventoryForm.valid) {
      console.log('Form Data:', this.inventoryForm.value);

      if (this.mode=='Add') {
        this.http.post("http://localhost:8080/inventory_service/inventories", this.inventoryForm.value,{withCredentials:true}).subscribe(
          {
            next: result => {
              console.log(result);
              this._toastService.success('Inventory Item Saved Successfully!');
              this.router.navigate(['/dashboard']);

            },
            error: (error:{error?:{error?:string}}) => {
              console.log(error?.error?.error);
              this._toastService.error(<string>error?.error?.error);
            }

          }
        )

      }else if(this.mode=='Edit') {
        this.http.put("http://localhost:8080/inventory_service/inventories", this.inventoryForm.value,{withCredentials:true}).subscribe(
          {
            next: result => {
              console.log(result);
              this._toastService.success('Inventory Item Saved Successfully!');
              this.router.navigate(['/dashboard']).then(result => {this._toastService.success('Inventory Item Saved Successfully!');});

            },
            error: (error:{error?:{error?:string}}) => {
              console.log(error?.error?.error);
              this._toastService.error(<string>error?.error?.error);
            }

          }
        )
      }
    } else {
      console.log('Form Invalid');
    }
  }

  clear() {
    this.inventoryForm.reset();
  }

  cancel() {
    this.router.navigate(['/dashboard']);
    console.log('Cancelled');
  }
}
