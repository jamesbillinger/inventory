# inventory

palette: https://www.materialpalette.com/blue-grey/brown

https://inventory-db949.firebaseapp.com

to push to fb:
- cd into web dir
- npm run build
- cd ../
- firebase deploy


Todo:
    new customers from sale screen (like new inventory item from helpdesk ticket)
    click customer to see history?
    fix sell button on inventory details screen
    first entry press enter to select on search
    build reports
        EOD
        purchases by customer
        filters on type sold etc
    Stock low notifications
    percent discount
    barcode printing
    receipt print
    cash drawer open?
    mobile

questions for Jim:

should we tie customers and sales together? maybe along with inventory for when we have an item in the
store that is under consignment?


for names instead of ID's rendered on the page, do we use cellRenderer to look up the ID but display the name?

I fixed the printer Icon's yay!

Did not get sales/index customer names to show up.  I modified the sales/index.js a bit trying to get it to
work will explain monday if I can't get it sorted.  I feel so close but am probably far away heh.

LOOK at searchChange in inventory/index and build out search functions for sales and customer


Sales Search not quite right.  search for geGeor does not work
