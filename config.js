/*=======================================================
* Copyrights (c) 2015 Crive
*
* Change Log
* =======================================================
* Story: Config file to contain the configuration detail.
* Created By: Mukesh
* Date: 27 01 2015
*/

"use strict";

function Config()
{
	/**
	* Contain the port number to which we want to listen
	*/
	this.port = '4000';

	/**
	* Contain the dbs url to which we want to connect
	*/
	this.dbUrl = 'mongodb://dksaha:21ststreet@ds023465.mlab.com:23465/balakanew';
//		'mongodb://crive_dbuser:3at400dandsleeP@ds035014.mongolab.com:35014/crive';

	/**
	* Contain the Redis Store Info
	*/
	this.redisStore = { 
		host: 'redis-16134.c8.us-east-1-3.ec2.cloud.redislabs.com',
		port: '16134',
		secret: 'balakaredis' 
	};

	/**
	* Contain the env
	*/
	this.env = 'demo';

	/**
	* Contain the domain name
	*/
	this.domain = "ec2-52-38-21-15.us-west-2.compute.amazonaws.com";

	/**
	* Contain the admin subdomain name
	*/
	this.admin = "admins";

	/**
	* Contain the signIn secert
	*/
	this.sSec = "crive2016";

	/**
	* Contain the mail configuration
	*/
	this.mailConfig ={
		service: 'Gmail',
    	auth: {
        	user: 'sahadhritikalpa@gmail.com',
        	pass: '21ststreet'
    	}
	};

	this.supportEmail = "support@crive.in";

	/**
	* Contain the site url
	*/
	this.url = 'http://ec2-52-38-21-15.us-west-2.compute.amazonaws.com:4000';

	/**
	* Contain the admin url
	*/
	this.adminUrl = 'http://'+this.admin+'.ec2-52-38-21-15.us-west-2.compute.amazonaws.com:4000';
}

module.exports = new Config();