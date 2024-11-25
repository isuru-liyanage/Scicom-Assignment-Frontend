import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {SharedModules} from '../modules';
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef,
  MatRow, MatRowDef,
  MatTable
} from '@angular/material/table';
import {MatOption} from '@angular/material/core';
import {MatSelect} from '@angular/material/select';
import {MatIcon} from '@angular/material/icon';
import {SideBarComponent} from '../side-bar/side-bar.component';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {ToastService} from 'angular-toastify';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  providers:[ToastService],
  imports: [SharedModules, SideBarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  items: Page = {content: [],last: true,};
  page = 0;
  ngOnInit(): void {
    this.page=0
    console.log('Dashboard Component Loaded');
    this.loadData()
  }
  loadData(): void {
    this.http.get<Page>("http://localhost:8080/inventory_service/inventories?page="+this.page,{withCredentials:true}).subscribe(
      {
        next: result => {
          console.log(result);
          this.items=result;
        },
        error: (error:{error?:{error?:string,status:number}}) => {
          console.log(error);
          this._toastService.error(<string>error?.error?.error);

        }

      }
    )
  }

  constructor(private router: Router,private http: HttpClient,private _toastService: ToastService) {
  }

  itemName: string = '';
  itemType: string = '';
  selectedBrands: string[] = [];

  // Dropdown options
  itemTypes = ['TV', 'Fridge', 'Washing Machine', 'Laptop'];
  brands = ['Samsung', 'LG', 'Innovex', 'Sony'];

  // Sample data for the table


  // Handle search button click
  onSearch() {
    let req={
      "itemName": this.itemName,
      "itemType": this.itemType,
      "brands": this.selectedBrands
    }
    console.log(req);
    this.http.post<Item[]>("http://localhost:8080/inventory_service/inventories/search",req,{withCredentials:true}).subscribe(
      {
        next: result => {
          console.log(result);
          this.items={content:result,last:true};
        },
        error: (error:{error?:{error?:string}}) => {
          console.log(error);
          this._toastService.error(<string>error?.error?.error);
        }

      }
    )


  }

  // Edit and Delete actions
  onEdit(row: Item) {
    console.log('Edit:', row);
    this.router.navigate(['/add_item'],{ queryParams: { mode:"edit",id:row.id,name: row.itemName, type: row.itemType,brand:row.itemBrand,expire:row.itemExpireDate,description:row.itemDescription,price:row.itemPrice } });

  }

  // onDelete(row: Item) {
  //   console.log('Delete:', row);
  //
  // }

  onClear() {
    this.itemName = '';
    this.itemType = '';
    this.selectedBrands = [];
    this.loadData()
  }

  loadmore() {
    this.page+=1
    this.loadData();

  }
  readonly dialog = inject(MatDialog);
  openDialog(enterAnimationDuration: string, exitAnimationDuration: string,row:Item) {
    this.dialog
    this.dialog.open(DialogAnimationsExampleDialog, {
      data: row,
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}

@Component({
  selector: 'dialog-animations-example-dialog',
  templateUrl: 'confirm.html',
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
  providers:[ToastService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class DialogAnimationsExampleDialog {
  readonly dialogRef = inject(MatDialogRef<DialogAnimationsExampleDialog>);
  readonly data = inject<Item>(MAT_DIALOG_DATA);

  constructor(private http: HttpClient,private _toastService: ToastService) {
  }

  delete() {
    console.log(this.data.id)
    this.http.delete("http://localhost:8080/inventory_service/inventories/"+this.data.id,{withCredentials:true}).subscribe(
      {
        next: result => {
          console.log(result);
          this._toastService.success("Item Deleted Successfully!");
          window.location.reload();
        },
        error: (error:{error?:{error?:string}}) => {
          console.log(error);
          this._toastService.error(<string>error?.error?.error);
        }

      }
    )
  }
}


interface Item {
  id: number;
  itemType?:string
  itemName?: string
  itemDescription?: string
  itemBrand?: string
  itemPrice:number
  itemExpireDate:string|null
}
interface Page{
  content:Item[]
  last: boolean
}
