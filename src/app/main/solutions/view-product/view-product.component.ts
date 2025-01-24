import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Subscription } from 'rxjs';
import { CommonService } from 'src/app/services/common.service';
import { WebSocketService } from 'src/app/services/web-socket.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.scss']
})
export class ViewProductComponent {

  @ViewChild('dataToExport') dataToExport: ElementRef;
  id: any;
  action: any;
  htmlContent: SafeHtml;
  domContent: any;
  pdfOptions: any;
  productData: any;
  showLoader: boolean = false;

  constructor(private activatedRoute: ActivatedRoute, private commonservice: CommonService, private sanitizer: DomSanitizer,
    private router: Router, private webSocketService: WebSocketService

  ) { }

  ngOnInit() {
    this.activatedRoute.queryParamMap.subscribe(res => {
      this.id = res.get('id');
      this.action = res.get('action');
    })
    this.getProductById();

    this.webSocketService.messages$.subscribe((message: string) => {
      if (message == "UPDATE_PUBLISHED") {
        this.getProductById();
      }
    });
  }


  getProductById() {
    this.showLoader = true;
    this.commonservice.getProductsById(this.id).subscribe((res) => {
      if (res) {
        this.showLoader = false;
        if (!res.isPublished) {
          this.router.navigate(['/landing']); // Redirect to product list
        } else {
          const decodedHtml = res?.domFullContent == null || !res?.domFullContent ? '' : res?.domFullContent;
          this.domContent = res?.domFullContent;
          this.htmlContent = this.sanitizer.bypassSecurityTrustHtml(decodedHtml);
          this.productData = res;

        }
      } else {
        this.showLoader = false;
      }
    }, error => {
      this.showLoader = false;
    });
  }


  generatePDF(): void {
    const element = document.getElementById('captureElement');
    if (element) {
      this.waitForImagesToLoad(element).then(() => {
        html2canvas(element, { useCORS: true }).then((canvas) => {
          const imgData = canvas.toDataURL('image/png');
          const pdf = new jsPDF();
          const imgProps = pdf.getImageProperties(imgData);
          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
          pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
          pdf.save('download.pdf');
        }).catch((error) => {
          console.error('Error generating PDF:', error);
        });
      });
    } else {
      console.error('Element not found');
    }
  }

  waitForImagesToLoad(element: HTMLElement): Promise<void> {
    const imgElements = element.getElementsByTagName('img');
    const imgPromises = [];
    for (let i = 0; i < imgElements.length; i++) {
      const img = imgElements[i];
      if (!img.complete) {
        imgPromises.push(new Promise<void>((resolve) => {
          img.onload = () => resolve();
          img.onerror = () => resolve(); // Resolve even if image fails to load
        }));
      }
    }
    return Promise.all(imgPromises).then(() => { });
  }

  private ensureImagesLoaded(element: HTMLElement): Promise<void> {
    const imgElements = Array.from(element.getElementsByTagName('img'));
    const promises = imgElements.map(img => {
      return new Promise<void>((resolve, reject) => {
        if (img.complete) {
          resolve();
        } else {
          img.onload = () => resolve();
          img.onerror = () => reject(new Error('Image failed to load'));
        }
      });
    });
    return Promise.all(promises).then(() => { });
  }

  private convertToPdf(imgData: string, fileName: string) {
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgProps = pdf.getImageProperties(imgData);
    const imgWidth = pdfWidth;
    const imgHeight = (imgProps.height * imgWidth) / imgProps.width;
    let heightLeft = imgHeight;
    let position = 0;
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pdfHeight;
    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;
    }
    pdf.save(`${fileName}.pdf`);
  }

  public async downloadPdf() {
    if (this.domContent) {
      const element = this.dataToExport.nativeElement;
      const fileName = this.productData?.productName?this.productData?.productName:'Product';
      if (element) {
        await this.ensureImagesLoaded(element);
        try {
          const canvas = await html2canvas(element, { scale: 2, useCORS: true });
          const imgData = canvas.toDataURL('image/png');
          this.convertToPdf(imgData, fileName);
        } catch (error) {
          console.error('Error capturing the content:', error);
        }
      } else {
        console.error('Element not found.');
      }
    }
  }
}

