$(document).ready(function() {
    $('input[name="card_number"]').payment('formatCardNumber');
    $('#billing-different').click(function() {
        $('fieldset#billing-information').toggle();
    });
    $('[rel="popover"]').popover();
});
