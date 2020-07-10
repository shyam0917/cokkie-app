import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-iframe-form',
  templateUrl: './iframe-form.page.html',
  styleUrls: ['./iframe-form.page.scss'],
})
export class IframeFormPage implements OnInit {
  switch: string;
  editUrl:any ={};
  constructor(private activatedRoute: ActivatedRoute,
    private router : Router) {
    this.editUrl = this.router.getCurrentNavigation().extras.state;
   }

  ngOnInit() {
    console.log("Ere",this.editUrl);
    this.switch = this.activatedRoute.snapshot.paramMap.get('id');
  }

}
