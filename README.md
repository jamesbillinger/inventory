# inventory

palette: https://www.materialpalette.com/blue-grey/brown

https://inventory-db949.firebaseapp.com

to push to fb:
- cd into web dir
- npm run build
- cd ../
- firebase deploy


Todo:
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

    inventory only shows qty >= 1 on POS screen



questions for Jim:

Sales Search not quite right.  search for geGeor does not work

logging specific inventory item changes


remove item from POS

Beta blocking items

build out POS search with details showing by default

item owner after new addition

add customer not closing on submit

 consignment

 fix sale screen to have ability to remove items

 ////Todo by monday////

 on Pos search if ID then automatically add
 ... apparently it already does this.

 on item add, display details by default
    line 80 of posItem is the onclick for switching out the "make" screen.
    <FieldArray /> on 94 of pos is where this calls items which calls item.

start building report screen



