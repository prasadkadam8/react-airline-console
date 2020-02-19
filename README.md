# Airline console application

## Step to run application:
1. Extract zip file
2. Install npm: npm install
3. Setup User roles as per steps given below then start the application
4. Run npm:- npm start


## Setup UserRoles (Using google login authentation)
1. Goto mockData.js file
2. search for "userRoles"
3. Put any of your gmail id's, one for admin and one for staff [you can use privously entered email id's but google might ask you for otp when you trying from another device. So better way to update your gmail id's for testing purpose. ]


## Steps to explore admin side of the application
1. login with admin user as you updated in mockdata.js
2. You can see flight list > Click on "Select" to manage that flight.
3. On "Manage Flight Details" page
    - you can see flight fetails
    - update flight details
    - Passenger list with filter of missing mandetory fields
    - Add/Edit/Delete Passengers
4. logout from any of the page

## Steps to explore Staff side of the application
1. login with Staff user as you updated in mockData.js
2. You can see flight list > Click on "Checkin Services" to manage checkin functions.

## "Flight Checkin Service"
1. On "Flight Checkin Service" page
    - you can see flight details on top
    - can see passengers list with sorting by name and seat numbers
    - can filter passenger list
    - Seat map is with color codes 
2. To check in Passenger
    - Click on any not checked in passenger
    - then click on available seat
    - It will prompt to checkin confirmation > click OK to confirm 
3. To undo checkin 
    - Click on any checked in passenger or respctive seat, it will heightlight that seat
    - Again click on heighlighted seat > it will prompt to updo checkin
    - click OK to confirm
4. To change Seat 
    - Click on any checked in passenger or respctive seat, it will heightlight that seat 
    - Then click on any available seat > it will prompt to change seat confirmation
    - Click OK to confirm.
 
## "In-Flight Services"
1. On "In-Flight Services" page
    - you can see flight details on top
    - can see passengers list.
    - Seat map is with color codes.
2. You can add ancillary services from option coming on click 3 dots icon in passenger row
3. You can chage meal preference for those passengers who added it in their ancillery services
4. You can chage In-flight shop for those passengers who added it in their ancillery services
5. you can see passenger details on cliking on passenger name from table.
