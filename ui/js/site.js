$(document).ready(function() {
    $('input[name="card_number"]').payment('formatCardNumber');

    $('[rel="popover"]').popover();


    // control recurring vs. one-time contributions
    $('select.frequency').change((function() {
        show_widget_amount_and_frequncy();
        var frequency = $("select.frequency option:selected").attr("value");
        if (frequency === 'onetime') {
            $('.onetime').show();
            $('input[name="send_me_gift"]').attr("checked", false);
            $('.sustaining').hide();
            amount = $('input[name="amount_1"]').val();
        } else if ($('.sustaining').is(":hidden")) {
            $('.sustaining').show();
            $('.onetime').hide();
            amount = $('input[name="amount_r"]').val();
        }
    }));
    $('input[name="amount_r"]').blur((function() {
        console.log('amount_r blur');
        show_widget_amount_and_frequncy();
    }));
    $('input[name="amount_1"]').blur((function() {
        console.log('amount_1 blur');
        show_widget_amount_and_frequncy();
    }));


    function show_widget_amount_and_frequncy() {
        var amount;
        var frequency_text = $("select.frequency option:selected").text();
        var frequency = $("select.frequency option:selected").val();
        if (frequency === 'onetime') {
            amount = $('input[name="amount_1"]').val();
        } else {
            amount = $('input[name="amount_r"]').val();
        }
        $('.widget_amount').text(amount);
        $('.widget_frequency').text(frequency_text);
        if (amount !== '') {
            $('.widget_amount_frequency').show();
        }
    }

    // For Paypal tab, but could be merged with previous function
    $('select.frequency_paypal').change((function() {
        var frequency = $("select.frequency_paypal option:selected").attr("value");
        if (frequency === 'onetime') {
            $('.onetime_paypal').show();
            //$('input[name="send_me_gift"]').attr("checked", false);
            $('.sustaining_paypal').hide();
        } else if ($('.sustaining_paypal').is(":hidden")) {
            $('.sustaining_paypal').show();
            $('.onetime_paypal').hide();
        }
    }));

    // override jquery validate plugin defaults
    $.validator.setDefaults({});
    $("#payment_form").validate({
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
        },
        debug: true,
        success: "valid",
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
