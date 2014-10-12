Sympozer
=============

Sympozer is an Angular/Symfony web application allowing event organizers to manage efficiently their communication with collaborators and attendees.

License
-------

This bundle is under the Creative Common license CC-BY-NC-SA. See the complete license in the bundle:

    https://creativecommons.org/licenses/by-nc-sa/3.0/

Installation instruction
-------
    
[Read the installation guide for master](https://github.com/BenoitDdlp/Sympozer-event-manager-app/install.md)
	
#USER MANUAL

----------------
#About Conferences :

	You can import your events in Sympozer database. For that create a new Conference(see How create a new Conference ? section) .
	You can easily see and manage them with the schedule view.
	You can create several Conference with your account.

----------------
#About Link :
##What is an event Link ? 

	With wwwConference you can Link your event with a metadata on the web, for example a Publication or an other Event. 
	A Link have a type (Xnamespace), the name of the object linked (Xkey) and his uri (Xvalue).
	You can Link an Event with an other Event or a Publication.
	The link is created by the Xproperty object. This is a member of an event. Is composed by : Xnamespace, Xkey, Xvalue.(see How to create a Link ? section)

----------------
#About Relation Event :

	You can create relations between events : Parent, Sibling, Child. A relation contain the name event linked and the relation type.

----------------
#How to create a Link ?

	See "How to create or remove an Event ?" section.
			Also you can go to the schedule view,  and click on the event you want to set up a link to.
			In the edit view you can add a link :
			
				- Choose your link type with the Xnamespace dropdown button.
				- In the xKey you have an autocompletion for  publications  or events. Select the name, and the Xvalue will be automaticaly filled with the uri of the selected event or publication.
				- Click on "Add"
		
----------------
#How to edit a link ?

	See "How to edit event ?" section.


----------------
#How to create or remove a new Conference ?

##Create Conference :

	Click on "Manage Conferences". Here you can manage your conferences and create a new one.
	By default, an event without dateStart or dateEnd, have the current date with one hour duration.  
	Main Page >  Manage Conferences > fill out "Import SWC Ontology" and "Sparql Config" > Process Import
	

##Delete Conference : 

	Click on "Manage Conferences". Select your conference and click on "Delete".
	Main Page >  Manage Conferences > Select the Conference to delete > Delete

----------------
#How to edit and see schedule of a conference ?

	Click on "Manage Conferences". Select your conference and click on "Schedule view". On this calendar you can Add, Edit, Delete, Consult events of the selected conference.
	Main Page >  Manage Conferences > Select the Conference to delete > View Schedule

##2nd Option :

	Click on the dropdown button "Manage Schedule" on the top menu, and select your conference.

##3rd Option :

	On the main page,click on the "Manage Schedule" green button. 
	If you have several Conferences available, click on the right(list button) of the green button "Manage Schedule", and choose your conference.


----------------
#How to create or remove an event ?

##Create an Event :

	In the main Page click on "Event" on the top menu. Then click on "Create a new Entry" fill out the form and click on "Create".
	Top Menu > Event > Create a New Entry > Fill out form > Create.

##About form :

	- Summary : event title 
	- Categories : Choose categories among created categories (see How to create category ?)
	- Start At : Begin Hour of the event 
	- Options : All the day or recurrence (Frequency, ByYear, ByMonth, ByMonthDay, ByDay, ByHour, ByMinute, BySecond, and Repeat Each)
	- url : event Url 
	- Classification : Choose if your event is PUBLIC, PRIVATE or CONFIDENTIAL.
	- Comment : add comment about your event 
	- Organizer : precise the event organizer 
	- Contacts : contacts for the event 
	- Duration : event duration. For example one hour.
	- Location : Choose location among created location (see How to create Location ?)
	

	Then, you can add a new Link to the event.
					- A new Event Link :
					
							Xnamespace : "event_uri"
							Xkey : event name 
							Xvalue : event uri 
					- A new Publication Link :
					
							Xnamespace : "publication_uri"
							Xkey : publication name 
							Xvalue : publication uri 
							
	Then click on the button "Add".
	
##Create a new Event Relation : Child, Sibling, Parents

	Choose an event with the dropdown button "Related To", then choose your relation type with "Relation Type" dropdown button.

##Remove an Event : 

	On the main page, click on "Event" on the top menu. Then click on the "Edit" button of the event you wanna delete, and click on "Delete".
	Top Menu > Event > Choose Event > Edit > Delete.

----------------
#How to edit an event ?

	On the main page click on "Event" on the top menu. Then, click on "Edit" button. Make your changes and click on "Edit" to save them.
	Top Menu > Event > Edit > make your modifications > Edit.

	- Xnamespace, Xvalue, Xkey see "About Link" or "How create or remove an event ?" section
	- "Relatedto" and "Relationtype" see "About event relation" or "How create or remove an event ?" 

----------------
#How to show an event ?

	On the top menu click on "Event", and click on "show" button to show your event.
		You can see all Event elements and also Link and Relation.


----------------
#How to create or remove a Location ?

##Create :
	In the main Page click on "Location" on the top menu. Then click on "Create a new Entry" fill out the form and click on "Create".
		Top Menu > Location > Create a New Entry > Fill out form > Create.

		About the form :
		
				- Name : Name of the Location 
				- Description : add informations about the location
				- Latitude and Longitude

##Remove : 

	In the main Page click on "Location" on the top menu. Then click on "Edit" button of the event to delete , and click on "Delete".
	Top Menu > Location > Choose Location > Edit > Delete.

----------------
#How to edit a Location ?

	In the main Page click on "Location" on the top menu. Then click on "Edit" button.
	Top Menu > Location > Choose Location > Edit > fill out the form > Edit(save changes)


----------------
#How to create or remove a Status(event status) ?

##Create :

	In the main Page click on "Status" on the top menu. Then click on "Create a new Entry" fill out the form and click on "Create".
	Top Menu > Status > Create a New Entry > Fill out form > Create.

##About the form :

		- Value : Status name. For example "Canceled"
		- Calendar Entity : Choose "event"

##Remove : 

	In the main Page click on "Status" on the top menu. Then click on "Edit" button of the event to delete, and click on "Delete".
	Top Menu > Status > Choose Status > Edit > Delete.

----------------
#About the schedule view ? 

	Edit Event : Click on the event you wanna change to launch the edit form.(see How to edit an event ? section).
		You can change StarAt and EndAt event, in order to do that change the size of the event button or drag it.
		All new events or changes are automaticaly saved in the database.
