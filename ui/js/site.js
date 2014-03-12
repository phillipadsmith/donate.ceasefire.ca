$(document).ready(function() {
    // Input mask for credit cards
    $('input[name="card_number"]').payment('formatCardNumber');

    // Enable Bootstrap popovers
    $('[rel="popover"]').popover();

    // Get donor data and scroll it
    $.getJSON("donors.json", function(data) {
        var items = [];
        var donors = data.donors;
        $.each(data.donors, function() {
            items.push("<li>" + this.first_name + ' ' + this.last_name + ' (' + this.city + ', ' + this.province + ")</li>");
        });
        $('.donors ul').append(items);
    });
    // Use purl.js to show query parameters
    var url = $.url(); // parse the current page URL
    var first_name = url.param('first_name');
    var last_name = url.param('last_name');
    var full_name = first_name + ' ' + last_name;
    var email = url.param('email_addr');
    var amount = url.param('amount_r') || url.param('amount_1');
    var day_of_month = url.param('day_of_month');
    var frequency;
    if (day_of_month === '1') {
        frequency = 'each month on the 1st.';
    } else if (day_of_month === '15') {
        frequency = 'each month on the 15th.';
    } else if (day_of_month === 'w') {
        frequency = 'each week.';
    } else {
        frequency = 'one time.';
    }

    if (url.attr('path') === '/success.html') {
        $('dd.trn-name').text(full_name);
        $('dd.trn-email').text(email);
        $('dd.trn-details span.trn-amount').text(amount);
        $('dd.trn-details span.trn-frequency').text(frequency);
    } else {
        $('input[name="amount_r"]').val(amount);
        $('input[name="first_name"]').val(first_name);
        $('input[name="last_name"]').val(last_name);
        $('input[name="email_addr"]').val(email);
    }


    // control recurring vs. one-time contributions
    $('select.frequency').change((function() {
        show_widget_amount_and_frequncy();
        var frequency = $("select.frequency option:selected").attr("value");
        if (frequency === 'onetime') {
            $('.onetime').show();
            $('input[name="send_me_gift"]').attr("checked", false);
            $('.sustaining').hide();
            amount = $('input[name="amount_1"]').val();
            $('input[name="frequency"]').attr("value", 1);
        } else if ($('.sustaining').is(":hidden")) {
            $('.sustaining').show();
            $('.onetime').hide();
            amount = $('input[name="amount_r"]').val();
            $('input[name="frequency"]').attr("value", 'r');
        }
    }));
    $('input[name="amount_r"]').blur((function() {
        show_widget_amount_and_frequncy();
    }));
    $('input[name="amount_1"]').blur((function() {
        show_widget_amount_and_frequncy();
    }));


    function show_widget_amount_and_frequncy() {
        var amount;
        var frequency_text = $("select.frequency option:selected").attr("data-text");
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
        //debug: true,
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
