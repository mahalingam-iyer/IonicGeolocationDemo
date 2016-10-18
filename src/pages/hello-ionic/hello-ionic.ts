//@author: Mahalingam Iyer
//POC for RUN Application 

//import dependencies
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Geolocation } from 'ionic-native';
declare var google:any;
//template for this view
@Component({
  templateUrl: 'hello-ionic.html'
})
//actual class
export class HelloIonicPage {

  //map to hold map instance
	public map:any;

  //constructor
  constructor(public platform: Platform) {
  	this.platform = platform;
  	this.loadRunningMap();
  }

  //bind click event and show text on marker on map
  bindInfoClick(marker, content){
    //adding info 
	  let info = new google.maps.InfoWindow({
	    content: content
	  });
	 
    //adding click
	  google.maps.event.addListener(marker, 'click', () => {
	    info.open(this.map, marker);
	  });
 
	}

  //add marker for current user location
  addCurrentLocMarker():void{
  	let marker = new google.maps.Marker({
    map: this.map,
    animation: google.maps.Animation.BOUNCE,
    position: this.map.getCenter(),
    icon: "assets/icon/running1.png"
  });
 
  //content
  let content = "<h4>Your Location!</h4>";          
 
  this.bindInfoClick(marker, content);
  }

  //init map and marker
  loadRunningMap():void{
  		var options = { enableHighAccuracy: true };
        navigator.geolocation.getCurrentPosition((position) => {
        	this.map = new google.maps.Map(document.getElementById('map'), {
            zoom: 16,
            center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });

        	this.addCurrentLocMarker();
        },(err) => {
          //error handling currently console log
      console.log(err);
    },options);
  }
}
