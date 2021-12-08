<?php

// array to contain the response
$response = array();

// check file type
if (isset($_FILES['file']['type']) && $_FILES['file']['type'] == 'application/pdf') :
    // get the file name
    $file_name = isset($_FILES['file']['name']) ? $_FILES['file']['name'] : $response['message'] = 'File not found';
    // upload file if it is max 2 MB in size
    if ($_FILES['file']['size'] <= 2097152) :
        // file upload directory
        $target = "../uploads/" . basename($file_name);
        // move uploaded file
        $moved = move_uploaded_file($_FILES['file']['tmp_name'], $target);
        if ($moved) : // file successfully uploaded
            $response['type'] = 'success';
            $response['message'] = 'File uploaded';
        else : // file meets requirements but for some reason doesn't get uploaded.
            $response['type'] = 'error';
            $response['message'] = 'Could not upload file';
        endif;
    else : // file size is greater than 2 MB
        $response['type'] = 'error';
        $response['message'] = 'File is too large';
    endif;
// respond with an error otherwise
else :
    $response['type'] = 'error';
    $response['message'] = 'File must be in a PDF';
endif;

// respond with json data
echo json_encode($response);
