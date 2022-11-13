# Client Service

***

### DataLog :

***

### Version 0.0.1-SNAPSHOT

### 14-04-2022

- Error handling
    - Imported the Exception handling from User service
    - Added required error handlers

### 14-04-02022

- branch can be added without order

- orders : for branches, what models they want 
- order model minor change, if it's device must contain it's desired oil type
- validations changed from warehouse by id, and match devices to their oil types

- changed and updated logger messages
- changed and cleaned what was branch request controller, is now merged in branch controller
- removed some logic linked to deleting branch request, and is now just linked to deleting orders

- tests check
- test data updated :
- added images for branches
- branch locations randomly seperated
- requests sent to wark service to prepare task skeleton
- added clients ready for invoicing and generated invoicing list for them.

### 12-04-2022

- when setting branch inactive, if it has unpaid time, response asks for confirmation
- when generating clients invoicing list, inactive branches are checked as well for periods that still need to be paid.
- tests and some cleaning

### 01.04.2022

- enabled post new client individually, without request
- save new client and update client in post client endpoint
- added ignoreCase check for existing company name and/or eik
- added log operation for client creation
- checked and added tests for enabling client creation
- added main group in Client entity

- removed accept new branch request, all branches are saved as new branches.
- if branch request deleted, client info stays.

- linked communications between client - work, and client - warehouse when adding new request.
- added to request items models
- added to items validations
- checked tests


### 28.03.2022

dashboard view for branches :

- map view renamed to dashboard
- added client phone, and assigned task boolean field
- assigned task is set for order, and fetched later in dashboard view
- if order is already assigned to a user, it can't be updated in client service
- updated initial test data to start devices in timer service

### 25.03.2022

- added device orders if branch wants to order more in the future
- get all and get by id endpoints for orders, with filter and pagination
- orders can be updated/deleted
- when deleting order, if it's the one made with the initial branch request, a msg is shown with redirect to the branch request 
- all changes are sent to work service
- when installation begins for order it's deleted.

### 23.03.2022

- changed new branch request 
    - added devices and other needed materials and their count.
    - added validations for requested items, must have devices and oil with matching counts, can optionally have other materials too.
    - further validations from warehouse service to ensure items are valid.
- prepared request items to be sent to work service for task creation.

### 21.03.2022

- optimized get all invoices query
- one enum converter class, for all enum type, instead of one per enum
  to be able to send them ignored case in request params
- added set of statuses for branches in map view
- added get branch image by branch id endpoint, 
   so now options to get image by file name (from imgUrl) or by branch id.

### 16.03.2022

- added client payment statuses.
- mapped branch statuses from timer service when get all request is made
- mapped device statuses 
- added payment method(cash, bank, etc.) and invoice state(written, sent, etc.) to invoices.

### 01.03.2022

- send logs to logger service
- different logs for different operations
- if update endpoint doesn't have any changes, it doesn't send log. 

### 18.02.2022

added to payment/invoicing 
1. invoicing details can be modified
- fee per branch can be modified, and total is calculated in backend
2. invoicing can be deleted if not sent and not paid
3. invoicing can be generated manually
- if generating invoice changes client payment date a request is sent to timer service to update client next payment date
4. client payment information can be modified by date or period of months
5. when first device is installed for branch 
- branch becomes active
- payment timer starts for branch if it's not in test period
- device is marked as active
6. payment dates for client are updated when finished, by payment period(1 month by default)
   every day at 20:00h, and request to update is sent to timer service. 

***************
### 14.02.2022

changes in payment/invoicing logic :
1. invoicing list generated (daily) for clients with total fee, upcoming payment date 
   and details for branches (count devices for that period, fee per branch)
   by scheduled job that runs every morning
2. test period and payment date are set for client (instead of per branch)
3. client payment information can be modified 
   - if update is successful send client active branches ids to timer service if :
   
   -> set new payment date, update payment timer payment date

   -> set test period as false, update timer service to start payment timer

   -> extend test period, update timer service test period
4. payments are marked per invoice (with invoice id)
   - all branches ids for that client are sent to timer service to update payment timer status

5. clients and invoicing list authorization level is by main group, without restriction to subgroup.
***********************
### 11.02.2022

added global filtration per table for clients, branches, invoicing list, and requests.
********
### 10.02.2022

invoicing for branches
1. read invoice days value from config service
2. generate ready to be invoiced list from branches
3. delete invoiced and paid branches from invoicing list for last month
4. invoicing list can be filtered
5. when payment is marked invoicings are also marked as paid according to their date/s

*******************
### 08.02.2022

1. start endpoint for setting branch inactive, deletes it's devices in client-service, and sends a request to timers-service to complete work.
2. maps branch's in test status from timers-service when branches are fetched

*****************
### 31.01.2022

1. filter by group name disabled for external client, enabled for internal use
2. when get branches endpoint hit, statuses from timer service are mapped
3. moved authorization filter (filtering items by default by user group) from service classes to filter classes

*****************************
### 28.01.2022

1. get user group from user service by user id
2. if group is null (user is admin)
- check whether user role is admin from user service and if true return all items/records
- if false(not admin and group is null) return empty list

********************
#### 27.01.2022

1. pagination added to getAll endpoints :
- client(front end) sends page number and items count in one page
  example for get all clients endpoint : localhost:9002/clients?pager.page=0&pager.itemsPerPage=10(doesn't work in swagger like that)
- this will return object {items : [], pager : {"page":x,"pagesCount":y,"itemsPerPage":i,"totalCount":j,"itemsCount":k}}
2. get all endpoints may be used without pagination as well, in that case all records will be returned as [] (not object, just list)
- if decided later that all get all endpoints, with or without pagination should return the same(object of paging info + list of items), it will be done. 
3. if pagination is sent but for some reason is empty or < 0 values, default values of page 1(first) and 10 items per page.
4. page numbers to be sent from frontend starts from 1, and returned values starts from 1.
5. some filter changes.
- example search branches created before some date : localhost:9002/clients/branches?createdOnBefore=2022-08-08

6. test data : 30 clients * 30 branches * 1 device each * 1 default work hours each 
- all branches located in Varna, with different latitude and longitude within Varna

**************
#### 26.01.2022

- internal endpoint to check whether a specific device id exists for a branch
- internal endpoint to update device info after installation (batch number, warehouse device id, optional inventory number)

******************
### Version 0.0.1-SNAPSHOT
#### 25.01.2022

for internal communications :
- internal endpoint to send client device info when starting timers
- send request to timer service when work hours change to update timers
- send request to timer service when device is deleted to delete related timers
- send request to timer service when branch request is accepted as new client,
       with branch info(is test period + stop on + if there is payment date) 

for branch entity :
- test period info moved to branch entity instead of client entity
*************

#### version 0.0.1-SNAPSHOT

17-01-2022

1. internal endpoint to retrieve client device information and related work hours
2. request to timers service to update timers when work hours are updated  

05-01-2022

1. get all requests returns branch information
2. get by id request endpoint return all request information(branch, client, devices, work hours)
3. all responses return json
- save responses returns id of the successfully processed object in "id"
- if save operation was for list of objects response returns list of ids in "ids"
4. fixed most data integrity exceptions to constraint violation exceptions
5. validation logic moved to validators
6. added image upload and get image endpoints
7. added custom views for get all branches endpoint. 
- mapview = (id, name, state, location info, client name, is test period)
- detailview = mapview + (creatorId, groupName, comment, clientId)
- basicview = (id, name, state, imageurl, client info, list of short device(id, passport id, oil name))
8. added branch repository extension and custom implementations, test database projection queries for returning custom objects
9. added tests : validation tests, post requests, get requests

*************
22-12-2021

get end points:
1. for all branches with just branch details : /clients/branches
2. for map view : /clients/branches?view=mapview
- map view holds information for : (location, branch id, branch name, branch state, client name, and is test period) 
3. all get request will check for user group and return just these from same group.
4. example endpoint for filtering branches in map view by state : /clients/branches?view=mapview&state=pending

test data :
- test data set to 31 clients * 30branches each * 1 device each * 1 default work hours(work mode).
- for get test to pass :
 1. user making request must be same group as test data branch group.
 2. user must exist in user service.
 3. connection must be correct with user service.

********************
21-12-2021

Request management

1. post new request
- new branch request + new client/exiting client + devices.
- if work hours(work modes) not specified for device, default working hours(24/7) are assigned.
- if spray and wait range not specified in work hour, default ranges are assigned.
- if branch group not specified, it's assigned the user group.
2. individual components are updated separately.
3. started base service to abstract similar methods. 
4. connection established with user-service to check user group.
5. ready to connect to warehouse-service to check device passport.

 ************************

14-12-2021

validations

1. database constraints.
2. field validations.
3. exception handling.
 ***************************

#### version 0.0.1-SNAPSHOT

13-12-2021

device work hours management

1. work hours can be added/updated separately for device.

- add/update one. 
- add/update a list.
- device id must be provided as path variable
- validates list size for the device in db, with the new requested :
  (max of 3, week days for all must be unique).

2. annotation for swagger insertion of time
3. tests for save/update functionality
  
*************************

#### version 0.0.1-SNAPSHOT

10-12-2021

client models modification

- relations between entities are modified.
- related models are modified.
- related code is checked and modified.
- tests are changed and checked.

************************

#### version 0.0.1-SNAPSHOT

08-12-2021

client devices management : 

1. added GET endpoint to fetch all client devices by filter.
- (by device id, batch number, client name or id).
- filters are optional.
- filters can be extended if needed.
2. POST endpoint to add/update client devices one at a time or a list.
3. DELETE endpoint by client device id.

*************************

#### version 0.0.1-SNAPSHOT

07-12-2021

filter with get requests

1. added filter for get client endpoint
- filter is received as query string.
- clients can be filtered by all basic, company and address info.
- names are filtered by equals.
- address by contains.
- returns list of clients. 
2. added tests
3. endpoint for get client by id
4. endpoint for get client devices by filter

#### todo :

- when connected to gateway, clients will be filtered by default according to the groups for each user.

************************


#### version 0.0.1-SNAPSHOT

07-12-2021

1. minor changes in entity models
- company address moved to location model.
- added list client devices and work hours to Client model.
2. add new client endpoint 
- adds new client, with all related info (basic client info + location + company info + lists of desired devices + working hours).
- updates client basic info and optionally the related models, which in case ids must be provided for devices or working hours. 
- company img if provided is saved in file system, if updated rewrites the old one, saving the url in DB.

#### todo :

- may need to add additional fields, that are considered changeable by client wishes.
- add validations.
- catch exceptions.
- sending img documentary as multipart file instead of just byte[].


 ************** 

#### version 0.0.1-SNAPSHOT

- added readme.md
- added springdoc-openapi documentation
- added additional fields to client device entity, which may change value if client decides.

#### todo :

- may need to add additional fields, that are considered changeable by client wishes.





