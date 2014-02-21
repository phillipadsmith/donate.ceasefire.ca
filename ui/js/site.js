$(document).ready(function() {
    $('input[name="card_number"]').payment('formatCardNumber');

    $('[rel="popover"]').popover();


    // control recurring vs. one-time contributions
    $('select.frequency').change((function() {
        var frequency = $("select.frequency option:selected").attr("value");
        console.log(frequency);
        if (frequency === 'onetime') {
            $('.onetime').show();
            $('input[name="send_me_gift"]').attr("checked", false);
            $('.sustaining').hide();
        } else if ($('.sustaining').is(":hidden")) {
            $('.sustaining').show();
        }
    }));

    // override jquery validate plugin defaults
    $.validator.setDefaults({
        highlight: function(element) {
            $(element).closest('.form-group').addClass('has-error');
        },
        unhighlight: function(element) {
            $(element).closest('.form-group').removeClass('has-error');
        },
        errorElement: 'span',
        errorClass: 'help-block',
        errorPlacement: function(error, element) {
            if (element.parent('.input-group').length) {
                error.insertAfter(element.parent());
            } else {
                error.insertAfter(element);
            }
        }
    });
    $("#payment_form").validate({
        debug: true,
        success: "valid",
        rules: {},
        messages: {
            first_name: "Please specify your first name",
            last_name: "Please specify your last name",
            email_addr: "Please provide a valid email address",
            name_on_card: "Please specify the name on the credit card",
            card_number: "Please provide a valid VISA or MasterCard number",
            addr1: "Please provide the card's billing address"
        }
    });
});
