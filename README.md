Valhalladate

Valhalladate is the default validation script for all front end validation. The
validation is applied to the form element, and validation happens of fields that
have either .required, .email, .password, or passwordConfirm. each input field
designated for validation requires a html tag with the class ‘validation’. This
will be used to provide the user with information on why the form hasn’t
submitted. Error messages and classes can all be customised by providing them
with options when the form validation is initialised.

Valhalladate also has the ability to use ajax to submit the form. This is done
by setting the ‘ajaxRequest’ option to true and providing a function to the
‘ajaxRequestHandler’ option. This function will handle the ‘ajax’ or ‘post’
method. If ‘ajaxRequest’ is set to true without an ‘ajaxRequestHandler’ function
provided an alert will be triggered and the form won’t be submitted.

Valhalladate exists in a quasi jQuery plugin state. Its basically vanilla
javascript wrapped in a jQuery plugin to provide initialisation.
