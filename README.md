## Notes for implementation

### Files & preparation for deployment

All of the necessary files for implementation should be taken from the `_site` directory of this project. Specifically, the `index.html` that contains the form itself, as well as the `/ui/` folder that contains the necessary CSS, images, and JavaScript.

Before deploying, the JavaScript and CSS should be minified.

### Form parameters

Form parameters should match those of the existing form, e.g.:

** Existing form **
frequency:1
amount_1:5
amount_r:
day_of_month:1
first_name:Phillip
last_name:Smith
organization:
email_addr:ps@test.com
email_addr2:ps@test.com
addr1:215 Spadina Avenue
addr2:Suite 130
city:Toronto
province:ON
postal_code:M4X 1P3
country:CA
phone_number:6472904608
name_on_card:Phillip Smith
card_number:411111111111111111
cvd:
exp_month:01
exp_year:16
bill_addr1:530 Adelaide St W
bill_addr2:Suite 6117
bill_city:Toronto
bill_province:ON
bill_postal_code:M5V 1T5
bill_country:CA

**New form**
day_of_month=&amount_r=&amount_1=10&frequency=1&first_name=Phillip&last_name=Smith&email_addr=ps%40test.com&name_on_card=Phillip+Smith&card_number=4111+1111+1111+1111&cvd=&exp_month=01&exp_year=17&addr1=530+Adelaide+St+W&city=Toronto&province=ON&postal_code=M5V+1T5&country=CA&phone_number=&donor_recognition=Yes&frequency_paypal=monthly

### Public donor recognition

There is a new form parameter for `donor_recognition` that needs to be handled by the form-processing script, e.g., evaluated, stored with the donor record, etc. 

Then, to show the recent donors, the site.js expects to find the local file donors.json. This will need to be created or the site.js updated to the resource location.


