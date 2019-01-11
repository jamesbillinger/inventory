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
    make Print screen for barcodes with price name barcode etc

    make firearms be mandatory qty 1 on add inventory and log book address so maybe a "ticket type" like meditech
    or "other" screen and add auto saleDate on sale



questions for Jim:

Sales Search not quite right.  search for geGeor does not work

added QR code.  the add inventory screen was angry because of no ID.  inventoryForm probably a better way of doing it than I used.

notes on items?  for things like layaway?