import { Component } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-prod-details',
  templateUrl: './prod-details.component.html',
  styleUrls: ['./prod-details.component.scss']
})
export class ProdDetailsComponent {
  editorvalue = "<h1><br></h1><h1>World's leading Collaborative and Highly Intuitive Platform to Empower Businesses</h1><p><br></p><p>The 3DEXPERIENCE Platform from Dassault Systèmes is a highly intuitive platform that helps drive superior collaboration by providing a real-time view of business activity and ecosystem. The platform can drive a paradigm shift in business and innovation by creating a single collaborative environment that empowers businesses and people to innovate in entirely new ways.</p><p><img src=\"https://www.solize.com/india/common/img/service-solution/product_design/001/img_01.jpg\" height=\"447\" width=\"438\"></p><p>With the 3DEXPERIENCE Platform, businesses can design and test consumer experiences right from the idea to usage stages, even before actual production. It drives a ‘platform’ mind-set that allows businesses to remove intermediaries between sellers and buyers, purchasers and subcontractors, service providers and end customers. It can act as a cloud-based marketplace that connects designers with a variety of ecosystem partners from manufacturers to suppliers.</p><p>It finds applications in several industries such as transformation and mobility, aerospace and defense, marine and offshore, home and lifestyle, industrial engineering, business services, etc.</p><p><br></p><h2>The 3DEXPERIENCE Platform Solutions</h2><p><br></p><h3><strong>CATIA</strong></h3><p>Backed by Dassault Systèmes’ 3DEXPERIENCE platform, CATIA is widely regarded as the number one solution for product design and experience. It is used across the globe by systems architects, engineers, designers, construction professionals etc. to design products in the context of their real-life behaviour. It is ideally suited for design in the age of experience in a connected world.</p><p><br></p><h3><strong>ENOVIA</strong></h3><p>ENOVIA is a one-of-a-kind product that provides a wide range of technical and business applications for organisations. This extensive platform offers collaboration for building innovative strategies and executing them successfully.</p><p>It enables organisations to optimize products and monitor progress at par with standards and regulations to transform potential market opportunities into marketplace advantages.</p><p><br></p><h3><strong>DELMIA</strong></h3><p>DELMIA offers a platform that fosters a strong connection between the real and virtual worlds. It provides a collaborative environment with comprehensive solutions to suppliers, manufacturers, logistics providers, or other specific workforces.</p><p>The ability to optimizing business operations and foster industrial collaboration is one of the major strengths of DELMIA.</p><p><br></p><h3><strong>3DVIA</strong></h3><p><img src=\"https://www.solize.com/india/common/img/service-solution/product_design/001/img_02.jpg\" height=\"447\" width=\"438\"></p><p>3DVIA enables organisations to create a smart 3D space planning solution. For instance, HomeByMe is a project designed using 3DVIA that enables customers to design and plan home projects as per the social trends. Promote customer engagement, reduce sales cycles with powerful leads using 3DVIA.</p><h3>NETVIBES</h3><p>NETVIBES helps businesses enhance decision making by offering a unified dashboard view of enterprise-related data. These data points and derived insights can be crucial in shaping the decision-making process.</p><p>NETVIBES allows businesses to analyse industry or product specific social listening, target audience data, invariably leading to action automation that helps in quick decision-making, 24/7 throughout the year.</p><p><br></p><h3><strong>3DEXCITE</strong></h3><p>Based on the 3DEXPERIENCE platform, 3DEXCITE helps marketers create impactful content and build storytelling experiences based on content production pipelines and collaborative networks that transcend traditional siloes. This provides greater creative freedom and helps deliver powerful product experiences across multiple channels with real-time content.</p><p><br></p><h3><strong>CENTRICPLM</strong></h3><p>Powered by 3DExperience, CENTRICPLM provides a platform that delivers innovative and retail-driven PLM solutions. This software solution helps businesses in product conceptualization, development, and execution.</p><p>Major users of CENTRICPLM are fashion, footwear, luxury, and consumer goods industries apart from the predominant retail industry.</p><p><br></p><h3><strong>BIOVIA</strong></h3><p>BIOVIA helps innovate and accelerate productivity by optimizing products. It provides a conducive and a collaborative environment to integrate experimental processes across various departments such as research, development, QA/QC, and manufacturing.</p><p><br></p><h3><strong>MEDIDATA</strong></h3><p>Accelerating business value, minimizing risk by optimizing products, MEDIDATA is crucial for generating evidence and actionable insights. This product caters particularly to pharmaceutical, biotech, medical device, and diagnostics organizations.</p><p><br></p><h3><strong>GEOVIA</strong></h3><p>Powered by 3DEXPERIENCE, GEOVIA empowers businesses globally, by offering modeling solutions that enhance productivity, predictability, safety, and sustainability of natural resources.</p><p><br></p><h3><strong>SOLIDWORKS</strong></h3><p>SOLIDWORKS provides engineering professionals with a user-friendly 3D CAD software and a platform that supports training, thus, enabling them to drive innovation and excellence.</p><p><br></p><h3><strong>SIMULA</strong></h3><p>SIMULA is a software solution that offers realistic simulation applications and enables engineers to efficiently evaluate the performance, reliability and safety of materials and products. SIMULA is widely used in Application Engineering, Multiphysics Simulation, and Simulation Data Science.</p>"
  id: any;
  htmlContent: SafeHtml;
  categoryName: any;
  productName: any;
  categoryId: any;

  constructor(private CommonService: CommonService, private route: Router, private activatedRoute: ActivatedRoute, private sanitizer: DomSanitizer) {
    this.activatedRoute.queryParamMap.subscribe(res => {
      this.id = res.get('id');
    })
  }

  ngOnInit(): void {
    this.patchDataInView();
    this.categoryId = localStorage.getItem('categoryId');

  }

  routeclick() {
    this.route.navigate(['/category'], { queryParams: { id: this.categoryId, } });
  }

  patchDataInView() {
    this.CommonService.getproductId(this.id).subscribe((res) => {
      this.categoryName = res.categoryName;
      this.productName = res.productName;
      const decodedHtml = res.productDesc
      this.htmlContent = this.sanitizer.bypassSecurityTrustHtml(decodedHtml);

    })
  }
}
