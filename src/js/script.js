$(document).ready(function ($) {

    $('#upload_file').on('click', function () {
        $('[name="upload_file"]').click()
        $('[name="upload_file"]').on('change', function () {
            let _file = $('[name="upload_file"]').prop('files')[0]
            let _data = new FormData()
            _data.append('file', _file)
            // console.log(_file)
            $.ajax({
                url: 'php/services/upload_file.php',
                dataType: 'json',
                cache: false,
                contentType: false,
                processData: false,
                data: _data,
                method: 'POST',
                success: function (res_data) {
                    console.log(res_data)
                    display_feedback(res_data.message, res_data.type) // display feedback
                },
                error: function (res_data) {
                    console.log(res_data)
                    display_feedback(res_data.message, res_data.type) // display feedback
                }
            })
        })
    })

    /**
     * Display feedback message in html.
     * @param {string} message The feedback message.
     * @param {string} type The feedback type `(error|success)`.
     */
    var display_feedback = (message, type) => {
        show_feedback(message, type)
        setTimeout(() => { // hide feedback after showing it
            hide_feedback(type)
        }, 3000)
    }

    /**
     * show feedback message in html.
     * @param {string} message The feedback message.
     * @param {string} type The feedback type `(error|success)`.
     */
    var show_feedback = (message, type) => {
        // show the feedback container
        $('#feedback').css('display', 'block')
        // apply styling for the corresponding feedback
        type == 'error' ? $('#feedback span.alert').addClass('alert-error') : $('#feedback span.alert').addClass('alert-success')
        // inject feedback message
        $('#feedback span').html(message)
    }

    /**
     * Hides the feedback in html.
     * @param {string} type The feedback type `(error|success)`.
     */
    var hide_feedback = (type) => {
        // hide the feedback container
        $('#feedback').css('display', 'none')
        // apply styling for the corresponding feedback
        type == 'error' ? $('#feedback span.alert').removeClass('alert-error') : $('#feedback span.alert').removeClass('alert-success')
        // remove feedback message
        $('#feedback span').html('')
    }

})