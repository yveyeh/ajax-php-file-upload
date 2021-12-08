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
                    
                },
                error: function (res_data) {
                    console.log(res_data)
                }
            })
        })
    })
})