import LiferayParams from '../types/LiferayParams'
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
//import { Router } from '@angular/router';

import { ProviderService } from './services/provider.service';
//import { Auth0Service } from 'src/app/services/auth0.service';
import { ModalService } from './services/modal.service';
import { FormService } from './services/form.service';
import { LocationsService } from './services/locations.service';

import { FIELDS } from './constants/constants';
//import { ROUTES } from './constants/routes';


declare const Liferay: any;

@Component({
	selector: 'app-root',
	templateUrl: 
		Liferay.ThemeDisplay.getPathContext() + 
		'/o/mkpl-create-provider/app/app.component.html'
})
export class AppComponent{
	params: LiferayParams;
	
	 form: FormGroup;
	 latitude: number;
	 longitude: number;
	 adminEmail: string;
	 isViewableGeneralForm = true;
	 isViewableContactForm = true;
	 requestError = false;
	 countries:any = [];
     cities:any = [];
     regions:any = [];
	 currentStep = 1;
	  contentStep = 2;
	 loadingRequest = false;

	constructor(
		private providerService: ProviderService,
		//public auth: Auth0Service,
		private modalService: ModalService,
		private formService: FormService,
		private locationsService: LocationsService,
//		private router: Router
	) { }

	
	get configurationJSON() {
		return JSON.stringify(this.params.configuration, null, 2);
	}

	ngOnInit(): void{
		this.form = this.formService.createForm(FIELDS);
	//	this.locationsService.getCountries().subscribe(response => this.countries = response.data, () => this.countries = []);
		this.countries = this.locationsService.getCountries();
	 	 if (localStorage.getItem('providerExist') === 'true') {
		  this.showForm();
		}  
	}

	  createProvider() {
		const data = {
		  nit: this.form.get('general').value.nit,
		  name: this.form.get('general').value.company,
		  phone: this.form.get('contact').value.contactPhone,
		  contact_name: this.form.get('contact').value.contactName,
		  email: this.form.get('contact').value.contactEmail.toLowerCase(),
		  active: true,
		  location: {
			address: this.form.get('general').value.address
		  },
		  admin_user: {
			email: this.form.get('contact').value.adminEmail.toLowerCase()
		  }
		};
		this.loadingRequest = true;
	/* 	this.providerService.createProvider(data, this.form.get('general').value.city).subscribe(
		  () => {
			this.requestError = false;
			this.loadingRequest = false;
			this.openModal('modal-provider');
			this.isViewableGeneralForm = false;
			this.isViewableContactForm = false;
			this.contentStep = 1;
		  },
		  () => {
			this.requestError = true;
			this.loadingRequest = false;
			this.openModal('modal-provider');
			this.isViewableGeneralForm = true;
			this.contentStep = 2;
			this.isViewableContactForm = false;
		  }
		); */
		this.currentStep = 1;
		this.form.reset();
	  }  

	   showForm() {
		this.isViewableGeneralForm = true;
		this.contentStep = 2;
	  }
	
	  closeForm() {
		this.currentStep = 1;
		this.form.reset();
	  }
	
	  showContactForm() {
		this.isViewableGeneralForm = false;
		this.isViewableGeneralForm = false;
		this.isViewableContactForm = true;
		this.currentStep = 2;
	  }
	
	  closeContactForm() {
		this.currentStep = 1;
		this.isViewableContactForm = false;
		this.isViewableGeneralForm = true;
	  }
	
	   openModal(id: string) {
		this.modalService.open(id);
	  }  
	
	   closeModal(id: string) {
		this.modalService.close(id);
		if (!this.requestError) {
		  localStorage.removeItem('providerExist');
	//	  this.router.navigate([ROUTES.providers]);
		}
	  } 
	
	  changeCountry(value:any) {
	//	this.locationsService.getRegions(value).subscribe(response => this.regions = response.data, () => this.regions = []);
		this.form.get('general.region').setValue('');
	  }
	
	  changeRegion(value:any) {
		//this.locationsService.getCities(value).subscribe(response => this.cities = response.data, () => this.cities = []);
		this.form.get('general.city').setValue('');
	  }
}