$(document).ready(function() {
    $('input[name="card_number"]').payment('formatCardNumber');

    $('[rel="popover"]').popover();


    // control recurring vs. one-time contributions
    $('select.frequency').change((function() {
        var frequency = $("select.frequency option:selected").attr("value");
        console.log(frequency);
        if (frequency === 'onetime') {
            $('.onetime').show();
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
        rules: {
            email_addr: "required",
            email_addr2: {
                equalTo: "#email_addr",

            }
        },
        messages: {
            name: "Please specify your name",
            email_addr2: {
                equalTo: "The email addresses must match",
            }
        }
    });
});
