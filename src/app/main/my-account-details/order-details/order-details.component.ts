import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { OrderserviceService } from 'src/app/services/orderservice.service';
import { MatSort } from '@angular/material/sort';
import { ScrollingModule } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent {
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns = [{ def: "id", label: "id", visible: true },
  { def: "Vendor", label: "Vendor", visible: true },
  { def: "Product", label: "Product", visible: true },
  { def: "HSMSACCode", label: "HSMSACCode", visible: true },
  { def: "Client", label: "Client", visible: true },
  { def: "DivisionName", label: "DivisionName", visible: true },
  { def: "LicenseType", label: "LicenseType", visible: true },
  { def: "Rate", label: "Rate", visible: true },
  { def: "Quantity", label: "Quantity", visible: true },
  { def: "PeriodStartDate", label: "PeriodStartDate", visible: true },
  { def: "PeriodEndDate", label: "PeriodEndDate", visible: true },
  { def: "InvoiceNo", label: "InvoiceNo", visible: true },
  { def: "ServiceNo", label: "ServiceNo", visible: true },
  { def: "PurchaseOrderNo", label: "PurchaseOrderNo", visible: true },
  { def: "PurchaseOrderDate", label: "PurchaseOrderDate", visible: true },
  { def: "PaymentTerms", label: "PaymentTerms", visible: true },
  { def: "PaymentStatus", label: "PaymentStatus", visible: true },
  { def: "RegionTerritory", label: "RegionTerritory", visible: true },
  { def: "BillToAddress", label: "BillToAddress", visible: true },
  { def: "SupplyToAddress", label: "SupplyToAddress", visible: true },
  { def: "action", label: "Action", visible: true },
  ];

  dataSource = new MatTableDataSource<Element>();
  search = new FormControl();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  selectedSortOption: string = null;
  selectedFilter: string = 'All';
  sortOptions: { label: string, value: string }[] = [
    { label: 'Low to High', value: 'low to high' },
    { label: 'Recent to Old', value: 'recent to old' },
    { label: 'Newest Order', value: 'newest order' }
  ];
  openCount: number = 0;
  cancelledCount: number = 0;
  userId: any;

  constructor(private orderService: OrderserviceService) { }

  ngOnInit() {
    this.selectedSortOption = 'Choose an option';
    this.getAllorders();
    this.dataSource.paginator = this.paginator;
  }

  getDisplayedColumns(): string[] {
    return this.displayedColumns.filter(cd => cd.visible).map(cd => cd.def);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getAllorders() {
    this.userId = localStorage.getItem('userId');
    const userId = +this.userId;
    this.orderService.getordersByUsersId(userId).subscribe((res => {
     const mergedResponse = [];
      const currentDate = new Date();
      for (let i = 0; i < res.orderDetails.length; i++) {
        const order = res.orderDetails[i];
        let action = '';
        const expiryDate = new Date(order.expiryDate);
        const currentDate = new Date();
        const diffMilliseconds = expiryDate.getTime() - currentDate.getTime();
        const diffDays = Math.ceil(diffMilliseconds / (1000 * 60 * 60 * 24));
        const diffMonths = (expiryDate.getFullYear() - currentDate.getFullYear()) * 12 + (expiryDate.getMonth() - currentDate.getMonth());
        if (diffDays <= 3 && diffMonths >= -3) {
          action = 'Renew Again';
        }
        else if (diffMonths <= -3) {
          action = 'Cancelled';
        }
        else {
          action = 'Active';
        }
        const mergedOrder = {
          ...order,
          action: action
        };
        mergedResponse.push(mergedOrder);
      }
      this.dataSource = new MatTableDataSource(mergedResponse);
      this.dataSource.paginator = this.paginator;
    }))
  }

  fetchOrdersForUser(): void {
    this.userId = localStorage.getItem('userId');
    const userId = +this.userId; // Convert to number
    this.orderService.getallorder(userId).subscribe(
      (response: any) => {
        this.dataSource = response;
        const images = [
          { image: 'assets/images/img_001.jpg' },
          { image: 'assets/images/img_004.jpg' },
          { image: 'assets/images/img_004.jpg' },
          { image: 'assets/images/img_005.jpg' },
          { image: 'assets/images/img_001.jpg' },
          { image: 'assets/images/img_004.jpg' },
          { image: 'assets/images/img_004.jpg' },
          { image: 'assets/images/img_005.jpg' },
          { image: 'assets/images/img_005.jpg' },
        ];
        const mergedResponse = [];
        const currentDate = new Date();
        for (let i = 0; i < response.length; i++) {
          const order = response[i];
          const image = images[i] ? images[i].image : null;
          let action = '';
          const expiryDate = new Date(order.expiryDate);
          const currentDate = new Date();
          const diffMilliseconds = expiryDate.getTime() - currentDate.getTime();
          const diffDays = Math.ceil(diffMilliseconds / (1000 * 60 * 60 * 24));
          const diffMonths = (expiryDate.getFullYear() - currentDate.getFullYear()) * 12 + (expiryDate.getMonth() - currentDate.getMonth());
          if (diffDays <= 3 && diffMonths >= -3) {
            action = 'Renew Again';
          }
          else if (diffMonths <= -3) {
            action = 'Cancelled';
          }
          else {
            action = 'Active';
          }
          const mergedOrder = {
            ...order,
            image: image,
            action: action
          };
          mergedResponse.push(mergedOrder);
        }
        this.dataSource = new MatTableDataSource(mergedResponse);
        this.dataSource.paginator = this.paginator;
        this.paginator.pageSize = 5;
      },
      (error) => {
      }
    );
  }

  setSelectedFilter(filter: string) {
    this.selectedFilter = filter;
  }

  resetFilter() {
    this.dataSource.filter = '';
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onActionButtonClick(element: Element) {
  }

  filterByStatus(status: string) {
    this.resetFilter(); 
    this.dataSource.filter = status.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    const filteredCount = this.dataSource.filteredData.length;
    if (status === 'Active') {
      this.openCount = filteredCount; 
      this.cancelledCount = 0; 
    } else if (status === 'Cancelled') {
      this.cancelledCount = filteredCount;
      this.openCount = 0; 
    }
    else if ('All') {
      this.openCount = 0
      this.cancelledCount = 0;
    }
  }

  handleSortSelection() {
    this.openCount = 0;
    this.cancelledCount = 0;
    this.selectedFilter = 'All';
    if (this.selectedSortOption) {
      switch (this.selectedSortOption) {
        case 'low to high':
          this.dataSource.data.sort((a, b) => {
            return a.invoiceAmount - b.invoiceAmount;
          });
          break;
        case 'recent to old':
          this.dataSource.data.sort((a, b) => {
            const dateA = new Date(a.expiryDate).getTime();
            const dateB = new Date(b.expiryDate).getTime();
            return dateB - dateA;
          });
          break;
        case 'newest order':
          this.dataSource.data.sort((a, b) => {
            return new Date(b.effectiveDate).getTime() - new Date(a.effectiveDate).getTime();
          });
          break;
        default:
          break;
      }
      this.dataSource = new MatTableDataSource<Element>([...this.dataSource.data]);
      this.dataSource.sort = this.sort;
    }
  }
}

export interface Element {
  position: number;
  image: string;
  name: string;
  OrderId: string;
  quantity: number;
  invoiceAmount: number;
  expiryDate: Date;
  paymentStatus: string;
  message: string;
  action: string;
  icon: any;
  effectiveDate: any;
}

